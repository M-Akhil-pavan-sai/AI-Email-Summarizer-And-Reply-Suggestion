
import React, { useState } from 'react';
import EmailListItem from '../EmailListItem';
import EmailDetail from '../EmailDetail.tsx'; // Ensure the file exists and is correctly named
import EmailSidebar from '../EmailSidebar';
import SetupForm from '../SetupForm.tsx';
import { mockEmails, getEmailById, getSummaryById, getRepliesById } from '../../../utils/mockData';
import { Button } from '../button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { X } from 'lucide-react';

const Index = () => {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  
  const selectedEmail = selectedEmailId ? getEmailById(selectedEmailId) : null;
  const emailSummary = selectedEmailId ? getSummaryById(selectedEmailId) : null;
  const emailReplies = selectedEmailId ? getRepliesById(selectedEmailId) : null;
  
  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    
    // Mark the email as read
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };
  
  const handleStarToggle = (id: string, starred: boolean) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === id ? { ...email, starred } : email
      )
    );
    
    toast(starred ? "Email starred" : "Email unstarred",{
      description: "Your changes have been saved",
      duration: 2000,
    });
  };
  
  const handleBack = () => {
    setSelectedEmailId(null);
  };
  
  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };
  
  if (!isSetupComplete) {
    return <SetupForm onSetupComplete={() => setIsSetupComplete(true)} />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden bg-email-background">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <EmailSidebar onComposeClick={handleComposeClick} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden p-4 bg-white dark:bg-gray-900 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Email Assistant</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleComposeClick}
          >
            Compose
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          {/* Email list */}
          {!selectedEmailId && (
            <div className="w-full md:w-1/3 xl:w-1/4 p-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Inbox (5)</h2>
              {emails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  isSelected={email.id === selectedEmailId}
                  onClick={() => handleEmailClick(email.id)}
                  onStarToggle={handleStarToggle}
                />
              ))}
            </div>
          )}
          
          {/* Email detail */}
          {selectedEmailId && selectedEmail && emailSummary && emailReplies && (
            <div className="w-full p-4 overflow-y-auto">
              <EmailDetail
                email={selectedEmail}
                summary={emailSummary}
                replies={emailReplies}
                onBack={handleBack}
              />
            </div>
          )}
        </div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4"
              onClick={() => setIsComposeOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="p-4">
            <p className="text-center text-gray-500">
              Compose functionality will be implemented in the next version.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
