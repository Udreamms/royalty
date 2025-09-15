"use client";

import React, { useState } from 'react';

// --- Iconos SVG utilizados en la página ---
const PlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"/>
    </svg>
);

const FolderPlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0
              00-1.061-.44H4.5A2.25 2.25 0
              002.25 6v12a2.25 2.25 0
              002.25 2.25h15A2.25 2.25 0
              0021.75 18V9a2.25 2.25 0
              00-2.25-2.25h-5.379a1.5 1.5 0
              01-1.06-.44z"/>
    </svg>
);

const SearchIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0
              105.196 5.196a7.5 7.5 0
              0010.607 10.607z"/>
    </svg>
);

const FolderIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0
              014.5 9.75h15A2.25 2.25 0
              0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5
              1.5 0 00-1.061-.44H4.5A2.25
              2.25 0 002.25 6v12a2.25 2.25 0
              002.25 2.25h15A2.25 2.25 0
              0021.75 18V9a2.25 2.25 0
              00-2.25-2.25h-5.379a1.5 1.5 0
              01-1.06-.44z"/>
    </svg>
);

const CopyIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504
              1.125-1.125 1.125h-9.75a1.125
              1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125
              1.125-1.125H6.75a9.06 9.06 0
              011.5.124m7.5 10.376h3.375c.621
              0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06
              9.06 0 00-1.5-.124H9.375c-.621
              0-1.125.504-1.125 1.125v3.5m7.5
              10.375H9.375a1.125 1.125 0
              01-1.125-1.125v-9.25m12
              6.625v-1.875a3.375 3.375 0
              00-3.375-3.375h-1.5a1.125
              1.125 0 01-1.125-1.125v-1.5a3.375
              3.375 0 00-3.375-3.375H9.75"/>
    </svg>
);

const ChevronLeftIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"/>
    </svg>
);

const ChevronRightIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
    </svg>
);

// --- Faltaban estos iconos ---
const Bars3Icon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5
              5.25h16.5"/>
    </svg>
);

const EllipsisHorizontalIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5
              0 .75.75 0 011.5 0zm6 0a.75.75
              0 11-1.5 0 .75.75 0 011.5
              0zm6 0a.75.75 0 11-1.5 0 .75.75
              0 011.5 0z"/>
    </svg>
);

const ChevronDownIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
    </svg>
);

// --- Componente principal de la página ---
export default function CustomFieldsPage() {
    const [activeTab, setActiveTab] = useState('All Fields');
    const [currentPage, setCurrentPage] = useState(1);
    const tabs = ['All Fields', 'Folders', 'Deleted Fields'];

    // --- Datos para "All Fields" ---
    const fieldsData = [
        { name: 'First Name', object: 'Contact', folder: 'Contact', key: '{{ contact.first_name }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Last Name', object: 'Contact', folder: 'Contact', key: '{{ contact.last_name }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Email', object: 'Contact', folder: 'Contact', key: '{{ contact.email }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Phone', object: 'Contact', folder: 'Contact', key: '{{ contact.phone }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Date Of Birth', object: 'Contact', folder: 'Contact', key: '{{ contact.date_of_birth }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Contact Source', object: 'Contact', folder: 'Contact', key: '{{ contact.source }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Contact Type', object: 'Contact', folder: 'Contact', key: '{{ contact.type }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Opportunity Name', object: 'Opportunity', folder: 'Opportunity Details', key: '{{ opportunity.name }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Pipeline', object: 'Opportunity', folder: 'Opportunity Details', key: '{{ opportunity.pipeline_id }}', created: '25/8/2025 at 5:35 PM' },
        { name: 'Stage', object: 'Opportunity', folder: 'Opportunity Details', key: '{{ opportunity.pipeline_stage_id }}', created: '25/8/2025 at 5:35 PM' },
    ];

    // --- Datos para "Folders" ---
    const foldersData = [
        { name: 'Contact', object: 'Contact', fields: 7, created: '25/8/2025 at 5:35 PM' },
        { name: 'General Info', object: 'Contact', fields: 8, created: '25/8/2025 at 5:35 PM' },
        { name: 'Additional Info', object: 'Contact', fields: 0, created: '25/8/2025 at 5:35 PM' },
    ];

    // --- Componentes "All Fields" ---
    const TableHeader = () => (
        <div className="grid grid-cols-[auto,2fr,1fr,1fr,2fr,1fr] items-center gap-4 px-4 py-3 bg-muted/50 text-sm font-semibold text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <span>Field Name</span>
            <span>Object</span>
            <span>Folder</span>
            <span>Unique Key</span>
            <span>Created On</span>
        </div>
    );

    const TableRow = ({ field }) => {
        if (!field || typeof field !== 'object') return null;
        return (
            <div className="grid grid-cols-[auto,2fr,1fr,1fr,2fr,1fr] items-center gap-4 px-4 py-3 border-t text-sm text-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="font-medium">{field.name}</span>
                <span>{field.object}</span>
                <div className="flex">
                    <span className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        <FolderIcon /> {field.folder}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-mono text-xs bg-muted/60 px-2 py-1 rounded-md">{field.key}</span>
                    <button className="ml-2 text-muted-foreground hover:text-foreground"><CopyIcon /></button>
                </div>
                <span className="text-muted-foreground">{field.created}</span>
            </div>
        );
    };

    const Pagination = () => (
        <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground">Showing 1 to 10 of 33 results</p>
            <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                {/* Controles de paginación */}
            </nav>
        </div>
    );

    // --- Definición del tab "All Fields" ---
    const AllFieldsTab = () => (
        <>
            <div className="mt-6 flex items-center justify-between">
                <div className="relative w-full max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="text-muted-foreground" />
                    </div>
                    <input type="text" placeholder="Search"
                           className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"/>
                </div>
                <button className="text-sm font-semibold text-primary hover:underline">Group By All</button>
            </div>
            <div className="mt-6 rounded-lg border">
                <TableHeader />
                <div>{fieldsData.map((field) => <TableRow key={field.name} field={field} />)}</div>
                <Pagination />
            </div>
        </>
    );

    // --- Componentes para "Folders" ---
    const FoldersTab = () => {
        const FolderTableHeader = () => (
            <div className="grid grid-cols-[auto,3fr,2fr,1fr,2fr,auto] items-center gap-4 px-4 py-3 bg-muted/50 text-sm font-semibold text-muted-foreground">
                <span className="cursor-grab text-muted-foreground"><Bars3Icon/></span>
                <span>Folder Name</span>
                <span>Object</span>
                <span>Fields</span>
                <span>Created On</span>
                <span></span>
            </div>
        );

        const FolderTableRow = ({ folder }) => (
            <div className="grid grid-cols-[auto,3fr,2fr,1fr,2fr,auto] items-center gap-4 px-4 py-3 border-t text-sm text-foreground">
                <span className="cursor-grab text-muted-foreground"><Bars3Icon/></span>
                <span className="font-medium">{folder.name}</span>
                <span className="text-muted-foreground">{folder.object}</span>
                <span className="text-muted-foreground">{folder.fields}</span>
                <span className="text-muted-foreground">{folder.created}</span>
                <button className="text-muted-foreground hover:text-foreground"><EllipsisHorizontalIcon /></button>
            </div>
        );

        const FolderPagination = () => (
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">Showing 1 to 3 of 3 results</p>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Page Size 10</span>
                    <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                        <button className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-border hover:bg-muted"><ChevronLeftIcon /></button>
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground">1</button>
                        <button className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-border hover:bg-muted"><ChevronRightIcon /></button>
                    </nav>
                </div>
            </div>
        );

        return (
            <>
                <div className="mt-6 flex items-center justify-between">
                    <div className="relative w-full max-w-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="text-muted-foreground" />
                        </div>
                        <input type="text" placeholder="Search"
                               className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"/>
                    </div>
                    <button className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
                        <span>Contact</span>
                        <ChevronDownIcon className="text-muted-foreground" />
                    </button>
                </div>
                <div className="mt-6 rounded-lg border">
                    <FolderTableHeader />
                    <div>{foldersData.map(folder => <FolderTableRow key={folder.name} folder={folder} />)}</div>
                    <FolderPagination />
                </div>
            </>
        );
    };

    

    // --- Render tabs ---
    const renderTabContent = () => {
        switch(activeTab) {
            case 'All Fields':
                return <AllFieldsTab />;
            case 'Folders':
                return <FoldersTab />;
            case 'Deleted Fields':
    return (
        <div className="mt-8 rounded-md bg-blue-100 border border-blue-300 p-4 flex items-start gap-2 text-sm">
            {/* Icono de información */}
            <svg xmlns="http://www.w3.org/2000/svg" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 strokeWidth={1.5} 
                 stroke="currentColor" 
                 className="h-5 w-5 text-blue-600 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25h1.5v5.25h-1.5v-5.25zM12 8.25h.008v.008H12V8.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {/* Texto con link */}
            <p className="text-blue-900">
                You can view deleted Custom Fields on the Audit Logs page{" "}
                <a href="/audit-logs" className="text-blue-700 font-medium underline hover:text-blue-900">
                    here
                </a>
            </p>
        </div>
    );

            default:
                return null;
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="border-b border-border">
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
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted">
                        <FolderPlusIcon /> Add Folder
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                        <PlusIcon /> Add Field
                    </button>
                </div>
            </header>
            <main>
                {renderTabContent()}
            </main>
        </div>
    );
}
