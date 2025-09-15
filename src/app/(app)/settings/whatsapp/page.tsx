import React from 'react';

// --- Iconos SVG utilizados en la página ---
const CheckIcon = ({ className = "h-5 w-5 text-green-500" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className}
  >
    <path 
      fillRule="evenodd" 
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
      clipRule="evenodd" 
    />
  </svg>
);

const WalletIcon = ({ className = "h-8 w-8 text-muted-foreground" }) => (
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
            d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m12 6h.008v.008H15v-.008z" 
        />
    </svg>
);

const BriefcaseIcon = ({ className = "h-5 w-5" }) => (
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
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" 
        />
    </svg>
);


export default function WhatsAppPage() {
  const features = [
    { text: "Reach customers instantly - Engage leads and customers on the world's most trusted messaging platform with 2+ billion active users." },
    { text: "Boost response rates - Real-time conversations help you convert more leads into paying customers." },
    { text: "Save time with automation - Use templates and automated replies to simplify interactions and reduce effort." },
    { text: "Secure and reliable - Backed by Meta's official APIs for unmatched delivery and data protection." },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* --- Encabezado --- */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Subscribe to WhatsApp Messaging</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Tap into a platform with over 2 billion users to connect, engage, and grow your business.
        </p>
        <p className="mt-2 text-sm font-semibold text-orange-600">
          Only Agency Admins will see this page
        </p>
      </div>

      {/* --- Contenido Principal (2 columnas) --- */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* --- Columna Izquierda: Tarjeta de Precios y Características --- */}
        <div className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-6 h-full flex flex-col">
                <h2 className="text-lg font-semibold text-foreground">Udreamms LLC</h2>
                <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$10</span>
                    <span className="text-lg text-muted-foreground">per month</span>
                </div>
                <p className="text-sm text-muted-foreground">1 month commitment</p>
                <hr className="my-6 border-border" />
                <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">FEATURES</h3>
                <ul className="mt-4 space-y-4 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* --- Columna Derecha: Tarjeta de Información --- */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 space-y-6">
            <div className="flex items-start gap-4">
                <WalletIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                <div>
                    <p className="font-semibold text-foreground">$10/month fee will be charged to your account</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        By selecting this option, you agree to enable WhatsApp for this client without reselling, and you acknowledge that a $10/month fee charged to your account.
                    </p>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                Additionally, any extra WhatsApp message usage will not incur charges for the client's location. WhatsApp Messaging charges will be billed to the agency wallet.
            </p>
          </div>
        </div>
      </div>

      {/* --- Botones de Acción --- */}
      <div className="mt-8 flex justify-end items-center gap-4">
        <button
            type="button"
            className="rounded-md border bg-transparent px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
        >
            Learn more
        </button>
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
            <BriefcaseIcon />
            Agency Purchase
        </button>
      </div>
    </div>
  );
}