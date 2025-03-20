
export interface Email {
    id: string;
    from: {
      name: string;
      email: string;
    };
    to: {
      name: string;
      email: string;
    };
    subject: string;
    body: string;
    timestamp: string;
    read: boolean;
    starred: boolean;
    labels?: string[];
    attachments?: {
      name: string;
      size: number;
      type: string;
    }[];
  }
  
  export interface EmailSummary {
    briefSummary: string;
    actionItems: string[];
  }
  
  export type ReplyType = 'concise' | 'standard' | 'detailed';
  
  export interface EmailReply {
    type: ReplyType;
    content: string;
  }
  