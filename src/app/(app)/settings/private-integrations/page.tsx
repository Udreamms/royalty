"use client";

import React from 'react';

// --- A simple placeholder for the illustration ---
const IllustrationPlaceholder = () => (
    <div className="w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
        {/* The illustration from the image would go here */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-muted-foreground">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
    </div>
);


export default function PrivateIntegrationsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg">
      
      {/* Illustration */}
      <IllustrationPlaceholder />
      
      {/* Title */}
      <h2 className="mt-8 text-xl font-semibold text-foreground">
        Start by creating a private integration
      </h2>
      
      {/* Description */}
      <p className="mt-2 max-w-md text-base text-muted-foreground">
        Private integrations are a simple yet secure way to integrate your account with third-party apps.
      </p>
      
      {/* Action Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          className="rounded-md border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
        >
          Learn More
        </button>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Create new integration
        </button>
      </div>
      
    </div>
  );
}