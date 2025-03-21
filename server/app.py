import os
import base64
import imaplib
import email
from email.header import decode_header
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import json
import requests
from flask_cors import CORS


# OAuth2 libraries
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

load_dotenv()

# Environment settings
IMAP_SERVER = os.getenv("IMAP_SERVER")
EMAIL_USER = os.getenv("EMAIL_USER")
SCOPES = ['https://mail.google.com/']
CREDENTIALS_FILE = 'credentials.json'
TOKEN_FILE = 'token.json'

app = Flask(__name__)

CORS(app)


# Authenticate and refresh Gmail credentials via OAuth2.
def authenticate_gmail():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=8080, prompt='consent')
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
    print("Access token:", creds.token[:20] + "...")
    return creds

# Generate the OAuth2 string needed for IMAP.
def generate_oauth2_string(user, access_token, as_base64=True):
    access_token = access_token.strip()
    raw_string = f"user={user}\x01auth=Bearer {access_token}\x01\x01"
    if as_base64:
        return base64.b64encode(raw_string.encode()).decode()
    return raw_string.encode("utf-8")

# Connect to Gmail IMAP using OAuth2.
def connect_to_gmail_imap():
    creds = authenticate_gmail()
    oauth2_credential = generate_oauth2_string(EMAIL_USER, creds.token, as_base64=False)
    imap_conn = imaplib.IMAP4_SSL(IMAP_SERVER)
    try:
        imap_conn.authenticate('XOAUTH2', lambda challenge: oauth2_credential)
        print("IMAP authentication successful!")
    except imaplib.IMAP4.error as e:
        print("IMAP authentication failed:", e)
        return None
    return imap_conn

def fetch_latest_emails():
    try:
        mail = connect_to_gmail_imap()
        if not mail:
            return []
        mail.select("inbox")
        # Get all email UIDs
        status, messages = mail.uid('search', None, 'ALL')
        if status != 'OK':
            mail.logout()
            return []
        uid_list = messages[0].split()
        # Sort UIDs numerically in descending order (newest first)
        uid_list_sorted = sorted(uid_list, key=lambda x: int(x), reverse=True)
        latest_uids = uid_list_sorted[:5]
        emails = []
        for uid in latest_uids:
            res, msg_data = mail.uid('fetch', uid, "(RFC822)")
            for response in msg_data:
                if isinstance(response, tuple):
                    msg = email.message_from_bytes(response[1])
                    subject, encoding = decode_header(msg.get("Subject"))[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or "utf-8")
                    from_ = msg.get("From")
                    date = msg.get("Date")
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain" and "attachment" not in str(part.get("Content-Disposition")):
                                charset = part.get_content_charset() or "utf-8"
                                body = part.get_payload(decode=True).decode(charset, errors="ignore")
                                break
                    else:
                        charset = msg.get_content_charset() or "utf-8"
                        body = msg.get_payload(decode=True).decode(charset, errors="ignore")
                    emails.append({
                        "uid": uid.decode("utf-8"),
                        "subject": subject,
                        "from": from_,
                        "date": date,
                        "snippet": body[:200],
                        "body": body
                    })
        mail.logout()
        return emails
    except Exception as e:
        print("Error fetching emails:", e)
        return []



# Call local Ollama HTTP API.
def call_ollama(model, messages):
    url = os.getenv("OLLAMA_SERVER") # Adjust endpoint if needed.
    payload = {"model": model, "messages": messages}
    print("Calling Ollama with payload:", payload)
    try:
        response = requests.post(url, json=payload, stream=True)
        if response.status_code == 200:
            full_response = ""
            for line in response.iter_lines(decode_unicode=True):
                if line:
                    try:
                        data = json.loads(line)
                        if "message" in data and "content" in data["message"]:
                            full_response += data["message"]["content"]
                    except json.JSONDecodeError:
                        print("Failed to parse line:", line)
            return full_response
        else:
            print("Ollama returned status code:", response.status_code)
            return None
    except Exception as e:
        print("Error calling Ollama:", e)
        return None

# Endpoints
@app.route("/emails", methods=["GET"])
def get_emails():
    emails = fetch_latest_emails()
    summaries = [{
        "uid": e["uid"],
        "subject": e["subject"],
        "from": e["from"],
        "date": e["date"],
        "snippet": e["body"][:200]
    } for e in emails]
    return jsonify(summaries)

@app.route("/email/<uid>", methods=["GET"])
def get_email(uid):
    try:
        mail = connect_to_gmail_imap()
        if not mail:
            return jsonify({"error": "No valid IMAP connection."}), 500
        mail.select("inbox")
        status, data = mail.uid('fetch', uid, "(RFC822)")
        if status != 'OK':
            mail.logout()
            return jsonify({"error": "Email not found."}), 404
        for response in data:
            if isinstance(response, tuple):
                msg = email.message_from_bytes(response[1])
                subject, encoding = decode_header(msg.get("Subject"))[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding or "utf-8")
                from_ = msg.get("From")
                date = msg.get("Date")
                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain" and "attachment" not in str(part.get("Content-Disposition")):
                            charset = part.get_content_charset() or "utf-8"
                            body = part.get_payload(decode=True).decode(charset, errors="ignore")
                            break
                else:
                    charset = msg.get_content_charset() or "utf-8"
                    body = msg.get_payload(decode=True).decode(charset, errors="ignore")
                email_data = {
                    "uid": uid,
                    "subject": subject,
                    "from": from_,
                    "date": date,
                    "body": body
                }
                mail.logout()
                return jsonify(email_data)
        mail.logout()
        return jsonify({"error": "Email not found"}), 404
    except Exception as e:
        print("Error retrieving email:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/summarize", methods=["POST"])
def summarize_email():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    prompt = f"Summarize the following email and highlight any key action items:\n\n{text}\n\nSummary:"
    messages = [
        {"role": "system", "content": "You are a helpful email summarizer."},
        {"role": "user", "content": prompt}
    ]
    summary = call_ollama("llama2", messages)
    if summary is None:
        return jsonify({"error": "Failed to generate summary."}), 500
    return jsonify({"summary": summary})

@app.route("/reply", methods=["POST"])
def generate_reply():
    data = request.get_json()
    text = data.get("text", "")
    style = request.args.get("style", data.get("style", "standard"))
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Read personal context from profile.txt
    try:
        with open("profile.txt", "r", encoding="utf-8") as f:
            profile_context = f.read()
    except Exception as e:
        print("Could not read profile.txt:", e)
        profile_context = ""

    # Build prompt instructing the model to output only the reply text.
    prompt = (
        f"Draft a {style} email reply to the following email on my behalf. "
        f"Review the email and if it is relevant to my personal profile, incorporate the following profile details where appropriate; "
        f"otherwise, just generate a direct reply. Do not include any additional text such as 'Thank you for giving me the opportunity...'.\n\n"
        f"Profile:\n{profile_context}\n\n"
        f"Email:\n{text}\n\n"
        f"Final Reply (only the reply text):"
    )

    messages = [
        {"role": "system", "content": "You are an assistant that drafts direct email replies without extra commentary."},
        {"role": "user", "content": prompt}
    ]
    
    reply_text = call_ollama("llama2", messages)
    if reply_text is None:
        return jsonify({"error": "Failed to generate reply."}), 500
    return jsonify({"reply": reply_text})

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True)
