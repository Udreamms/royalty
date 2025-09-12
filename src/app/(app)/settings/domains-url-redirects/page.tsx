"use client";

import React, { useState } from 'react';

// --- SVG Icons used in the page ---
const InfoIcon = ({ className = "h-5 w-5 text-muted-foreground" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
);

const GlobeIcon = ({ className = "h-8 w-8 text-primary" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const ShoppingCartIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-5.514a1.875 1.875 0 00-1.087-2.338H5.25l-.383-1.437a1.125 1.125 0 00-1.087-.835H2.25M7.5 14.25 6 18h12" />
    </svg>
);

const PlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const SearchIcon = ({ className = "h-5 w-5 text-muted-foreground" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

// --- Main Page Component ---
export default function DomainsUrlRedirectsPage() {
  const [activeTab, setActiveTab] = useState('URL Redirects');
  const tabs = ['Domains', 'URL Redirects'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Domains':
        return (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">Domains</h2>
              <InfoIcon />
            </div>

            {/* Empty State Card */}
            <div className="mt-6 flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GlobeIcon />
              </div>
              <p className="mt-4 font-semibold text-foreground">No domain found</p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted w-full sm:w-auto">
                  <ShoppingCartIcon /> Purchase/Transfer domain
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 w-full sm:w-auto">
                  <PlusIcon /> Connect a domain
                </button>
              </div>
            </div>

            {/* Learn More Banner */}
            <div className="mt-8 rounded-xl bg-muted/40 p-6 text-center">
              <h3 className="font-semibold text-foreground">Learn more about how domains work</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Read step-by-step article guide for seamless domain management{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  click here
                </a>
              </p>
            </div>
          </div>
        );
      case 'URL Redirects':
        return (
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">URL Redirects</h2>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 w-full sm:w-auto">
                  <PlusIcon /> Add a Redirect
                </button>
            </div>

            <div className="mt-6 flex justify-end">
                <div className="relative w-full max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search for redirects"
                        className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            <div className="mt-4 rounded-lg border bg-card">
                 <div className="grid grid-cols-4 items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground">
                    <span>Domain</span>
                    <span>Path</span>
                    <span>Destination</span>
                    <span>Created</span>
                </div>
                <div className="text-center py-16 border-t">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                        <SearchIcon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-4 font-semibold text-foreground">No url redirects found</p>
                    <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                      <PlusIcon /> Add a Redirect
                    </button>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground">Domains & URL Redirects</h1>
      
      {/* Tab Navigation */}
      <div className="mt-6 border-b border-border">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab
                              ? "border-primary text-primary"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                  >
                      {tab}
                  </button>
              ))}
          </nav>
      </div>

      {/* Tab Content */}
      <main>
          {renderContent()}
      </main>
    </div>
  );
}