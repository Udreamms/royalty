"use client";

import React, { useState } from 'react';
import { Mic, MessageSquare, PlusCircle, AudioLines, Link as LinkIcon, RadioTower } from 'lucide-react';

export default function AiAgentsPage() {
    // State para manejar las pestañas activas
    const [activeTab, setActiveTab] = useState('Getting Started');
    const [activeSubTab, setActiveSubTab] = useState('Voice AI');

    // Datos para la navegación y contenido
    const mainNavItems = ['Getting Started', 'Voice AI', 'Conversation AI', 'Knowledge Base', 'Agent Templates', 'Content AI'];
    
    const sideNavItems = [
        { name: 'Voice AI', icon: Mic },
        { name: 'Conversation AI', icon: MessageSquare },
    ];

    const gettingStartedSteps = [
        {
            icon: PlusCircle,
            title: 'Create Your First Voice AI Agent',
            description: 'Spin up a new Voice AI agent in just a few clicks. Configure its name, greeting, and basic conversation flow to begin harnessing voice-based interactions.',
        },
        {
            icon: AudioLines,
            title: 'Test & Talk to Your Voice AI Agent',
            description: "Engage in a quick test call with your Voice AI agent. This helps confirm it's set up correctly, and you'll get a feel for how it handles basic conversations.",
        },
        {
            icon: LinkIcon,
            title: 'Assign a Phone Number & Go Live',
            description: 'Link a dedicated phone number to your Voice AI agent or enable it as a backup to the phone number in case you are not around.',
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <div className="p-6 sm:p-8">
                {/* 1. Navegación Principal */}
                <header className="border-b border-gray-200">
                    <h1 className="text-2xl font-bold">AI Agents</h1>
                    <nav className="mt-4 -mb-px">
                        <ul className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                            {mainNavItems.map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => setActiveTab(item)}
                                        className={`py-2 px-1 sm:px-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                                            activeTab === item
                                                ? 'border-blue-600 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>

                {/* 2. Banner del Concurso */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl flex-shrink-0 animate-pulse">
                           <span role="img" aria-label="Agent Icon">😎</span>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold">Build Your AI Agents and Compete for $50k</h2>
                            <p className="text-blue-200 text-sm">Start building your Agents <span className="font-bold text-white">Now</span></p>
                            <p className="text-xs text-blue-300 mt-1">(Only visible to Agency Admins)</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full sm:w-auto flex-shrink-0">
                        <div className="text-center">
                            <span className="text-xs font-semibold tracking-wider text-blue-200">CONTEST ENDS IN</span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">14</span><span className="text-xs block -mt-1">d</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">01</span><span className="text-xs block -mt-1">h</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">06</span><span className="text-xs block -mt-1">m</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">55</span><span className="text-xs block -mt-1">s</span></div>
                            </div>
                        </div>
                         <div className="flex items-center gap-2 w-full">
                            <button className="w-1/2 text-sm bg-transparent border border-white/50 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                                <RadioTower className="w-4 h-4" /> Live Help
                            </button>
                            <button className="w-1/2 text-sm bg-white text-blue-700 font-semibold rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors">
                                View Leaderboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Contenido Principal (2 columnas) */}
                <main className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Columna Izquierda: Navegación Lateral */}
                    <aside className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-500 mb-4 px-3">Getting Started</h3>
                        <nav className="space-y-1">
                            {sideNavItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveSubTab(item.name)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        activeSubTab === item.name
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </button>
                                );
                             })}
                        </nav>
                    </aside>

                    {/* Columna Derecha: Contenido */}
                    <section className="lg:col-span-3">
                        <p>Hey Udreamms, here are few things you can get started with</p>
                        <div className="mt-6 space-y-4">
                            {gettingStartedSteps.map((step) => {
                                const Icon = step.icon;
                                return (
                                <div key={step.title} className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4 transition-shadow hover:shadow-sm cursor-pointer">
                                    <Icon className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">{step.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}