// src/api/emailApi.ts
export const API_BASE_URL = "http://127.0.0.1:5000";

// Fetch list of email summaries
export async function fetchEmails() {
  const response = await fetch(`${API_BASE_URL}/emails`);
  if (!response.ok) {
    throw new Error("Failed to fetch emails");
  }
  return response.json();
}

// Fetch a single email detail by UID
export async function fetchEmailDetail(uid: string) {
  const response = await fetch(`${API_BASE_URL}/email/${uid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch email detail");
  }
  return response.json();
}

// Summarize email content
export async function summarizeEmail(text: string) {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Failed to summarize email");
  }
  return response.json();
}

// // Generate reply suggestion
// export async function generateReply(text: string, style: string) {
//   const response = await fetch(`${API_BASE_URL}/reply`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text, style }),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to generate reply");
//   }
//   return response.json();
// }
