import React from 'react';

// --- Iconos SVG utilizados en la página ---

const OpportunitiesIcon = ({ className = "h-6 w-6 text-primary" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.923-2.923L12 17.25l1.178-.398a3.375 3.375 0 002.923-2.923L16.5 12.75l.398 1.178a3.375 3.375 0 002.923 2.923L21 17.25l-1.178.398a3.375 3.375 0 00-2.923 2.923z" />
  </svg>
);

const ContactsIcon = ({ className = "h-6 w-6 text-primary" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
  </svg>
);

const CompaniesIcon = ({ className = "h-6 w-6 text-primary" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-2.25a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25V21m-8.25 0v-2.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V21" />
  </svg>
);

const MoreHorizontalIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

const RocketIcon = ({ className = "h-7 w-7 text-primary" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 017.38-5.84m-2.56 5.84l-7.38 7.38m0 0a6 6 0 01-9.9-3.42m3.42 9.9l7.38-7.38m-7.38 7.38l-3.42 9.9m8.25-11.84a6 6 0 00-7.38-5.84m5.84 2.56l7.38 7.38m0 0a6 6 0 003.42-9.9m-3.42 9.9l-7.38-7.38m7.38-7.38l-9.9 3.42m9.9-3.42l-3.42-9.9" />
  </svg>
);

const InfoIcon = ({ className = "h-4 w-4 text-yellow-600" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);


// --- Componente reutilizable para las tarjetas de objetos ---
const ObjectCard = ({ icon, title, description }) => (
  <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <button className="text-muted-foreground hover:text-foreground">
        <MoreHorizontalIcon />
      </button>
    </div>
  </div>
);

export default function ObjectsPage() {
  const standardObjects = [
    {
      title: "Opportunities",
      description: "Contains list of all deals, their stages, statuses and pipeline progress.",
      icon: <OpportunitiesIcon />,
    },
    {
      title: "Contacts",
      description: "Contains list of all leads, their details, and specifications.",
      icon: <ContactsIcon />,
    },
    {
      title: "Companies",
      description: "Contains list of all businesses, their details, and contact information.",
      icon: <CompaniesIcon />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* --- Encabezado --- */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Objects</h1>
        <p className="mt-1 text-muted-foreground">Manage and Access All Standard Objects</p>
      </div>

      {/* --- Sección de Objetos Estándar --- */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">Standard Objects</h2>
        <p className="mt-1 text-sm text-muted-foreground">Select a standard object to add and edit associations</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {standardObjects.map((obj) => (
            <ObjectCard 
              key={obj.title}
              title={obj.title}
              description={obj.description}
              icon={obj.icon}
            />
          ))}
        </div>
      </div>

      {/* --- Banner de Actualización --- */}
      <div className="mt-12 rounded-xl border bg-muted/40 p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex-shrink-0">
            <RocketIcon />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-foreground">Upgrade Your Plan to Unlock Custom Objects</h3>
            <p className="mt-1 text-muted-foreground">
              Customize your platform and organize data your way. 
              <a href="#" className="ml-1 font-semibold text-primary hover:underline">
                Upgrade Now →
              </a>
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-yellow-500/10 p-2 text-xs text-yellow-700">
                <InfoIcon />
                <span>This banner is only visible to Agency Admins.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}