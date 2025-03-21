
import { Email, EmailSummary } from '../types/email';

export const mockEmails: Email[] = [
  {
    uid: '1',
    from: 'Alex Johnson alex.johnson@example.com',
    subject: 'Project Deadline Update',
    body: `Hi there,

I wanted to touch base about the upcoming project deadline. As discussed in our meeting last week, we need to have the first draft submitted by Friday, June 10th. 

Could you please send me your progress report by Wednesday so I can review it before our team meeting? Also, don't forget we need the following items:

1. Executive summary (max 2 pages)
2. Technical specifications
3. Budget forecast

Let me know if you have any questions or concerns.

Best regards,
Alex Johnson
Project Manager`,
    date: '2023-06-05T09:23:00Z',
  },
];

export const mockSummaries: Record<string, EmailSummary> = {
  '1': {
    summary: "Alex is asking for a progress report by Wednesday for the project with a first draft due on Friday, June 10th. He needs an executive summary, technical specifications, and budget forecast. Send progress report by Wednesday Prepare first draft by Friday, June 10th. Include executive summary (max 2 pages), technical specifications, and budget forecast"
  },
};


export const getEmailById = (uid: string): Email | undefined => {
  return mockEmails.find(email => email.uid === uid);
};

export const getSummaryById = (uid: string): EmailSummary | undefined => {
  return mockSummaries[uid];
};
