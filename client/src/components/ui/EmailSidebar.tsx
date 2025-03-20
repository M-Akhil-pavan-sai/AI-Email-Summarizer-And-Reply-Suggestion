
import React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Separator } from './separator';
import { Inbox, Send, Archive, Trash, Search, Plus, Mail } from 'lucide-react';

interface EmailSidebarProps {
  onComposeClick: () => void;
}

const EmailSidebar: React.FC<EmailSidebarProps> = ({ onComposeClick }) => {
  return (
    <div className="w-full h-full p-4 flex flex-col bg-white dark:bg-gray-900 border-r">
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-email-primary mr-2" />
        <h1 className="text-xl font-bold">AI Email Assistant</h1>
      </div>
      
      <Button 
        onClick={onComposeClick}
        className="mb-6 bg-email-primary hover:bg-email-secondary text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Compose
      </Button>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search emails..."
          className="pl-10"
        />
      </div>
      
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start font-medium">
          <Inbox className="h-4 w-4 mr-3" />
          Inbox
          <span className="ml-auto bg-email-primary text-white text-xs px-2 py-1 rounded-full">5</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-email-text-secondary hover:text-email-text-primary">
          <Send className="h-4 w-4 mr-3" />
          Sent
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-email-text-secondary hover:text-email-text-primary">
          <Archive className="h-4 w-4 mr-3" />
          Archive
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-email-text-secondary hover:text-email-text-primary">
          <Trash className="h-4 w-4 mr-3" />
          Trash
        </Button>
      </nav>
      
      <Separator className="my-6" />
      
      <div className="mt-auto">
        <h3 className="text-sm font-medium mb-2">Connected Account</h3>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div className="w-8 h-8 rounded-full bg-email-primary text-white flex items-center justify-center text-sm font-medium">
            U
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">user@example.com</p>
            <p className="text-xs text-email-text-muted">IMAP connected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
