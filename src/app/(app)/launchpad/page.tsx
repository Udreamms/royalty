"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Rocket,
  CheckSquare,
  Gift,
  Unlock,
  Compass,
  Megaphone,
  DollarSign,
  Globe,
  ShoppingCart,
  ChevronRight,
  BookOpen,
  CreditCard,
  Link as LinkIcon,
  FileText,
  PlayCircle,
  ChevronDown,
  Calendar,
  MessageSquare,
  MessagesSquare,
  SquarePen,
  Link,
  MessageCircle,
  UserPlus,
  Users,
  Filter,
  Phone,
  Mail,
  Clock,
  CalendarDays,
  Columns,
  CheckCircle2
} from 'lucide-react';

// --- TIPOS Y DATOS ---
type PageName = 'foundational' | 'marketing' | 'sales' | 'website' | 'ecommerce';

// --- COMPONENTES AUXILIARES ---

const NavItem = ({ icon: Icon, label, active = false, onClick }: { icon: React.ElementType, label: string, active?: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-left
      ${active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted"
      }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);

const RewardItem = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

// --- Reemplaza el TaskItem existente con este ---
const TaskItem = ({ icon: Icon, title, description, progress = 0 }: { icon: React.ElementType, title: string, description: string, progress?: number }) => {
  const getProgressIndicator = () => {
    if (progress === 100) {
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    }
    if (progress > 0) {
      return (
        <div className="relative h-6 w-6">
          <svg className="h-full w-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#E5E7EB" strokeWidth="2"/>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 62.83} 62.83`}
              transform="rotate(-90 12 12)"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }
    return <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>;
  };

  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        {getProgressIndicator()}
        {progress === 100 ? (
           <span className="text-sm font-bold text-green-500">{progress}%</span>
        ) : (
           <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

const ExpandableTaskItem = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card transition-all">
      <div 
        className="flex cursor-pointer items-center gap-4 p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">0%</span>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-border p-4 pl-16">
          {children}
        </div>
      )}
    </div>
  );
};

// --- PANELES DE CONTENIDO ESPECÍFICO ---

const EcommerceContent = () => {
  const ecommerceTasks = [
    { icon: Rocket, title: 'Launch Your First Product and Start Selling', description: 'Set up and publish your product...' },
    { icon: BookOpen, title: 'Launch Your First Online Course and Start Earning', description: 'Set up and launch an online course...' },
    { icon: CreditCard, title: 'Start Collecting Payments with Stripe', description: 'Connect your Stripe account...' },
    { icon: LinkIcon, title: 'Accept Payments Easily with a Custom Payment Link', description: 'Create a payment link and send it...' },
    { icon: FileText, title: 'Generate and Send Professional Invoices', description: 'Manage your sales and billing...' },
  ];

  return (
    <div className="space-y-4">
      {ecommerceTasks.map((task, index) => (
        <TaskItem
          key={index}
          icon={task.icon}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
};

const WebsiteContent = () => {
  return (
    <div className="space-y-4">
      <ExpandableTaskItem
        icon={Globe}
        title="Launch a Professional Website in Less Than a Day"
        description="Create and publish a custom website using ready-made templates. Build your online presence quickly and easily."
      >
        <div>
          <h4 className="font-semibold text-sm mb-2">Watch the Tutorial</h4>
          <div className="relative w-48 h-28 rounded-lg overflow-hidden cursor-pointer group">
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400&h=280&fit=crop)',
                backgroundSize: 'cover'
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <h5 className="text-white font-bold text-sm">Launch a Website</h5>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <PlayCircle className="h-10 w-10 text-white/80 transform transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </ExpandableTaskItem>
    </div>
  );
};

const SalesContent = () => {
  const salesTasks = [
    { icon: Calendar, title: 'Seamlessly Manage Your Sales Conversations', description: 'Sync your Gmail or Outlook inbox...' },
    { icon: MessageSquare, title: 'Engage Website Visitors in Real Time with Live Chat', description: 'Add live chat to your website...' },
    { icon: MessagesSquare, title: 'Streamline Facebook & Instagram Conversations for Faster Response', description: 'Connect Facebook and Instagram Messenger...' },
  ];

  return (
    <div className="space-y-4">
      {salesTasks.map((task, index) => (
        <TaskItem
          key={index}
          icon={task.icon}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
};

const MarketingContent = () => {
  const marketingTasks = [
    { icon: SquarePen, title: 'Manage All Your Social Media Posts in One Place', description: 'Set up the social planner to schedule...' },
    { icon: Link, title: 'Capture New Leads with Facebook & Instagram Lead Ads', description: 'Connect your Facebook and Instagram...' },
    { icon: MessageCircle, title: 'Reach Customers with Your First SMS Campaign', description: 'Design and launch an SMS campaign...' },
  ];

  return (
    <div className="space-y-4">
      {marketingTasks.map((task, index) => (
        <TaskItem
          key={index}
          icon={task.icon}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
};

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
    <p className="text-muted-foreground">Contenido para <span className="font-semibold text-foreground">{title}</span></p>
  </div>
);

// --- NUEVO: Contenido específico para FOUNDATIONAL SETUP ---
const FoundationalSetupContent = () => {
  const foundationalTasks = [
    { icon: UserPlus, title: 'Create a New Contact', description: 'Add your first contact effortlessly and begin building meaningful engagement right away.', progress: 100 },
    { icon: Users, title: 'Import and engage with all your contacts instantly', description: 'Import your existing contacts from various platforms and start engaging with them immediately.', progress: 0 },
    { icon: Filter, title: 'Generate New Leads with a High-Converting Funnel', description: 'Set up a high-converting funnel and form to capture leads efficiently. Optimize your lead generation and grow your customer base.', progress: 0 },
    { icon: Phone, title: 'Set Up Multi-Channel Communication & Start Engaging in Minutes', description: 'Connect your email, SMS, and phone services in minutes and start multi-channel communication.', progress: 0 },
    { icon: Mail, title: 'Launch Your First Campaign to Drive Engagement', description: 'Design and send your first email campaign to engage over 1,000 contacts.', progress: 50 },
    { icon: Clock, title: 'Nurture Leads with Automated Drip Campaigns', description: 'Set up automated email and SMS drip campaigns to nurture 100+ leads over time.', progress: 65 },
    { icon: CalendarDays, title: 'Book More Appointments with Automated Scheduling', description: 'Set up your calendar for automatic appointment bookings. Secure 20 appointments in the first week.', progress: 0 },
    { icon: Columns, title: 'Accelerate Deal Closures with a Streamlined Sales Pipeline', description: 'Organize your sales pipeline to track every lead’s progress. Automate follow-ups and close deals faster.', progress: 0 },
  ];

  return (
    <div className="space-y-4">
      {foundationalTasks.map((task, index) => (
        <TaskItem
          key={index}
          icon={task.icon}
          title={task.title}
          description={task.description}
          progress={task.progress}
        />
      ))}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function LaunchpadPage() {
  const userName = "Udreamms";
  const [activePage, setActivePage] = useState<PageName>('foundational'); 

  const renderContent = () => {
    switch (activePage) {
      case 'ecommerce':
        return <EcommerceContent />;
      case 'website':
        return <WebsiteContent />;
      case 'sales':
        return <SalesContent />;
      case 'marketing':
        return <MarketingContent />;
      case 'foundational':
        return <FoundationalSetupContent />;
      default:
        return <FoundationalSetupContent />;
    }
  };

  const getProgressTitle = () => {
      switch (activePage) {
          case 'ecommerce': return 'Your Ecommerce Progress';
          case 'website': return 'Your Website & Monetisation Progress';
          case 'sales': return 'Your Sales & Conversations Progress';
          case 'marketing': return 'Your Marketing & Lead Generation Progress';
          case 'foundational': return 'Your Foundational Setup Progress';
          default: return 'Your Progress';
      }
  }

  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-foreground">
        Hey {userName}, here's your personalized setup list with everything you need to get started.
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Barra Lateral */}
        <aside className="w-full lg:w-80 flex flex-col">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <nav className="flex-1 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Setup Guide</h2>
              <ul className="space-y-1">
                <li><NavItem icon={Compass} label="Foundational Setup" onClick={() => setActivePage('foundational')} active={activePage === 'foundational'} /></li>
                <li><NavItem icon={Megaphone} label="Marketing & Lead Generation" onClick={() => setActivePage('marketing')} active={activePage === 'marketing'} /></li>
                <li><NavItem icon={DollarSign} label="Sales & Conversations" onClick={() => setActivePage('sales')} active={activePage === 'sales'} /></li>
                <li><NavItem icon={Globe} label="Website & Monetisation" onClick={() => setActivePage('website')} active={activePage === 'website'} /></li>
                <li><NavItem icon={ShoppingCart} label="Ecommerce" onClick={() => setActivePage('ecommerce')} active={activePage === 'ecommerce'} /></li>
              </ul>
            </nav>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Fast Track Your Rewards</h2>
              <div className="mt-4 space-y-3">
                <RewardItem icon={Gift} title="Claim Your $15..." description="Join a quick onboarding call..." />
                <RewardItem icon={CheckSquare} title="Grab $25..." description="Complete any task to unlock..." />
                <RewardItem icon={Unlock} title="Unlock $50..." description="Activate your subscription..." />
              </div>
              <div className="relative bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
                <p className="text-xs text-muted-foreground">Your wallet is feeling empty...</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1">
          <Card className="mb-8 bg-card border border-border shadow-sm rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{getProgressTitle()}</p>
                <p className="text-sm font-medium text-muted-foreground">0%</p>
              </div>
              <Progress value={0} className="mt-2 h-2" />
            </CardContent>
          </Card>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
}