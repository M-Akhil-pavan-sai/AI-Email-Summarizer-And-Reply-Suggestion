
import { Email, EmailSummary, EmailReply, ReplyType } from '../types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com'
    },
    to: {
      name: 'You',
      email: 'your.email@example.com'
    },
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
    timestamp: '2023-06-05T09:23:00Z',
    read: false,
    starred: true
  },
  {
    id: '2',
    from: {
      name: 'Marketing Team',
      email: 'marketing@example.com'
    },
    to: {
      name: 'You',
      email: 'your.email@example.com'
    },
    subject: 'New Campaign Launch Materials',
    body: `Hello,

We're excited to announce that the summer campaign will launch next Monday! Please find attached all the creative materials and the content calendar for the next three months.

We need everyone to review these materials ASAP and provide feedback by EOD tomorrow. Specifically, please check:
- Brand consistency
- Messaging clarity
- Call-to-action effectiveness

Thanks for your help with this important launch!

Best,
The Marketing Team`,
    timestamp: '2023-06-04T16:45:00Z',
    read: false,
    starred: false,
    attachments: [
      {
        name: 'summer_campaign.pdf',
        size: 2540000,
        type: 'application/pdf'
      },
      {
        name: 'content_calendar.xlsx',
        size: 1200000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    ]
  },
  {
    id: '3',
    from: {
      name: 'HR Department',
      email: 'hr@example.com'
    },
    to: {
      name: 'You',
      email: 'your.email@example.com'
    },
    subject: 'Important: Benefits Enrollment Deadline',
    body: `Dear Team Member,

This is a friendly reminder that the annual benefits enrollment period ends on June 15th. If you haven't already done so, please complete your selections through the employee portal.

Important changes this year:
- New dental provider options
- Updated health insurance premiums
- Additional retirement plan options

Please complete your enrollment by the deadline. If you need assistance, attend our virtual help session on June 10th at 2 PM.

Regards,
Human Resources`,
    timestamp: '2023-06-03T11:15:00Z',
    read: false,
    starred: true
  },
  {
    id: '4',
    from: {
      name: 'Tech Support',
      email: 'support@example.com'
    },
    to: {
      name: 'You',
      email: 'your.email@example.com'
    },
    subject: 'RE: System Access Issue',
    body: `Hello,

Thank you for reporting the access issue with the database. Our team has investigated and found that this was due to a scheduled maintenance that ran longer than expected.

All systems should be back online now. Please try again and let us know if you're still experiencing any problems.

For future reference, you can check our maintenance schedule on the company intranet.

Thanks for your patience,
IT Support Team`,
    timestamp: '2023-06-02T14:30:00Z',
    read: false,
    starred: false
  },
  {
    id: '5',
    from: {
      name: 'Sarah Williams',
      email: 'sarah.w@example.com'
    },
    to: {
      name: 'You',
      email: 'your.email@example.com'
    },
    subject: 'Coffee Chat Next Week?',
    body: `Hi!

I hope you're doing well. I've been meaning to catch up with you about the new AI projects you've been working on. Would you be available for a coffee chat next week?

I'm free on Tuesday or Thursday afternoon around 3 PM. Let me know what works for you!

Looking forward to hearing from you,
Sarah`,
    timestamp: '2023-06-01T10:20:00Z',
    read: false,
    starred: false
  }
];

export const mockSummaries: Record<string, EmailSummary> = {
  '1': {
    briefSummary: 'Alex is asking for a progress report by Wednesday for the project with a first draft due on Friday, June 10th. He needs an executive summary, technical specifications, and budget forecast.',
    actionItems: [
      'Send progress report by Wednesday',
      'Prepare first draft by Friday, June 10th',
      'Include executive summary (max 2 pages), technical specifications, and budget forecast'
    ]
  },
  '2': {
    briefSummary: 'The marketing team is launching a summer campaign next Monday and needs your feedback on the attached materials by end of day tomorrow.',
    actionItems: [
      'Review campaign materials ASAP',
      'Provide feedback by EOD tomorrow',
      'Check brand consistency, messaging clarity, and CTA effectiveness'
    ]
  },
  '3': {
    briefSummary: 'HR is reminding that the annual benefits enrollment deadline is June 15th with several important changes to the plans this year.',
    actionItems: [
      'Complete benefits enrollment by June 15th',
      'Consider new dental providers, updated health premiums, and retirement options',
      'Attend virtual help session on June 10th at 2 PM if needed'
    ]
  },
  '4': {
    briefSummary: 'Tech support has resolved the database access issue which was caused by extended scheduled maintenance. All systems are now back online.',
    actionItems: [
      'Try accessing the system again',
      'Report any ongoing issues to IT Support',
      'Check the company intranet for future maintenance schedules'
    ]
  },
  '5': {
    briefSummary: 'Sarah wants to meet for coffee next week to discuss your AI projects. She suggested Tuesday or Thursday at 3 PM.',
    actionItems: [
      'Respond about availability for coffee chat',
      'Choose between Tuesday or Thursday at 3 PM',
      'Prepare to discuss AI projects'
    ]
  }
};

export const mockReplies: Record<string, Record<ReplyType, EmailReply>> = {
  '1': {
    concise: {
      type: 'concise',
      content: "Hi Alex, I'll send the progress report by Wednesday. All items will be included. Thanks."
    },
    standard: {
      type: 'standard',
      content: "Hi Alex,\n\nI'll have the progress report ready for you by Wednesday. I'm working on all three required items (executive summary, technical specs, and budget forecast).\n\nBest regards,"
    },
    detailed: {
      type: 'detailed',
      content: "Hi Alex,\n\nThank you for the reminder about the project deadline. I'm currently on track to complete the first draft by Friday, June 10th.\n\nI'll send you the progress report by Wednesday as requested, which will include:\n1. Executive summary (within the 2-page limit)\n2. Technical specifications with all the details we discussed\n3. Complete budget forecast with quarterly breakdowns\n\nIs there anything specific you'd like me to focus on in the progress report? I want to make sure I address any concerns you might have before the team meeting.\n\nBest regards,"
    }
  },
  '2': {
    concise: {
      type: 'concise',
      content: "Thanks for the materials. I'll review and provide feedback by tomorrow EOD."
    },
    standard: {
      type: 'standard',
      content: "Hello Marketing Team,\n\nThanks for sharing the summer campaign materials. I'll review them with special attention to brand consistency, messaging clarity, and CTA effectiveness, and will send my feedback by EOD tomorrow.\n\nBest regards,"
    },
    detailed: {
      type: 'detailed',
      content: "Hello Marketing Team,\n\nThank you for sharing the summer campaign launch materials. I'm excited to see the campaign go live next Monday!\n\nI'll thoroughly review both the creative materials and content calendar, focusing specifically on:\n- Brand consistency across all materials\n- Clarity and impact of the messaging\n- Effectiveness of the calls-to-action\n\nYou'll have my complete feedback by end of day tomorrow. If I notice anything that requires immediate attention, I'll reach out sooner.\n\nLooking forward to contributing to this important launch.\n\nBest regards,"
    }
  },
  '3': {
    concise: {
      type: 'concise',
      content: "Thanks for the reminder. I'll complete my benefits enrollment before June 15th."
    },
    standard: {
      type: 'standard',
      content: "Dear HR Department,\n\nThank you for the reminder about the benefits enrollment deadline. I'll review the new options and complete my selections before June 15th.\n\nBest regards,"
    },
    detailed: {
      type: 'detailed',
      content: "Dear HR Department,\n\nThank you for the reminder about the annual benefits enrollment period ending on June 15th. I appreciate the heads-up about the important changes this year.\n\nI'll carefully review the new dental provider options, updated health insurance premiums, and additional retirement plan options before making my selections through the employee portal.\n\nIf I have any questions, I'll make sure to attend the virtual help session on June 10th at 2 PM.\n\nThank you for your assistance with this process.\n\nBest regards,"
    }
  },
  '4': {
    concise: {
      type: 'concise',
      content: "Thank you for resolving the issue. I can access the system now."
    },
    standard: {
      type: 'standard',
      content: "Hello Tech Support,\n\nThank you for investigating and resolving the database access issue. I've tried again and can confirm that the system is working properly now.\n\nBest regards,"
    },
    detailed: {
      type: 'detailed',
      content: "Hello Tech Support,\n\nThank you for your prompt response and for investigating the access issue with the database. I understand it was caused by extended scheduled maintenance.\n\nI've just tried accessing the system again, and I can confirm that everything is working properly now. I appreciate your team's efforts in resolving this matter.\n\nI'll be sure to check the maintenance schedule on the company intranet in the future to plan my work accordingly.\n\nThank you for your assistance and quick resolution.\n\nBest regards,"
    }
  },
  '5': {
    concise: {
      type: 'concise',
      content: "Hi Sarah, I'd love to meet. Thursday at 3 PM works for me. Looking forward to it!"
    },
    standard: {
      type: 'standard',
      content: "Hi Sarah,\n\nGreat to hear from you! I'd love to catch up about the AI projects. Thursday at 3 PM works well for me. Where would you like to meet?\n\nLooking forward to it,\n"
    },
    detailed: {
      type: 'detailed',
      content: "Hi Sarah,\n\nIt's wonderful to hear from you! I hope you've been doing well too.\n\nI'd absolutely love to catch up and talk about the AI projects I've been working on lately. There are some exciting developments I'd be happy to share with you.\n\nThursday at 3 PM works perfectly for my schedule. Do you have a preferred coffee shop for our chat? If not, I can suggest the new place that opened downtown - I've heard they have great pastries too!\n\nI'm looking forward to our conversation and hearing what you've been up to as well.\n\nBest wishes,\n"
    }
  }
};

export const getEmailById = (id: string): Email | undefined => {
  return mockEmails.find(email => email.id === id);
};

export const getSummaryById = (id: string): EmailSummary | undefined => {
  return mockSummaries[id];
};

export const getRepliesById = (id: string): Record<ReplyType, EmailReply> | undefined => {
  return mockReplies[id];
};
