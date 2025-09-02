// src/app/automations/templates/page.tsx
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Mail, Facebook, Instagram } from 'lucide-react';

interface Template {
    id: string;
    title: string;
    description: string;
    icons: React.ReactNode[];
    popular?: boolean;
}

const recommendedTemplates: Template[] = [
    {
        id: '1',
        title: 'Welcome new contacts',
        description: 'Create greater engagement with new subscribers with a personalized greeting.',
        icons: [<Mail key="mail" className="h-5 w-5 text-muted-foreground" />],
        popular: true,
    },
    {
        id: '2',
        title: 'Share exclusive content with new leads',
        description: 'Receive new contacts from meta ads. Once approved, automatically send them exclusive member content via email.',
        icons: [
            <Mail key="mail" className="h-5 w-5 text-muted-foreground" />,
            <Facebook key="fb" className="h-5 w-5 text-muted-foreground" />,
            <Instagram key="ig" className="h-5 w-5 text-muted-foreground" />
        ],
    },
    {
        id: '3',
        title: 'Celebrate signup anniversaries',
        description: 'Offer promotions or well wishes that help your customers feel closer to your brand.',
        icons: [<Mail key="mail" className="h-5 w-5 text-muted-foreground" />],
    }
];

export default function FlowTemplatesPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                        Flow Templates
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Choose a pre-built automation to get started quickly.
                    </p>
                </div>
                 <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New
                </Button>
            </div>
            
            <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Try these recommended flows</h2>
                <p className="text-muted-foreground mt-1">
                    Some of these automation templates include generated email content that is personalized for you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {recommendedTemplates.map((template) => (
                        <Card key={template.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        {template.icons}
                                    </div>
                                    {template.popular && (
                                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">Popular</Badge>
                                    )}
                                </div>
                                <CardTitle className="pt-4">{template.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{template.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Use Template
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
