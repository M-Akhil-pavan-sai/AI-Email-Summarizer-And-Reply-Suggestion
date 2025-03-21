
import React,{useState} from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import { format } from 'date-fns';
import { Email, EmailSummary } from '../../types/email';
import { generateReply } from '../../api/emailApi';


interface EmailDetailProps {
  email: Email;
  summary: EmailSummary;
  onBack: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, summary, onBack }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [loadingReply, setLoadingReply] = useState(false);


  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
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

  const handleReplyClick = async (style: 'very short' | 'standard' | 'elaborated') => {
    setLoadingReply(true);
    try {
      const data = await generateReply(email.body, style);
      setReplyMessage(data.reply);
    } catch (err) {
      console.error("Error generating reply:", err);
      setReplyMessage("Error generating reply");
    } finally {
      setLoadingReply(false);
    }
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
                {email.from}
              </div>
              <div className="ml-3">
                <p className="font-medium">{email.from}</p>
                <p className="text-sm text-email-text-secondary">{email.from}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-email-text-muted">
            {formatDate(email.date)}
          </div>
        </div>
        
        <div className="text-sm mb-6 whitespace-pre-line">
          {formatEmailBody(email.body)}
        </div>
        
        
        <div className="email-summary">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-sm">{summary.summary}</p>

        </div>
      </Card>

      {/* AI Reply Suggestions Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">AI Reply Suggestions</h3>
        <div className="flex space-x-2">
          <Button onClick={() => handleReplyClick('very short')}>Precise</Button>
          <Button onClick={() => handleReplyClick('standard')}>Standard</Button>
          <Button onClick={() => handleReplyClick('elaborated')}>Elaborated</Button>
        </div>
        <div className="mt-4 p-4 border rounded bg-gray-50">
          {loadingReply ? (
            <p>Generating reply...</p>
          ) : (
            <p className="whitespace-pre-line text-sm">{replyMessage}</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default EmailDetail;
