"use client";
import React, { useState } from 'react';

// --- Iconos SVG utilizados en la página ---
const FolderPlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

const SearchIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const PlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const EmptyStateIcon = ({ className = "h-12 w-12 text-primary" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
);

const FolderEditIcon = ({ className = "h-12 w-12 text-primary" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);


// --- Componente principal de la página ---
export default function CustomValuesPage() {
    const [activeTab, setActiveTab] = useState('Folders');
    const tabs = ['All Values', 'Folders'];

    const renderTabContent = () => {
        switch(activeTab) {
            case 'All Values':
                return (
                    <div className="mt-4 rounded-lg border bg-card">
                        {/* Barra de búsqueda */}
                        <div className="p-4 border-b">
                            <div className="relative w-full max-w-sm ml-auto">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon className="text-muted-foreground" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Search Custom Values"
                                    className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Encabezado de la tabla */}
                        <div className="grid grid-cols-[auto,3fr,2fr,2fr,2fr] items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Name</span>
                            <span>Folder</span>
                            <span>Key</span>
                            <span>Value</span>
                        </div>

                        {/* Estado vacío */}
                        <div className="text-center py-16 border-t">
                            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                                <EmptyStateIcon />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">No custom values to show yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new custom value.</p>
                            <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                <PlusIcon /> Add New Custom Value
                            </button>
                        </div>
                    </div>
                );
            case 'Folders':
                return (
                     <div className="mt-4 rounded-lg border bg-card">
                        {/* Barra de búsqueda */}
                        <div className="p-4 border-b">
                            <div className="relative w-full max-w-sm ml-auto">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon className="text-muted-foreground" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Search folders"
                                    className="w-full rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Encabezado de la tabla */}
                        <div className="grid grid-cols-[4fr,2fr,2fr] items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground">
                            <span>Name</span>
                            <span>Custom Values</span>
                            <span>Created On</span>
                        </div>

                        {/* Estado vacío */}
                        <div className="text-center py-16 border-t">
                            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                                <FolderEditIcon />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">No custom value folders to show yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new custom value folder.</p>
                            <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                <PlusIcon /> Add New Custom Value Folder
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* --- Encabezado --- */}
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Custom Values</h1>
                    <p className="mt-1 text-muted-foreground">Add, edit and delete your Custom Values.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted">
                        <FolderPlusIcon /> Add Folder
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                        New Custom Value
                    </button>
                </div>
            </header>

            {/* --- Pestañas de Navegación --- */}
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

            {/* --- Contenido de la Pestaña Activa --- */}
            <main>
                {renderTabContent()}
            </main>
        </div>
    );
}