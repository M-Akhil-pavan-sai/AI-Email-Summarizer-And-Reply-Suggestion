
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Checkbox } from './checkbox';
import { Mail, Lock, Server, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface SetupFormProps {
  onSetupComplete: () => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onSetupComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    server: '',
    port: '993',
    useSsl: true,
    provider: 'custom'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProviderChange = (value: string) => {
    setFormData(prev => {
      // Set default values based on provider
      if (value === 'gmail') {
        return {
          ...prev,
          provider: value,
          server: 'imap.gmail.com',
          port: '993',
          useSsl: true
        };
      } else if (value === 'outlook') {
        return {
          ...prev,
          provider: value,
          server: 'outlook.office365.com',
          port: '993',
          useSsl: true
        };
      } else {
        return {
          ...prev,
          provider: value
        };
      }
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, useSsl: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsLoading(false);
      
      toast("Connection successful",{
        description: "Your email account has been connected successfully!",
      });
      
      onSetupComplete();
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-email-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-email-primary flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Connect Email Account</CardTitle>
          <CardDescription className="text-center">
            Connect your email account to start using AI-powered email management
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Email Provider</Label>
              <Select 
                defaultValue={formData.provider}
                onValueChange={handleProviderChange}
              >
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail</SelectItem>
                  <SelectItem value="outlook">Outlook</SelectItem>
                  <SelectItem value="custom">Other (Custom)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password or App Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-xs text-email-text-muted">
                For Gmail and other providers that use 2FA, use an app password.
              </p>
            </div>
            
            {formData.provider === 'custom' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="server">IMAP Server</Label>
                  <div className="relative">
                    <Server className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="server"
                      name="server"
                      placeholder="imap.example.com"
                      className="pl-10"
                      value={formData.server}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      name="port"
                      type="text"
                      placeholder="993"
                      value={formData.port}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex items-end pb-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="useSsl" 
                        checked={formData.useSsl}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label 
                        htmlFor="useSsl" 
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <ShieldCheck className="h-4 w-4 mr-1 text-email-text-muted" />
                        Use SSL
                      </Label>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-800 dark:text-blue-200 mt-4">
              <p className="font-medium mb-1">Security Note</p>
              <p className="text-xs">
                Your credentials are securely stored locally and only used to connect to your email provider. We never store your password on our servers.
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-email-primary hover:bg-email-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Email Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SetupForm;
