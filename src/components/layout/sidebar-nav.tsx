"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    SidebarMenuButton, 
    SidebarCollapsible, 
    SidebarCollapsibleTrigger, 
    SidebarCollapsibleContent 
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const MaterialIcon = ({ name, className }: { name: string, className?: string }) => (
  <span className={cn("material-symbols-outlined", className)}>
    {name}
  </span>
);

interface NavItem {
  href: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: "/launchpad", label: "Launchpad", icon: "rocket_launch" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/conversations", label: "Conversations", icon: "chat_bubble" },
  { href: "/calendars", label: "Calendars", icon: "calendar_month" },
  { href: "/contacts", label: "Contacts", icon: "contacts" },
  { href: "/opportunities", label: "Opportunities", icon: "monitoring" },
  { href: "/payments", label: "Payments", icon: "payments" },
];

const secondaryNavItems: NavItem[] = [
    { href: "/ai-agents", label: "AI Agents", icon: "auto_awesome" },
    { href: "/marketing", label: "Marketing", icon: "campaign" },
    { href: "/automation", label: "Automation", icon: "settings_suggest" },
    { href: "/sites", label: "Sites", icon: "language" },
    { href: "/memberships", label: "Memberships", icon: "card_membership" },
    { href: "/media-storage", label: "Media Storage", icon: "perm_media" },
    { href: "/reputation", label: "Reputation", icon: "star" },
    { href: "/reporting", label: "Reporting", icon: "show_chart" },
    { href: "/app-marketplace", label: "App Marketplace", icon: "apps" },
];

const settingsNavLinks = [
    { href: '/settings/business-profile', label: 'Business Profile' },
    { href: '/settings/billing', label: 'Billing' },
    { href: '/settings/my-staff', label: 'My Staff' },
    { href: '/settings/opportunities-pipelines', label: 'Opportunities & Pipelines' },
    { href: '/settings/automation', label: 'Automation' },
    { href: '/settings/calendars', label: 'Calendars' },
    { href: '/settings/conversation-ai', label: 'Conversation AI' },
    { href: '/settings/knowledge-base', label: 'Knowledge Base' },
    { href: '/settings/voice-ai-agents', label: 'Voice AI Agents' },
    { href: '/settings/email-services', label: 'Email Services' },
    { href: '/settings/phone-numbers', label: 'Phone Numbers' },
    { href: '/settings/whatsapp', label: 'WhatsApp' },
    { href: '/settings/objects', label: 'Objects' },
    { href: '/settings/custom-fields', label: 'Custom Fields' },
    { href: '/settings/custom-values', label: 'Custom Values' },
    { href: '/settings/manage-scoring', label: 'Manage Scoring' },
    { href: '/settings/domains-url-redirects', label: 'Domains & URL Redirects' },
    { href: '/settings/integrations', label: 'Integrations' },
    { href: '/settings/private-integrations', label: 'Private Integrations' },
    { href: '/settings/conversation-providers', label: 'Conversation Providers' },
    { href: '/settings/tags', label: 'Tags' },
    { href: '/settings/labs', label: 'Labs' },
    { href: '/settings/audit-logs', label: 'Audit Logs' },
    { href: '/settings/brand-boards', label: 'Brand Boards' },
];

export function SidebarNav() {
  const pathname = usePathname();
  const isSettingsActive = pathname.startsWith('/settings');
  const [isSettingsOpen, setIsSettingsOpen] = useState(isSettingsActive);

  useEffect(() => {
    setIsSettingsOpen(isSettingsActive);
  }, [isSettingsActive]);

  const renderNav = (items: NavItem[]) => {
    return items.map((item) => {
        const isActive = pathname === item.href || (item.href.length > 1 && pathname.startsWith(item.href));

        return (
            <Link href={item.disabled ? "#" : item.href} key={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild={false}
                  isActive={isActive}
                  aria-label={item.label}
                  disabled={item.disabled}
                  className="gap-2.5"
                >
                  <MaterialIcon name={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
            </Link>
        );
    });
  }

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-1">
        {renderNav(mainNavItems)}
        <Separator className="my-4" />
        {renderNav(secondaryNavItems)}
      </div>
      
      <div className="mt-auto space-y-1">
        <SidebarCollapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SidebarCollapsibleTrigger 
                isActive={isSettingsActive} 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
                <MaterialIcon name="settings" className="text-lg" />
                <span>Settings</span>
            </SidebarCollapsibleTrigger>
            <SidebarCollapsibleContent>
                <div className="max-h-64 overflow-y-auto no-scrollbar">
                {settingsNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                    <Link href={link.href} key={link.href} passHref legacyBehavior>
                        <SidebarMenuButton variant="secondary" isActive={isActive} className="h-8">
                        {link.label}
                        </SidebarMenuButton>
                    </Link>
                    );
                })}
                </div>
            </SidebarCollapsibleContent>
        </SidebarCollapsible>
      </div>
    </nav>
  );
}
