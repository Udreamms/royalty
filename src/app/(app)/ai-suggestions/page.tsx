
"use client";

import type { FormEvent } from 'react';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// CORRECTED IMPORT: Using the aliased 'AlertDescription_shadcn' as 'AlertDescription'
import { Alert, AlertTitle, AlertDescription_shadcn as AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, Lightbulb, Bot } from "lucide-react";
import { crmAssistantFlow } from "@/ai/flows/crm-assistant";
import { useToast } from "@/hooks/use-toast";

interface AiSuggestion {
  action: string;
  reason: string;
}

export default function AiSuggestionsPage() {
  const [clientProfile, setClientProfile] = useState("");
  const [communicationHistory, setCommunicationHistory] = useState("");
  const [suggestion, setSuggestion] = useState<AiSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isMounted) return;

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const combinedInput = `Client Profile: ${clientProfile}\n\nCommunication History: ${communicationHistory}`;
      const jsonResult = await crmAssistantFlow(combinedInput);
      const result: AiSuggestion = JSON.parse(jsonResult);
      
      setSuggestion(result);
      toast({
        title: "Suggestion Generated",
        description: "AI has analyzed the conversation.",
      });
    } catch (err) {
      console.error("Error getting AI suggestion:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to generate suggestion: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.16))]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            <Sparkles className="mr-3 h-7 w-7 text-accent" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Get a next-best-action suggestion based on client data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Client Information</CardTitle>
            <CardDescription>Provide client details for analysis.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientProfile" className="text-sm font-medium">Client Profile</Label>
                <Textarea
                  id="clientProfile"
                  value={clientProfile}
                  onChange={(e) => setClientProfile(e.target.value)}
                  placeholder="e.g., Interested in web design services, budget is around $5000..."
                  rows={8}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="communicationHistory" className="text-sm font-medium">Communication History</Label>
                <Textarea
                  id="communicationHistory"
                  value={communicationHistory}
                  onChange={(e) => setCommunicationHistory(e.target.value)}
                  placeholder="e.g., Client asked for a quote on... I replied with..."
                  rows={8}
                  className="mt-1"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Generate Suggestion
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">AI Recommendation</CardTitle>
            <CardDescription>The suggested next action will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {suggestion && !error && (
              <div className="space-y-4">
                 <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-primary" />
                    Suggested Action
                  </h3>
                  <p className="text-md font-bold text-primary-foreground bg-primary rounded-md px-3 py-2">
                    {suggestion.action || "No action suggested."}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                    Reasoning
                  </h3>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                    {suggestion.reason || "No reasoning provided."}
                  </p>
                </div>
              </div>
            )}
            {!suggestion && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Enter client data and click "Generate Suggestion" to see the AI recommendation.</p>
              </div>
            )}
             {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Analyzing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
