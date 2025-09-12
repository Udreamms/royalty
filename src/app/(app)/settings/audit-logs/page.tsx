"use client";

import React, { useState } from "react";
import { ReactNode } from "react";

interface FilterDropdownProps {
  children: ReactNode;
}

// --- SVG Icons ---
const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ChevronDownIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const XMarkIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowPathIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l4.992-4.993m-4.993 0l-3.181 3.183a8.25 8.25 0 000 11.664l3.181 3.183" />
  </svg>
);

const EllipsisHorizontalIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const DocumentDuplicateIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 013.75 20.625V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876A9.06 9.06 0 009.375 2.25H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const WrenchScrewdriverIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L6.75 3.75l-2.472 2.472a3.375 3.375 0 000 4.773l1.573 1.573-1.573 1.573a3.375 3.375 0 000 4.773l2.472 2.472" />
  </svg>
);

const PlusCircleIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- Reusable Filter Dropdown Component ---
const FilterDropdown = ({ children }: FilterDropdownProps) => (
  <button className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
    <span>{children}</span>
    <ChevronDownIcon className="text-muted-foreground" />
  </button>
);

// --- Main Page Component ---
export default function AuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const logs = [
    { name: "EMU0bQFvbJIIJEJl0kQ", module: "Contact", moduleIcon: <DocumentDuplicateIcon />, action: "Created", user: "CONVERSATIONS", userColor: "bg-red-200", userInitial: "?", role: "", date: "Aug 25, 2025 at 5:40 PM - 05" },
    { name: "Country", id: "KZNWkZR8f0xvHCHvWFFz8", module: "Custom Field", moduleIcon: <WrenchScrewdriverIcon />, action: "Created", user: "Udreamms Llc", userColor: "bg-purple-200", userInitial: "UL", role: "Web User", date: "Aug 25, 2025 at 5:36 PM - 05" },
    { name: "Postal Code", id: "dxFoifprW1ec9zLNHDJ0", module: "Custom Field", moduleIcon: <WrenchScrewdriverIcon />, action: "Created", user: "Udreamms Llc", userColor: "bg-purple-200", userInitial: "UL", role: "Web User", date: "Aug 25, 2025 at 5:36 PM - 05" },
    { name: "Description", id: "LwAAV0Y9nMCyOW0W5nLcTi", module: "Custom Field", moduleIcon: <WrenchScrewdriverIcon />, action: "Created", user: "Udreamms Llc", userColor: "bg-purple-200", userInitial: "UL", role: "Web User", date: "Aug 25, 2025 at 5:36 PM - 05" },
    { name: "City", id: "UJFCu3kyE3yLlicMXL8vJ", module: "Custom Field", moduleIcon: <WrenchScrewdriverIcon />, action: "Created", user: "Udreamms Llc", userColor: "bg-purple-200", userInitial: "UL", role: "Web User", date: "Aug 25, 2025 at 5:36 PM - 05" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
      <h1 className="text-2xl font-semibold">Audit Logs</h1>
      <p className="mt-2 text-muted-foreground">View audit logs and track changes to your account.</p>

      {/* --- Filter Toolbar --- */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-muted-foreground" />
          </div>
          <input type="text" placeholder="Search" className="w-full sm:w-auto rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary" />
        </div>
        <FilterDropdown>Select Users</FilterDropdown>
        {/* Dropdown de 'Action - All' */}
        <div className="relative group">
          <FilterDropdown>Action - All</FilterDropdown>
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Created</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Updated</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Deleted</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Restored</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Updated (Contact Merge)</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Deleted (Contact Merge)</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tag Added</a>
            </div>
          </div>
        </div>
        {/* Dropdown de 'Module - All' */}
        <div className="relative group">
          <FilterDropdown>Module - All</FilterDropdown>
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Module - All</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Agency</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">API Key</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Calendar Event</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Calendar Integrations</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Calendars</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Company</a>
            </div>
          </div>
        </div>
        {/* Dropdown de 'Last 60 days' */}
        <div className="relative group">
          <FilterDropdown>Last 60 days</FilterDropdown>
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 60 days</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Today</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Yesterday</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">This week</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last week</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">This month</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last month</a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button aria-label="Clear filters" className="p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20">
            <XMarkIcon />
          </button>
          <button aria-label="Refresh logs" className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <ArrowPathIcon />
          </button>
        </div>
      </div>

      {/* --- Audit Logs Table --- */}
      <div className="mt-6 rounded-lg border bg-card">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr,1.5fr,1.5fr,2fr,2fr,auto] items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground bg-muted/50">
          <span>Name</span>
          <span>Module</span>
          <span>Action</span>
          <span>Done by</span>
          <span>Date and Time</span>
          <span></span>
        </div>

        {/* Table Body */}
        <div>
          {logs.map((log, index) => (
            <div key={index} className="grid grid-cols-[3fr,1.5fr,1.5fr,2fr,2fr,auto] items-center gap-4 px-4 py-3 border-t text-sm">
              <div>
                <p className="font-medium text-foreground">{log.name}</p>
                {log.id && <p className="text-xs text-muted-foreground">{log.id}</p>}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                {log.moduleIcon} {log.module}
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                  <PlusCircleIcon className="text-green-600" /> {log.action}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${log.userColor}`}>{log.userInitial}</span>
                <div>
                  <p className="font-medium text-foreground">{log.user}</p>
                  <p className="text-xs text-muted-foreground">{log.role}</p>
                </div>
              </div>
              <div className="text-muted-foreground">{log.date}</div>
              <div>
                <button aria-label="More options" className="p-1 text-muted-foreground hover:text-foreground">
                  <EllipsisHorizontalIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Page Size</span>
            <select className="rounded-md border bg-transparent px-2 py-1 text-sm focus:ring-primary focus:border-primary">
              <option>8</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm">
            <button className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm ring-1 ring-inset ring-border hover:bg-muted">Previous</button>
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === page ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-inset ring-border hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm ring-1 ring-inset ring-border hover:bg-muted">Next</button>
          </nav>
        </div>
      </div>
    </div>
  );
}