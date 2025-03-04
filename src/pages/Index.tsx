
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import Logo from '@/components/Logo';
import WhitelistForm from '@/components/WhitelistForm';
import RegistrationCounter from '@/components/RegistrationCounter';
import { getWhitelistCount, getMaxSpots } from '@/lib/whitelist';

const Index = () => {
  const [whitelistCount, setWhitelistCount] = useState(0);
  const maxSpots = getMaxSpots();
  
  // Update counter when component mounts and after successful registration
  const updateCounter = () => {
    setWhitelistCount(getWhitelistCount());
  };
  
  useEffect(() => {
    updateCounter();
    
    // Add animation classes to elements when component mounts
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up');
        el.classList.remove('opacity-0');
      }, 100 * index);
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background flex flex-col items-center justify-center p-6">
      <div className="fixed top-0 left-0 w-full p-4 z-10">
        <Logo className="mx-auto md:mx-0 animate-fade-in" />
      </div>
      
      <div className="w-full max-w-md mx-auto mt-16">
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center animate-on-mount opacity-0">
            Join <span className="text-primary">dadvisor.ai</span> Exclusive Beta
          </h1>
          
          <p className="text-lg text-center text-muted-foreground animate-on-mount opacity-0 animation-delay-200">
            Limited to only 300 early adopters. Secure your spot today.
          </p>
        </div>
        
        <GlassCard className="mb-8 animate-on-mount opacity-0 animation-delay-400">
          <div className="mb-8">
            <RegistrationCounter
              currentCount={whitelistCount}
              maxCount={maxSpots}
            />
          </div>
          
          <WhitelistForm onSuccess={updateCounter} />
        </GlassCard>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Personalized Advice", description: "Get AI-powered financial guidance tailored to your needs" },
            { title: "Early Access", description: "Be the first to experience our innovative platform" },
            { title: "Premium Support", description: "Enjoy priority assistance from our expert team" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`glass-morphism rounded-lg p-4 text-center animate-on-mount opacity-0 animation-delay-${(index + 3) * 200}`}
            >
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="w-full max-w-md mx-auto mt-16 text-center text-sm text-muted-foreground animate-fade-in">
        <p>&copy; {new Date().getFullYear()} dadvisor.ai. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
