"use client";

import React from 'react';

// --- SVG Icons used in the page ---
const PlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const SearchIcon = ({ className = "h-5 w-5 text-muted-foreground" }) => (
    <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const TagIcon = ({ className = "h-12 w-12 text-primary" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);


// --- Main Page Component ---
export default function TagsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* --- Header --- */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tags</h1>
          <p className="mt-1 text-muted-foreground">Add, edit and delete your Tags.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <PlusIcon />
          New Tag
        </button>
      </header>

      {/* --- Main Content Card --- */}
      <div className="mt-8 rounded-lg border bg-card">
        {/* Toolbar */}
        <div className="p-4 border-b">
          <div className="relative w-full max-w-xs ml-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input 
              type="text"
              placeholder="Search Tags"
              className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-[auto,3fr,2fr,2fr] items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <span>Tags</span>
          <span>Created On</span>
          <span>Updated On</span>
        </div>
        
        {/* Empty State */}
        <div className="text-center py-16 border-t">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
            <TagIcon />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No tags to show yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new tag.</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
            <PlusIcon /> Add New Tag
          </button>
        </div>
      </div>
    </div>
  );
}