
import { Email, EmailSummary } from '../types/email';

export const mockEmails: Email[] = [
  {
    uid: "1",
    from: "Alex Johnson <alex.johnson@example.com>",
    subject: "Project Deadline Update",
    body: `Hi Team,

I wanted to update you on our current project status. We have successfully completed the initial design phase and are ready to move into the development phase next week. Please submit your progress reports by Wednesday so we can prepare for our review meeting. A review meeting is scheduled for Friday at 2:00 PM to discuss progress and address any blockers.

Best regards,
Alex Johnson`,
    date: "2023-06-05T09:23:00Z"
  },
  {
    uid: "2",
    from: "Marketing Team <marketing@example.com>",
    subject: "New Campaign Launch Materials",
    body: `Hello Team,

We're excited to announce that our new summer campaign will launch next Monday. Please review the attached materials and provide feedback by EOD tomorrow.

Best,
The Marketing Team`,
    date: "2023-06-04T16:45:00Z"
  },
  {
    uid: "3",
    from: "HR Department <hr@example.com>",
    subject: "Benefits Enrollment Reminder",
    body: `Dear Employee,

This is a reminder that the benefits enrollment period ends on June 15th. Please complete your enrollment as soon as possible.

Thank you,
HR Department`,
    date: "2023-06-03T11:15:00Z"
  },
  {
    uid: "4",
    from: "Tech Support <support@example.com>",
    subject: "System Access Issue Resolved",
    body: `Hello,

The system access issue you reported has been resolved. Please try logging in again and let us know if you encounter any further issues.

Best regards,
Tech Support`,
    date: "2023-06-02T14:30:00Z"
  },
  {
    uid: "5",
    from: "Sarah Williams <sarah.w@example.com>",
    subject: "Coffee Chat Invitation",
    body: `Hi,

I hope you're doing well. I would like to invite you for a coffee chat next week to discuss our latest projects. Please let me know your availability.

Cheers,
Sarah`,
    date: "2023-06-01T10:20:00Z"
  }
];

export const mockSummaries: Record<string, EmailSummary> = {
  "1": {
    summary: "1. Submit progress report by Wednesday. 2. Attend review meeting on Friday at 2:00 PM."
  },
  "2": {
    summary: "1. Review campaign launch materials. 2. Provide feedback by EOD tomorrow."
  },
  "3": {
    summary: "1. Complete benefits enrollment by June 15th."
  },
  "4": {
    summary: "1. Try logging in again as the access issue has been resolved."
  },
  "5": {
    summary: "1. Respond with availability for a coffee chat to discuss projects."
  }
};

export const getEmailById = (uid: string): Email | undefined => {
  return mockEmails.find(email => email.uid === uid);
};

export const getSummaryById = (uid: string): EmailSummary | undefined => {
  return mockSummaries[uid];
};


// src/utils/mockData.ts

export type ReplyType = 'precise' | 'standard' | 'elaborated';

export interface EmailReply {
  type: ReplyType;
  content: string;
}

// Example reply suggestions keyed by email uid
export const mockReplies: Record<string, Record<ReplyType, EmailReply>> = {
  "1": {
    precise: {
      type: 'precise',
      content: "Thanks for the update, Alex! I'll send my progress report by Wednesday and join the review meeting on Friday at 2:00 PM."
    },
    standard: {
      type: 'standard',
      content: "Hi Alex,\n\nThanks for the update. I will submit my progress report by Wednesday and attend the review meeting on Friday at 2:00 PM.\n\nBest regards,"
    },
    elaborated: {
      type: 'elaborated',
      content: "Hi Alex,\n\nThank you for the detailed project update. I will ensure my progress report is ready by Wednesday and look forward to discussing our progress, addressing any challenges, and planning the next steps at the review meeting on Friday at 2:00 PM.\n\nBest regards,"
    }
  },
  "2": {
    precise: {
      type: 'precise',
      content: "I'll review the campaign materials and send my feedback by tomorrow."
    },
    standard: {
      type: 'standard',
      content: "Hi Marketing Team,\n\nThank you for sharing the campaign launch materials. I'll review them carefully and provide my feedback by the end of day tomorrow.\n\nBest regards,"
    },
    elaborated: {
      type: 'elaborated',
      content: "Hi Marketing Team,\n\nThank you for the update and for sharing the summer campaign materials. I will thoroughly review the attached documents and send my detailed feedback by tomorrow EOD.\n\nBest regards,"
    }
  },
  "3": {
    precise: {
      type: 'precise',
      content: "I'll complete the benefits enrollment as required."
    },
    standard: {
      type: 'standard',
      content: "Hi HR,\n\nThank you for the reminder. I will complete my benefits enrollment by the deadline.\n\nBest regards,"
    },
    elaborated: {
      type: 'elaborated',
      content: "Hi HR,\n\nThank you for reminding me about the benefits enrollment deadline. I will review the available options and complete my enrollment well before June 15th.\n\nBest regards,"
    }
  },
  "4": {
    precise: {
      type: 'precise',
      content: "I'll try logging in again to confirm the issue is resolved."
    },
    standard: {
      type: 'standard',
      content: "Hi Tech Support,\n\nThank you for resolving the access issue. I will try logging in again and let you know if I experience any further problems.\n\nBest regards,"
    },
    elaborated: {
      type: 'elaborated',
      content: "Hi Tech Support,\n\nThank you for addressing the system access issue promptly. I have tried logging in again, and everything appears to be working properly now. I appreciate your support. Please let me know if there’s any further action required from my side.\n\nBest regards,"
    }
  },
  "5": {
    precise: {
      type: 'precise',
      content: "I'll reply with my availability for the coffee chat."
    },
    standard: {
      type: 'standard',
      content: "Hi Sarah,\n\nThank you for the invitation. I would love to catch up over coffee. Could you please share your available dates and times?\n\nBest regards,"
    },
    elaborated: {
      type: 'elaborated',
      content: "Hi Sarah,\n\nThanks for reaching out and inviting me for a coffee chat. I’d be delighted to catch up and discuss our projects in detail. Please let me know your available times, and I'll do my best to accommodate. Looking forward to our conversation.\n\nBest regards,"
    }
  }
};

// Optionally, helper functions:
export const getRepliesById = (uid: string): Record<ReplyType, EmailReply> | undefined => {
  return mockReplies[uid];
};
