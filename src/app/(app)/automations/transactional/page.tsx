// src/app/automations/transactional/page.tsx
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle, Mail } from 'lucide-react';

export default function TransactionalEmailsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                        Transactional Emails
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage emails sent in response to user actions.
                    </p>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Transactional Email
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Transactional Emails</CardTitle>
                    <CardDescription>Emails for events like password resets, confirmations, etc.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
                    <Mail className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Transactional Emails Configured</h3>
                    <p className="text-muted-foreground">Set up emails for key application events.</p>
                </CardContent>
            </Card>
        </div>
    )
}
