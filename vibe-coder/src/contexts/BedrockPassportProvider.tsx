import * as React from 'react';
import { BedrockPassportProvider } from '@bedrock_org/passport';

interface ProviderProps {
  children: React.ReactNode;
}

export const BedrockPassportAuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  return (
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com"
      authCallbackUrl="https://yourdomain.com/auth/callback"
      tenantId="orange-txj3cg2mb7"
      subscriptionKey="dfa2532aaff44b30ab6cc149a3b15a33"
    >
      {children}
    </BedrockPassportProvider>
  );
};
