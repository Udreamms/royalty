
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlayCircle, Bot } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data to represent automation flows, consistent with All Flows page
const sampleCampaigns = [
    { id: 'flow_1', name: 'Welcome Email Series', status: 'active', createdAt: new Date('2024-07-20') },
    { id: 'flow_2', name: 'Lead Nurturing Follow-up', status: 'draft', createdAt: new Date('2024-07-18') },
];


export default function CampaignsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                     <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-500">
                        Campaigns
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Launch and monitor your automation flows as campaigns.
                    </p>
                </div>
                 <Button disabled>
                    <PlayCircle className="mr-2 h-4 w-4" /> Launch New Campaign
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Active and Draft Campaigns</CardTitle>
                    <CardDescription>
                        A list of all your campaigns based on the automation flows you've created.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Campaign Name (from Flow)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleCampaigns.map((campaign) => (
                                <TableRow key={campaign.id}>
                                    <TableCell>
                                        <Link
                                            href={`/automations/${campaign.id}`}
                                            className="flex items-center gap-2 hover:underline font-medium text-foreground"
                                            legacyBehavior>
                                           <Bot className="h-4 w-4 text-primary" /> {campaign.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'} className={campaign.status === 'active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'}>
                                            {campaign.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{campaign.createdAt.toLocaleDateString()}</TableCell>
                                     <TableCell>
                                        <Button variant="outline" size="sm" disabled={campaign.status !== 'draft'}>
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            Launch
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
