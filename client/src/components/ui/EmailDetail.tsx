
import React, { useState } from 'react';
import { ArrowLeft, ClipboardCopy, Check } from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { format } from 'date-fns';
import { Email, EmailSummary, EmailReply, ReplyType } from '../../types/email';
import { toast } from 'sonner';

interface EmailDetailProps {
  email: Email;
  summary: EmailSummary;
  replies: Record<ReplyType, EmailReply>;
  onBack: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, summary, replies, onBack }) => {
  const [selectedReplyType, setSelectedReplyType] = useState<ReplyType>('standard');
  const [copied, setCopied] = useState(false);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
  };
  
  const handleCopyReply = () => {
    const replyText = replies[selectedReplyType].content;
    navigator.clipboard.writeText(replyText);
    setCopied(true);
    
    toast("Copied to clipboard",{
      description: "Reply text has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatEmailBody = (body: string) => {
    // Convert line breaks to <br> tags
    return body.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-email-text-primary">{email.subject}</h2>
      </div>
      
      <Card className="email-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-email-primary text-white flex items-center justify-center text-lg font-medium">
                {email.from.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{email.from.name}</p>
                <p className="text-sm text-email-text-secondary">{email.from.email}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-email-text-muted">
            {formatDate(email.timestamp)}
          </div>
        </div>
        
        <div className="text-sm mb-6 whitespace-pre-line">
          {formatEmailBody(email.body)}
        </div>
        
        {email.attachments && email.attachments.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h4 className="font-medium mb-2">Attachments ({email.attachments.length})</h4>
            <div className="space-y-2">
              {email.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded border">
                  <span>{attachment.name}</span>
                  <span className="text-sm text-email-text-muted">{(attachment.size / 1000000).toFixed(1)} MB</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="email-summary">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-sm">{summary.briefSummary}</p>
          
          {summary.actionItems.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Action Items:</h4>
              <ul className="mt-2 space-y-2">
                {summary.actionItems.map((item, index) => (
                  <li key={index} className="action-item text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Suggested Replies</h3>
          <Tabs defaultValue="standard" onValueChange={(value) => setSelectedReplyType(value as ReplyType)}>
            <TabsList className="mb-4">
              <TabsTrigger value="concise">Concise</TabsTrigger>
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="concise" className="mt-0">
              <Card className="p-4 border border-email-border bg-white dark:bg-gray-800">
                <p className="whitespace-pre-line text-sm">{replies.concise.content}</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="standard" className="mt-0">
              <Card className="p-4 border border-email-border bg-white dark:bg-gray-800">
                <p className="whitespace-pre-line text-sm">{replies.standard.content}</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="detailed" className="mt-0">
              <Card className="p-4 border border-email-border bg-white dark:bg-gray-800">
                <p className="whitespace-pre-line text-sm">{replies.detailed.content}</p>
              </Card>
            </TabsContent>
            
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleCopyReply}
                className="flex items-center"
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <ClipboardCopy className="h-4 w-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default EmailDetail;
