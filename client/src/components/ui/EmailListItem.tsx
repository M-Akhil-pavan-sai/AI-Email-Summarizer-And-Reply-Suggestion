
import React from 'react';
import { Card } from './card';
import { Email } from '../../types/email';
import { cn } from '../../utils';
import { format } from 'date-fns';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ 
  email, 
  isSelected, 
  onClick, 
}) => {


  const formattedDate = format(new Date(email.date), 'MMM d');

  return (
    <Card 
      className={cn(
        "email-card mb-2 p-4 cursor-pointer",
        isSelected ? "ring-2 ring-email-primary" : "",
         "font-medium"
      )} 
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn("w-3 h-3 rounded-full",  "bg-email-primary" )} />
          <div className="font-medium text-sm truncate max-w-[180px]">{email.from}</div>
        </div>
        <div className="text-xs text-email-text-muted">{formattedDate}</div>
      </div>

      <div className="mt-2">
        <h3 className={cn("text-sm truncate",  "font-medium" )}>
          {email.subject}
        </h3>
        <p className="text-xs text-email-text-secondary line-clamp-1 mt-1">
          {email.body}
        </p>
      </div>
    </Card>
  );
};

export default EmailListItem;