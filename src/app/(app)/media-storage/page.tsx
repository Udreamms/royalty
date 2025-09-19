"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Link,
    Cloud,
    MessageSquare,
    Upload,
    MoreHorizontal,
    Search,
    LayoutGrid,
    List,
    ChevronDown,
    Image as ImageIcon,
    RectangleHorizontal,
    Check
} from 'lucide-react';

// --- Iconos y Ilustraciones Personalizadas ---

const UnsplashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.5 3h-3v5.5h3V3zm-3 5.5H5v12.5h14V8.5h-5.5z"/>
    </svg>
);

const PixabayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.4 6.5l-1.3 1.3c-.4-.4-.8-.8-1.2-1.2l1.2-1.3c-1.3-1.1-3.2-.8-4.2.3-1.2 1.2-1.3 3.2-.3 4.4l-2.4 2.4c-1.8-3.1-1.3-7.2 1.3-9.8C8.1 2.9 12.3 3.5 15 6l-2.6.5zm5.1 1.5c.3-1.1.2-2.3-.3-3.2-.5-.9-1.3-1.6-2.2-2-.9-.4-1.9-.5-2.9-.2l2.3 2.3c.4.4.8.8 1.2 1.2l-2.3 2.3c1.1.3 2.3.2 3.2-.3.9-.5 1.6-1.3 2-2.2zm-2.9 8.2l1.3-1.3c.4.4.8.8 1.2 1.2l-1.2 1.3c1.3 1.1 3.2.8 4.2-.3 1.2-1.2 1.3-3.2.3-4.4l2.4-2.4c1.8 3.1 1.3 7.2-1.3 9.8-2.6 2.6-6.7 2-9.2-.7z"/>
    </svg>
);

const UfoIllustration = () => (
    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M159.2 60.1C159.2 52.8 132.3 47 100 47C67.7 47 40.8 52.8 40.8 60.1C40.8 67.4 67.7 73.2 100 73.2C132.3 73.2 159.2 67.4 159.2 60.1Z" stroke="#B0B0B0" strokeWidth="2"/>
        <path d="M135 60.1C135 55.4 119.3 51.5 100 51.5C80.7 51.5 65 55.4 65 60.1C65 64.8 80.7 68.7 100 68.7C119.3 68.7 135 64.8 135 60.1Z" stroke="#E0E0E0" strokeWidth="2"/>
        <path d="M60 76L80 130L120 130L140 76" fill="#FDE047" fillOpacity="0.3"/>
        <path d="M80 130L83.5 110L116.5 110L120 130" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M90.5 118L95.5 98.5L104.5 98.5L109.5 118" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="65" y="145" fontFamily="Arial" fontSize="12" fill="#B0B0B0">No media files found</text>
    </svg>
);


export default function MediaStoragePage() {
    const mediaSources = [
        { value: 'all', label: 'All', icon: <Check className="h-4 w-4" /> },
        { value: 'my-media', label: 'My Media', icon: <ImageIcon className="h-4 w-4" /> },
        { value: 'backgrounds', label: 'Backgrounds', icon: <RectangleHorizontal className="h-4 w-4" /> },
        { value: 'unsplash', label: 'Unsplash', icon: <UnsplashIcon className="h-4 w-4" /> },
        { value: 'pixabay', label: 'Pixabay', icon: <PixabayIcon className="h-4 w-4" /> },
    ];
    const sortOptions = [
        "Name: A to Z", "Name: Z to A", "Size: Smallest First", "Size: Largest First", 
        "Modified: Newest First", "Modified: Oldest First"
    ];

    return (
        <div className="p-6 bg-background text-foreground min-h-screen space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Media Storage</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Link className="mr-2 h-4 w-4"/> Connect Drive</Button>
                    <Button variant="outline" size="icon"><Cloud className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon"><MessageSquare className="h-4 w-4"/></Button>
                    <Button><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                </div>
            </header>

            <div className="flex justify-between items-center">
                <Select defaultValue="my-media">
                    <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {mediaSources.map(source => (
                            <SelectItem key={source.value} value={source.value}>
                                <div className="flex items-center gap-2">
                                    {source.icon}
                                    <span>{source.label}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search media or explore stock images." className="pl-10" />
                    </div>
                    <Select defaultValue="Modified: Newest First">
                        <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon"><LayoutGrid className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="bg-muted"><List className="h-4 w-4"/></Button>
                    </div>
                </div>
            </div>

            <main className="flex-grow">
                <div className="flex items-center gap-2 font-semibold text-sm">
                    <span>Folders</span>
                    <ChevronDown className="h-4 w-4" />
                </div>
                <div className="border-t border-b mt-2 py-2 px-4 flex justify-between items-center hover:bg-muted rounded-md">
                    <p>Relocated Item</p>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                </div>

                <div className="flex flex-col items-center justify-center text-center py-20">
                    <UfoIllustration />
                </div>
            </main>
        </div>
    );
}