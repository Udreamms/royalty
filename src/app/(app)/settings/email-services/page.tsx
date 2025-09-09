"use client";

import React, { useState, useEffect } from "react";

// --- Componentes de Íconos ---
const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const LeadConnectorIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="url(#grad_lc)" />
    <path
      d="M20 27.5C24.1421 27.5 27.5 24.1421 27.5 20C27.5 15.8579 24.1421 12.5 20 12.5C15.8579 12.5 12.5 15.8579 12.5 20C12.5 24.1421 15.8579 27.5 20 27.5Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 12.5C18.6868 12.5 17.4264 12.8973 16.3637 13.6165C15.301 14.3357 14.4886 15.3415 14 16.5M13.5 24C14.0114 25.1585 14.801 26.1643 15.8637 26.8835C16.9264 27.6027 18.1868 28 19.5 28M27 16C26.4886 14.8415 25.699 13.8357 24.6363 13.1165C23.5736 12.3973 22.3132 12 21 12M26.5 24.5C25.7933 25.9221 24.6083 27.0565 23.1363 27.731C21.6644 28.4055 20.0003 28.5684 18.4 28.2"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <radialGradient id="grad_lc" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(20)">
        <stop stopColor="#222956" />
        <stop offset="1" stopColor="#3A458E" />
      </radialGradient>
    </defs>
  </svg>
);

const CheckmarkIcon = () => (
  <svg
    className="absolute top-2 right-2 w-5 h-5 text-white bg-primary rounded-full p-0.5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
);

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-destructive flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const IpNotFoundIcon = () => (
  <div className="bg-primary/10 p-3 rounded-full inline-flex">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.48"></path>
      <path d="M22 2 2 22"></path>
      <path d="M15.69 14.15a2.5 2.5 0 0 0-2.32-3.32"></path>
      <path d="M12 12H9.5a2.5 2.5 0 0 0-2.5 2.5V17"></path>
      <path d="M12 12V9.5a2.5 2.5 0 0 1 2.5-2.5V7"></path>
    </svg>
  </div>
);

// --- Componente para el contenido de la pestaña SMTP ---
const SmtpServiceView = () => (
  <div className="mt-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-foreground">SMTP Service</h2>
        <p className="text-sm text-muted-foreground">You can use your own SMTP services or use the default service</p>
      </div>
      <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors">
        <AddIcon />
        Add Service
      </button>
    </div>

    <div className="mt-6 bg-card border border-border rounded-lg p-6">
      <div className="flex justify-between items-center pb-6 border-b border-border">
        <h3 className="font-semibold text-lg text-foreground">Select Default Provider</h3>
        <button className="border border-border px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted">
          <GlobeIcon />
          Dedicated Domain
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Columna Izquierda */}
        <div className="relative border-2 border-primary bg-primary/5 p-4 rounded-lg">
          <CheckmarkIcon />
          <div className="flex items-center gap-4">
            <LeadConnectorIcon />
            <div>
              <p className="font-semibold text-foreground">LeadConnector Email System</p>
              <p className="text-sm text-muted-foreground">mg.msgsndr.net</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="text-sm font-medium text-primary hover:underline">
              View Configuration
            </button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col items-center text-center">
          <LeadConnectorIcon className="w-20 h-20" />
          <p className="mt-4 font-semibold text-lg text-foreground">LeadConnector Email System</p>

          <div className="mt-6 w-full bg-destructive/10 border border-destructive/50 rounded-lg p-4 text-left">
            <div className="flex items-start gap-3">
              <WarningIcon />
              <div>
                <p className="text-sm text-destructive font-medium">
                  Not having a dedicated sending domain can lead to several issues when it comes to email communication. Here are some of the potential problems you may face:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-destructive">
                  <li>
                    <span className="font-semibold">Deliverability Problems:</span> Messages may be caught in spam filters or rejected by recipients due
                  </li>
                </ul>
                <button className="text-sm text-destructive font-semibold hover:underline mt-3">
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Componente para el contenido de Reply & Forward Settings ---
const ReplyForwardSettings = () => (
  <div className="mt-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="pb-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Forwarding Address</h2>
        <p className="text-sm text-muted-foreground">You will receive the email replies not only in the Conversation view, but also in your personal email inbox.</p>
        <p className="text-sm text-muted-foreground">Note: Forwarding Addresses cannot use the same domain as your Sending Domain in order to prevent infinite loops. I.e. if your sending domain is yourdomain.com, you cannot add a forwarding address for forwarding@yourdomain.com</p>
      </div>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Forwarding address (Press 'Enter' after each address)</label>
          <input type="text" className="border border-border p-2 rounded-md bg-background text-foreground" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-foreground">BCC Emails (Press 'Enter' after each address)</label>
          <input type="text" className="border border-border p-2 rounded-md bg-background text-foreground" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" id="forwardToAssignedUser" className="h-4 w-4 text-primary focus:ring-primary bg-background" />
          <label htmlFor="forwardToAssignedUser" className="text-sm text-foreground">Forward to assigned user</label>
        </div>
        <button className="mt-6 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Save
        </button>
      </div>
    </div>
    <div className="mt-6 bg-card border border-border rounded-lg p-6">
      <div className="pb-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Reply Address</h2>
        <p className="text-sm text-muted-foreground">reply-to address will be added to all the emails</p>
        <p className="text-sm text-muted-foreground">Note: Reply conversations cannot be tracked and will not come to conversation thread.</p>
      </div>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Reply address (Press 'Enter' after each address)</label>
          <input type="text" className="border border-border p-2 rounded-md bg-background text-foreground" />
        </div>
        <button className="mt-6 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Save
        </button>
      </div>
    </div>
  </div>
);

// --- Componente para el contenido de Email Analytics ---
const EmailAnalytics = () => (
  <div className="mt-6">
    <div className="flex justify-between items-center pb-6 border-b border-border">
      <h2 className="text-xl font-semibold text-foreground">Email Metrics</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input type="date" defaultValue="2025-09-01" className="border border-border p-2 rounded-md bg-background text-foreground" />
          <span className="text-sm text-foreground">→</span>
          <input type="date" defaultValue="2025-09-07" className="border border-border p-2 rounded-md bg-background text-foreground" />
        </div>
        <select className="border border-border p-2 rounded-md bg-background text-foreground">
          <option>Filters</option>
        </select>
      </div>
    </div>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-success mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16L7 12L8.4 10.6L11 13.2L15.6 8.6L17 10L11 16Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Sent</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-success mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16L7 12L8.4 10.6L11 13.2L15.6 8.6L17 10L11 16Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Delivered</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-success mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.8L12 13.4L4.4 8.8V8.8L12 3.2L19.6 8.8V8.8Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Opened</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-success mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 9H13V7H11V9ZM11 11H13V13H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 17H13V15H11V17Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Clicked</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-destructive mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Complained</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-warning mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Bounced</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-warning mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Unsubscribed</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-destructive mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM11 7H13V13H11V7Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Failed</p>
        <p className="text-2xl font-semibold text-foreground">0</p>
        <p className="text-sm text-muted-foreground">0%</p>
      </div>
    </div>
  </div>
);

// --- Componente para el contenido de Risk Assessment ---
const RiskAssessment = () => (
  <div className="mt-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex justify-between items-center pb-6 border-b border-border">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Risk Assessment <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info text-info-foreground">0 records</span></h2>
          <p className="text-sm text-muted-foreground">Keep track of your email verification</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" defaultValue="2025-09-01" className="border border-border p-2 rounded-md bg-background text-foreground" />
          <span className="text-sm text-foreground">→</span>
          <input type="date" defaultValue="2025-09-08" className="border border-border p-2 rounded-md bg-background text-foreground" />
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-sm font-medium text-foreground">Import Name</th>
              <th className="py-3 px-4 text-sm font-medium text-foreground">Created at</th>
              <th className="py-3 px-4 text-sm font-medium text-foreground">No. of Emails</th>
              <th className="py-3 px-4 text-sm font-medium text-foreground">Deliverable (%)</th>
              <th className="py-3 px-4 text-sm font-medium text-foreground">Undeliverable (%)</th>
              <th className="py-3 px-4 text-sm font-medium text-foreground">Unknown (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td colSpan={6} className="py-10 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V13H13V7ZM13 15H11V17H13V15Z" fill="currentColor"/>
                  </svg>
                  <p>No Data</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Componente para el contenido de Bounce Classification ---
const BounceClassification = () => (
  <div className="mt-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex justify-between items-center pb-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Email Bounces</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input type="date" defaultValue="2025-09-06" className="border border-border p-2 rounded-md bg-background text-foreground" />
            <span className="text-sm text-foreground">→</span>
            <input type="date" defaultValue="2025-09-08" className="border border-border p-2 rounded-md bg-background text-foreground" />
          </div>
          <select className="border border-border p-2 rounded-md bg-background text-foreground">
            <option>Filters</option>
          </select>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Permanent Bounce <span className="text-muted">ⓘ</span></p>
          <p className="text-2xl font-semibold text-foreground">0</p>
          <p className="text-sm text-muted-foreground">0%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Permanent Bounce Rate</p>
          <p className="text-2xl font-semibold text-foreground">0%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">ESP/ISP Block <span className="text-muted">ⓘ</span></p>
          <p className="text-2xl font-semibold text-foreground">0</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Delivered <span className="text-muted">ⓘ</span></p>
          <p className="text-2xl font-semibold text-foreground">0</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center col-span-2 lg:col-span-4">
          <p className="text-sm text-muted-foreground">Delivery Rate</p>
          <p className="text-2xl font-semibold text-foreground">0%</p>
        </div>
      </div>
      <div className="mt-6 bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center pb-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Bounce Classification Overview</h3>
          <button className="text-primary font-medium hover:underline">Troubleshoot Email Bounces</button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-sm font-medium text-foreground">Email Service Provider</th>
                <th className="py-3 px-4 text-sm font-medium text-foreground">Category</th>
                <th className="py-3 px-4 text-sm font-medium text-foreground">Error Code</th>
                <th className="py-3 px-4 text-sm font-medium text-foreground">Status Code</th>
                <th className="py-3 px-4 text-sm font-medium text-foreground">Definition</th>
                <th className="py-3 px-4 text-sm font-medium text-foreground">Count (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td colSpan={6} className="py-10 text-center text-muted-foreground">
                  No error bounces were found for the selected date and filters.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// --- Componente para el contenido de Postmaster Tools ---
const PostmasterTools = () => {
  const [activeTool, setActiveTool] = useState("google");

  const getButtonClasses = (tool: "google" | "microsoft") => {
    return `w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      activeTool === tool
        ? "bg-primary/10 text-primary border-l-2 border-primary"
        : "hover:bg-muted/50 text-muted-foreground"
    }`;
  };

  return (
    <div className="mt-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground pb-6 border-b border-border">Postmaster Tools</h2>
        <div className="mt-6 flex flex-col md:flex-row gap-8">
          {/* Navegación Izquierda */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <nav className="flex flex-col space-y-1">
              <button onClick={() => setActiveTool("google")} className={getButtonClasses("google")}>
                Google
              </button>
              <button onClick={() => setActiveTool("microsoft")} className={getButtonClasses("microsoft")}>
                Microsoft SNDS
              </button>
            </nav>
          </div>

          {/* Contenido Derecha */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {activeTool === "google" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground">Google Postmaster Tool</h3>
                <p className="text-sm text-muted-foreground mt-1">With Google Postmaster Tools, you can optimize email performance and ensure accurate delivery to Gmail inboxes.</p>
                <p className="text-sm text-muted-foreground mt-2">Connect your Google account that has access to the Google Postmaster data. For detailed steps, visit our <a href="#" className="text-primary hover:underline">support guide</a></p>
                <button className="mt-4 bg-muted text-muted-foreground font-medium px-4 py-2 rounded-md flex items-center gap-2 hover:bg-muted/80">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted">
                    <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16ZM9 7H11V9H13V11H11V13H9V11H7V9H9V7Z" fill="currentColor"/>
                  </svg>
                  Connect to Google Postmaster
                </button>
                <div className="mt-6 bg-warning/10 border border-warning/50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-warning flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                    </svg>
                    <div>
                      <p className="text-sm text-warning font-medium">No Dedicated Sending Domains Detected</p>
                      <p className="text-sm text-warning/80 mt-1">It looks like you don't have any dedicated sending domains set up yet, or your domain is currently unverified. Having a dedicated domain helps optimize email performance and ensures reliable delivery to inboxes.</p>
                      <button className="mt-2 text-primary font-medium hover:underline">Create Domain Now →</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTool === "microsoft" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground">Microsoft SNDS Tool</h3>
                <p className="text-sm text-muted-foreground mt-1">With Outlook Postmaster Tools, you can monitor and troubleshoot your emails effectively, ensuring they reach your recipient's inboxes without fail.</p>
                <div className="mt-8 flex items-center justify-center text-center p-8 min-h-[300px] border border-dashed border-border rounded-lg">
                  <div>
                    <IpNotFoundIcon />
                    <p className="mt-4 font-semibold text-foreground">IP not found in your account</p>
                    <p className="mt-1 text-sm text-muted-foreground max-w-md">You're on a shared IP, the option to access detailed data about individual IPs and manage feedback loop settings might not be available, as these features are typically offered for dedicated IP account.</p>
                    <button className="mt-4 text-sm font-medium text-primary hover:underline">
                      Know more
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal de la Página ---
export default function EmailServicesPage() {
  // Initialize theme from localStorage, default to "light" if not set
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Effect to toggle the 'dark' class
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const [activeTab, setActiveTab] = useState("smtp");
  const tabs = [
    { id: "smtp", label: "SMTP Service" },
    { id: "reply", label: "Reply & Forward Settings" },
    { id: "analytics", label: "Email Analytics" },
    { id: "risk", label: "Risk Assessment" },
    { id: "bounce", label: "Bounce Classification" },
    { id: "postmaster", label: "Postmaster Tools" },
  ];

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold text-foreground">Email Services</h1>

      {/* Navegación de Pestañas */}
      <div className="mt-6 border-b border-border">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las Pestañas */}
      <div>
        {activeTab === "smtp" && <SmtpServiceView />}
        {activeTab === "reply" && <ReplyForwardSettings />}
        {activeTab === "analytics" && <EmailAnalytics />}
        {activeTab === "risk" && <RiskAssessment />}
        {activeTab === "bounce" && <BounceClassification />}
        {activeTab === "postmaster" && <PostmasterTools />}
      </div>
    </div>
  );
}