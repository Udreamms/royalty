"use client";

import React, { useState } from 'react';
import { ReactNode } from 'react';

interface IntegrationCardProps {
  children: ReactNode;
  className?: string;
}

interface AccountNotConnectedProps {
  platformName: string;
}

// --- A generic component for the card structure ---
const IntegrationCard = ({ children, className = "" }: IntegrationCardProps) => (
  <div className={`flex flex-col rounded-lg border bg-card p-6 text-center shadow-sm ${className}`}>
    {children}
  </div>
);

// --- Iconos SVG ---
const ChevronDownIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
        />
    </svg>
);

const WarningIcon = ({ className = "h-12 w-12 text-muted-foreground" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 
            1.948 3.374h14.71c1.73 0 2.813-1.874 
            1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 
            0L2.697 16.126z"
        />
    </svg>
);

// --- Componente para la pestaña "Facebook Form Fields Mapping" ---
const FacebookFormMappingTab = () => {
    return (
        <div className="mt-6">
            <h2 className="text-3xl font-bold text-foreground">Facebook Form Fields Mapping</h2>

            <div className="mt-6">
                <label htmlFor="select-page" className="text-sm font-medium text-foreground">
                    Select Page
                </label>
                <div className="relative mt-2">
                    <button
                        id="select-page"
                        className="flex w-full max-w-sm items-center justify-between rounded-md border bg-card px-3 py-2 text-left text-sm text-muted-foreground"
                    >
                        <span>Please Select</span>
                        <ChevronDownIcon />
                    </button>
                </div>
            </div>

            <div className="mt-6 rounded-lg border bg-card">
                <div className="grid grid-cols-4 items-center gap-4 px-4 py-3 text-sm font-semibold text-muted-foreground">
                    <span>Page Name</span>
                    <span>Form Name</span>
                    <span>Map Fields</span>
                    <span>Status</span>
                </div>
                <div className="text-center py-16 border-t">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                        <WarningIcon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">Forms Not Available</h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                        You currently don't have any lead generation forms created on your Facebook Page. Visit your Facebook Page &
                        create one to get started.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Componente reutilizable para el estado "Account Not Connected" ---
const AccountNotConnected = ({ platformName }: AccountNotConnectedProps) => (
  <div className="mt-8 flex flex-col items-center justify-center rounded-lg bg-muted/30 py-24 text-center">
    <WarningIcon />
    <h3 className="mt-4 text-xl font-semibold text-foreground">Account Not Connected</h3>
    <p className="mt-2 text-base text-muted-foreground">
      Your account is not connected with {platformName} ad account.
      <br />
      Complete integration to view forms & map fields.
    </p>
  </div>
);

// --- Componente principal de la página ---
export default function IntegrationsPage() {
    const [activeTab, setActiveTab] = useState('Integrations');
    const tabs = ['Integrations', 'Facebook Form Fields Mapping', 'TikTok Form Fields Mapping', 'LinkedIn Form Fields Mapping'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Integrations':
                return (
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* Google Calendar Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
                                alt="Google Calendar"
                                className="h-16 w-16 mx-auto"
                            />
                            <h3 className="mt-4 font-semibold text-foreground">Google Calendar</h3>
                            <p className="mt-2 text-sm text-muted-foreground flex-grow">
                                Google Calendar setup has moved! Connect it from{' '}
                                <a href="#" className="text-primary hover:underline">
                                    My Profile
                                </a>{' '}
                                or{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Calendar Settings &gt; Connections
                                </a>{' '}
                                to start syncing your events.
                            </p>
                            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                Take me there
                            </button>
                        </IntegrationCard>

                        {/* Google Account Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google"
                                className="h-16 w-16 mx-auto"
                            />
                            <div className="flex-grow flex flex-col justify-center items-center my-4">
                                <p className="text-sm text-muted-foreground">Connect your location's Google Account</p>
                                <button className="mt-4 inline-flex items-center gap-3 rounded-md border bg-card px-6 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                        alt="Google G"
                                        className="h-5 w-5"
                                    />
                                    Sign in with Google
                                </button>
                            </div>
                        </IntegrationCard>

                        {/* Facebook & Instagram Card */}
                        <IntegrationCard>
                            <div className="flex items-center justify-center gap-2">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                                    alt="Facebook"
                                    className="h-12 w-12"
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                                    alt="Instagram"
                                    className="h-14 w-14"
                                />
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground flex-grow">
                                Auto-sync ad leads, manage DMs, and respond to reviews and comments across all your Facebook Pages and Instagram handles.
                                <br />
                                <br />
                                Connect your location's Facebook Account
                            </p>
                            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                Connect
                            </button>
                            <p className="mt-3 text-xs text-muted-foreground">
                                We currently support integration with single facebook account and multiple pages. To use Instagram DMs, you need to connect your Instagram
                                Account with a Facebook Page. We recommend going through setup guide before connecting.{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Setup Guide
                                </a>
                            </p>
                        </IntegrationCard>

                        {/* QuickBooks Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Intuit_QuickBooks_logo.svg"
                                alt="QuickBooks"
                                className="h-12 w-auto mx-auto"
                            />
                            <div className="flex-grow flex flex-col justify-center items-center my-4">
                                <p className="mt-4 text-sm text-muted-foreground">Connect your QuickBooks Account</p>
                                <button className="mt-4 inline-flex items-center gap-3 rounded-md bg-[#2CA01C] px-12 py-3 text-lg font-bold text-white shadow-sm hover:bg-[#258517]">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Intuit_QuickBooks_logo.svg"
                                        alt="QuickBooks small"
                                        className="h-8 w-8 filter brightness-0 invert"
                                    />
                                    Connect
                                </button>
                            </div>
                        </IntegrationCard>

                        {/* Xero Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/52/Xero_software_logo.svg"
                                alt="Xero"
                                className="h-16 w-16 mx-auto"
                            />
                            <p className="mt-4 text-sm text-muted-foreground flex-grow">Connect your location's Xero Account</p>
                            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                Manage
                            </button>
                        </IntegrationCard>

                        {/* Wave Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Wave_Financial_logo.svg"
                                alt="Wave"
                                className="h-16 w-auto mx-auto"
                            />
                            <p className="mt-4 text-sm text-muted-foreground flex-grow">Connect your location's Wave Account</p>
                            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                Manage
                            </button>
                        </IntegrationCard>

                        {/* Clio Card */}
                        <IntegrationCard>
                            <img
                                src="https://images.getapp.com/images/application_logos/fit_200_200/clio.png"
                                alt="Clio"
                                className="h-16 w-16 mx-auto"
                            />
                            <p className="mt-4 text-sm text-muted-foreground flex-grow">Connect your location's Clio Account</p>
                            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
                                Connect
                            </button>
                        </IntegrationCard>

                        {/* Stripe Card */}
                        <IntegrationCard>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                                alt="Stripe"
                                className="h-16 w-auto mx-auto"
                            />
                            <div className="flex-grow my-4">
                                <p className="text-sm text-muted-foreground">Connect your location's Stripe Account</p>
                                <p className="mt-2 text-xs text-muted-foreground">Manage Stripe integration on Payments → Integrations</p>
                            </div>
                            <button className="mt-4 w-full rounded-md bg-[#6772E5] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5460CD]">
                                Continue
                            </button>
                        </IntegrationCard>
                    </div>
                );

            case 'Facebook Form Fields Mapping':
                return <FacebookFormMappingTab />;

            case 'TikTok Form Fields Mapping':
                return <AccountNotConnected platformName="TikTok" />;

            case 'LinkedIn Form Fields Mapping':
                return <AccountNotConnected platformName="LinkedIn" />;

            default:
                return null;
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Título principal */}
            <h1 className="text-3xl font-bold text-foreground">Integrations</h1>

            {/* Tab Navigation */}
            <div className="mt-6 border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <main>{renderContent()}</main>
        </div>
    );
}
