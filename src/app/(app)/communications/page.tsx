import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommunicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Unified Inbox</h1>
          <p className="text-muted-foreground">Manage all conversations from your integrated channels in one place.</p>
        </div>
         <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" /> New Conversation
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="messenger" disabled>Messenger</TabsTrigger>
          <TabsTrigger value="instagram" disabled>Instagram</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">All Communications</CardTitle>
              <CardDescription>A centralized log of all client interactions across channels will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground">No Communications Logged</h3>
              <p className="text-muted-foreground">Messages from WhatsApp and other future integrations will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="whatsapp">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">WhatsApp Messages</CardTitle>
               <CardDescription>Real-time view of your WhatsApp conversations.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <p className="text-muted-foreground">This section will show live WhatsApp chats. Current conversations can be seen within each prospect's or client's detail view.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
