
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addToWhitelist } from '@/lib/whitelist';
import { cn } from '@/lib/utils';

interface WhitelistFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSuccess?: () => void;
  className?: string;
}

const WhitelistForm = ({ onSuccess, className, ...props }: WhitelistFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay for smoother UX
    setTimeout(() => {
      const result = addToWhitelist(name, email);
      
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      });
      
      if (result.success) {
        setName("");
        setEmail("");
        if (onSuccess) onSuccess();
      }
      
      setIsSubmitting(false);
    }, 800);
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 px-4 bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4 bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
          disabled={isSubmitting}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Join Whitelist"
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        By joining, you agree to our <a href="#" className="underline hover:text-foreground transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default WhitelistForm;
