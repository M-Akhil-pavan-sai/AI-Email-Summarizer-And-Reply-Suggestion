// src/api/emailApi.ts
import { getEmailById, mockEmails, mockSummaries, mockReplies } from "../utils/mockData";

// Fetch list of email summaries (using mock data)
export async function fetchEmails() {
  return Promise.resolve(mockEmails);
}

// Fetch a single email detail by UID (using mock data)
export async function fetchEmailDetail(uid: string) {
  const email = getEmailById(uid);
  return email
    ? Promise.resolve(email)
    : Promise.reject(new Error("Email not found"));
}

// Summarize email content (using mock data)
export async function summarizeEmail(text: string) {
  const trimmedText = text.trim();
  // Try to match the provided text with one of the mock email bodies.
  for (const email of mockEmails) {
    const emailSnippet = email.body.slice(0, 50).trim();
    if (trimmedText.includes(emailSnippet) || email.body.includes(trimmedText)) {
      return Promise.resolve(mockSummaries[email.uid]);
    }
  }
  // Fallback summary if no match is found
  return Promise.resolve({
    summary: "No summary found for the provided text. Please verify the email content."
  });
}

// Generate reply suggestion (using mock data)
export async function generateReply(text: string, style: string) {
  const normalizedStyle = style === "very short" ? "precise" : style;
  const typedStyle = normalizedStyle as "precise" | "standard" | "elaborated";
  const trimmedText = text.trim().toLowerCase();
  for (const email of mockEmails) {
    const snippet = email.body.slice(0, 50).trim().toLowerCase();
    if (trimmedText.includes(snippet) || snippet.includes(trimmedText)) {
      const repliesForEmail = mockReplies[email.uid];
      if (repliesForEmail && repliesForEmail[typedStyle]) {
        return Promise.resolve({ reply: repliesForEmail[typedStyle].content });
      }
    }
  }
  // Fallback reply if no match is found
  return Promise.resolve({ reply: "No reply suggestion available for this email." });
}
