import os
import imaplib
import email
from email.header import decode_header
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import openai

load_dotenv()

IMAP_SERVER = os.getenv("IMAP_SERVER")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)

def fetch_unread_emails():
    """Connect to the IMAP server and fetch unread emails."""
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(EMAIL_USER, EMAIL_PASSWORD)
        mail.select("inbox")
        
        # Search for unread emails
        status, messages = mail.search(None, 'UNSEEN')
        email_ids = messages[0].split()
        emails = []
        
        for eid in email_ids:
            res, msg_data = mail.fetch(eid, "(RFC822)")
            for response in msg_data:
                if isinstance(response, tuple):
                    msg = email.message_from_bytes(response[1])
                    # Decode email subject
                    subject, encoding = decode_header(msg.get("Subject"))[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or "utf-8")
                    # Get sender's email
                    from_ = msg.get("From")
                    # Get email date
                    date = msg.get("Date")
                    # Get email body (handle multipart emails)
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            ctype = part.get_content_type()
                            cdispo = str(part.get("Content-Disposition"))
                            if ctype == "text/plain" and "attachment" not in cdispo:
                                charset = part.get_content_charset()
                                body = part.get_payload(decode=True).decode(charset or "utf-8", errors="ignore")
                                break
                    else:
                        charset = msg.get_content_charset()
                        body = msg.get_payload(decode=True).decode(charset or "utf-8", errors="ignore")
                    
                    emails.append({
                        "id": eid.decode("utf-8"),
                        "subject": subject,
                        "from": from_,
                        "date": date,
                        "body": body
                    })
        mail.logout()
        return emails
    except Exception as e:
        print("Error fetching emails:", e)
        return []

@app.route("/emails", methods=["GET"])
def get_emails():
    """Endpoint to retrieve unread emails."""
    emails = fetch_unread_emails()
    email_summaries = [
        {
            "id": email_item["id"],
            "subject": email_item["subject"],
            "from": email_item["from"],
            "date": email_item["date"],
            "snippet": email_item["body"][:200]  # first 200 characters as a snippet
        }
        for email_item in emails
    ]
    return jsonify(email_summaries)

@app.route("/summarize", methods=["POST"])
def summarize_email():
    """
    Endpoint to summarize an email.
    Expects JSON payload with a "text" field containing the email body.
    """
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"Summarize the following email and highlight any key action items:\n\n{text}\n\nSummary:"
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            temperature=0.5,
        )
        summary = response.choices[0].text.strip()
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/reply", methods=["POST"])
def generate_reply():
    """
    Endpoint to generate reply suggestions.
    Expects JSON payload with:
    - "text": the original email content
    - "style": one of ["concise", "standard", "detailed"]
    """
    data = request.get_json()
    text = data.get("text", "")
    style = data.get("style", "standard")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"Draft a {style} reply to the following email:\n\n{text}\n\nReply:"
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            temperature=0.7,
        )
        reply_suggestion = response.choices[0].text.strip()
        return jsonify({"reply": reply_suggestion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
