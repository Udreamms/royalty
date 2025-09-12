"use client";

import React from 'react';

// --- A simple placeholder for the illustration ---
const RocketIllustration = () => (
    <div className="hidden lg:block">
        {/* The illustration from the image would go here */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-48 h-48 text-muted-foreground/20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 017.38-5.84m-2.56 5.84l-7.38 7.38m0 0a6 6 0 01-9.9-3.42m3.42 9.9l7.38-7.38m-7.38 7.38l-3.42 9.9m8.25-11.84a6 6 0 00-7.38-5.84m5.84 2.56l7.38 7.38m0 0a6 6 0 003.42-9.9m-3.42 9.9l-7.38-7.38m7.38-7.38l-9.9 3.42m9.9-3.42l-3.42-9.9" />
        </svg>
    </div>
);

// --- Toggle Switch Component ---
const ToggleSwitch = ({ isEnabled }) => (
    <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={isEnabled} className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
    </label>
);

// --- Reusable Feature Card Component ---
const FeatureCard = ({ title, description, status, statusColor, isEnabled, note }) => (
    <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <div className="text-right">
                {note && <p className="text-xs text-muted-foreground mb-1">{note}</p>}
                <ToggleSwitch isEnabled={isEnabled} />
            </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
            {description}
            <button className="mt-2 text-sm font-semibold text-primary hover:underline">Show More</button>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                {status}
            </span>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline">
                Submit Feedback
            </button>
        </div>
    </div>
);


// --- Main Page Component ---
export default function LabsPage() {

    const features = [
        {
            title: "Workflows - Highlight in case of Error",
            description: "We are adding a visual indicator (e.g., an orange exclamation mark icon) on any workflow action or trigger that experiences an error. When users ho...",
            status: "Live",
            statusColor: "bg-green-100 text-green-800",
            isEnabled: true,
        },
        {
            title: "Internal Chat for Team Collaboration",
            note: "Enabling in 50 days",
            description: (<>
                <p>Collaborate with your sub-account users directly within the Conversations module:</p>
                <p className="mt-2 font-semibold">What you can do:</p>
                <p>Collaborate with your team using private, internal chats — right inside the Conversations module</p>
            </>),
            status: "Live in 68 days",
            statusColor: "bg-gray-100 text-gray-800",
            isEnabled: false,
        },
        {
            title: "Chat Widget - Performance Improvements",
            description: (<>
                <p>Faster, lighter, and more stable chat widget experience</p>
                <p className="mt-2">This update brings key performance enhancements to the chat widget, helping it load faster and run more smoothly across all network types.</p>
                <p className="mt-2">⚡</p>
            </>),
            status: "Live in 19 days",
            statusColor: "bg-gray-100 text-gray-800",
            isEnabled: false,
        },
        {
            title: "Autosave in Email Builder",
            description: (<>
                <p>Never lose your edits—your work is saved automatically every few seconds</p>
                <p className="mt-2">We’ve introduced Auto-Save in the Email Builder to make editing faster, safer, and more reliable. All your unsaved edits are automatically saved du...</p>
            </>),
            status: "Live in 19 days",
            statusColor: "bg-gray-100 text-gray-800",
            isEnabled: true,
        },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* --- Header --- */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Labs</h1>
                <p className="mt-1 text-muted-foreground">Test out the new features before everyone else</p>
            </div>

            {/* --- Welcome Banner --- */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 rounded-lg border bg-card p-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Welcome to our Beta Program</h2>
                    <p className="mt-2 text-base text-muted-foreground max-w-xl">
                        Experiment with our latest and greatest features before they're available to everyone. These features are in early access and may change as we develop them. Your feedback will help shape what they become.
                    </p>
                </div>
                <RocketIllustration />
            </div>
            
            {/* --- Features List --- */}
            <div className="mt-8 space-y-6">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        status={feature.status}
                        statusColor={feature.statusColor}
                        isEnabled={feature.isEnabled}
                        note={feature.note}
                    />
                ))}
            </div>
        </div>
    );
}