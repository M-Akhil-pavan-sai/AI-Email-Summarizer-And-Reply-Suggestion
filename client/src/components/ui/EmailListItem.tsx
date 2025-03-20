
import React from 'react';
import { Card } from './card';
import { Email } from '../../types/email';
import { Star, StarOff, Paperclip } from 'lucide-react';
import { cn } from '../../utils';
import { format } from 'date-fns';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
  onStarToggle: (id: string, starred: boolean) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ 
  email, 
  isSelected, 
  onClick, 
  onStarToggle 
}) => {
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStarToggle(email.id, !email.starred);
  };

  const formattedDate = format(new Date(email.timestamp), 'MMM d');

  return (
    <Card 
      className={cn(
        "email-card mb-2 p-4 cursor-pointer",
        isSelected ? "ring-2 ring-email-primary" : "",
        !email.read ? "font-medium" : ""
      )} 
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={handleStarClick} className="text-gray-400 hover:text-email-highlight">
            {email.starred ? 
              <Star className="h-5 w-5 fill-email-highlight text-email-highlight" /> : 
              <StarOff className="h-5 w-5" />
            }
          </button>
          <div className={cn("w-3 h-3 rounded-full", !email.read ? "bg-email-primary" : "bg-transparent")} />
          <div className="font-medium text-sm truncate max-w-[180px]">{email.from.name}</div>
        </div>
        <div className="text-xs text-email-text-muted">{formattedDate}</div>
      </div>
      
      <div className="mt-2">
        <h3 className={cn("text-sm truncate", !email.read ? "font-medium" : "")}>
          {email.subject}
        </h3>
        <p className="text-xs text-email-text-secondary line-clamp-1 mt-1">
          {email.body.split('\n')[0]}
        </p>
      </div>
      
      {email.attachments && email.attachments.length > 0 && (
        <div className="mt-2 flex items-center text-xs text-email-text-muted">
          <Paperclip className="h-3 w-3 mr-1" />
          <span>{email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}</span>
        </div>
      )}
    </Card>
  );
};

export default EmailListItem;