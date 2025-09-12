"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Iconos SVG utilizados en la página ---
const PlusIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const EllipsisHorizontalIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

const PencilIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const TrashIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09.92-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

// --- Componente reutilizable para el interruptor ---
const ToggleSwitch = ({ leftLabel, rightLabel }) => (
    <div className="flex items-center gap-3 text-sm font-medium text-foreground">
        <span>{leftLabel}</span>
        <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" value="" className="peer sr-only" />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
        <span>{rightLabel}</span>
    </div>
);

// --- Componente reutilizable para una regla de puntuación (MODIFICADO) ---
const ScoringRule = ({ action, calculation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);
    
    return (
        <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-sm font-medium text-foreground">{action}</p>
            <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">{calculation}</p>
                <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                    >
                        <EllipsisHorizontalIcon />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-border z-10">
                            <div className="py-1">
                                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted">
                                    <PencilIcon />
                                    <span>Edit</span>
                                </button>
                                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-muted">
                                    <TrashIcon className="text-red-600"/>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Componente principal de la página ---
export default function ManageScoringPage() {

    const scoringRules = [
        { action: 'if an email is - Opened', calculation: 'Add 1 point' },
        { action: 'if an appointment Status is - Confirmed', calculation: 'Add 1 point' },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">Manage Scoring</h1>

            <div className="mt-6 rounded-xl border bg-card">
                {/* Encabezado de la tarjeta */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Engagement Score</h2>
                        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                            This score profile uses predefined rules to measure how engaged contacts are with the platform. This will provide valuable insights into each contact's interaction and participation.
                        </p>
                    </div>
                    <ToggleSwitch leftLabel="Draft" rightLabel="Publish" />
                </div>

                {/* Barra de herramientas para agregar reglas */}
                <div className="flex items-center justify-between gap-4 border-y bg-muted/30 px-6 py-3">
                    <p className="text-sm text-muted-foreground">
                        Use the score builder to add/subtract scores in a profile and publish it to make it live. 
                        <a href="#" className="ml-1 font-semibold text-primary hover:underline">Learn More</a>
                    </p>
                    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                        <PlusIcon /> Add new rule
                    </button>
                </div>

                {/* Lista de Reglas */}
                <div className="p-6">
                    <div className="flex justify-between px-4 py-2 text-sm font-semibold text-muted-foreground">
                        <span>Action</span>
                        <span>Calculation</span>
                    </div>
                    <div className="mt-4 space-y-4">
                        {scoringRules.map((rule, index) => (
                            <ScoringRule key={index} action={rule.action} calculation={rule.calculation} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}