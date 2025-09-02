"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle } from "lucide-react";

interface Integration {
  name: string;
  description: string;
  logo: React.ReactNode;
  isConnected: boolean;
}

const WhatsAppLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const MessengerLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.15 0 4.156-.566 5.906-1.573L24 24l-1.427-6.094A11.95 11.95 0 0 0 24 12c0-6.627-5.373-12-12-12zm-2.25 14.25L7.5 12l4.5-2.25V14.25zm4.5 0l2.25-2.25-4.5-2.25V14.25z"/>
  </svg>
);

const InstagramLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
);

const TelegramLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500">
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path d="M22 2 11 13" />
    </svg>
);


export default function IntegrationsPage() {

  const integrations: Integration[] = [
    {
      name: "WhatsApp Business",
      description: "Connect your WhatsApp Business API to manage conversations and bots.",
      logo: <WhatsAppLogo />,
      isConnected: true,
    },
    {
      name: "Facebook Messenger",
      description: "Respond to Messenger messages directly from the unified inbox.",
      logo: <MessengerLogo />,
      isConnected: false,
    },
    {
      name: "Instagram Direct",
      description: "Manage Instagram DMs and story replies alongside other channels.",
      logo: <InstagramLogo />,
      isConnected: false,
    },
    {
      name: "Telegram",
      description: "Integrate a Telegram bot to handle customer inquiries.",
      logo: <TelegramLogo />,
      isConnected: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Integrations Hub</h1>
        <p className="text-muted-foreground">
          Connect your favorite apps and communication channels to the CRM.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.name} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
            <div>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                {integration.logo}
                <div>
                  <CardTitle className="text-xl">{integration.name}</CardTitle>
                  <CardDescription className="mt-1">{integration.description}</CardDescription>
                </div>
              </CardHeader>
            </div>
            <CardContent>
              {integration.isConnected ? (
                <Button variant="outline" className="w-full border-green-500/50 text-green-400 cursor-not-allowed">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Connected
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Connect (Coming Soon)
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
