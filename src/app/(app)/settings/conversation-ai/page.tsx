import React from "react";

export default function ConversationAiPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#f6fafd]">
      <div className="flex flex-col items-center max-w-xl w-full px-4 py-10 rounded-lg">
        <div className="flex items-center gap-12 mb-6">
          {/* Conversation AI Icon */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <svg width={48} height={48} fill="none" viewBox="0 0 48 48">
                <rect width="48" height="48" rx="24" fill="#e0e7ff" />
                <path d="M16 18h16v2H16v-2zm0 6h10v2H16v-2zm0 6h8v2h-8v-2z" fill="#2563eb" />
                <rect x="20" y="26" width="8" height="2" fill="#2563eb" />
                <rect x="20" y="32" width="6" height="2" fill="#2563eb" />
              </svg>
            </div>
            <span className="text-gray-500 font-medium text-sm">Conversation AI</span>
          </div>
          {/* Arrow */}
          <svg width={48} height={24} fill="none" viewBox="0 0 48 24">
            <path d="M4 12h40m0 0l-6-6m6 6l-6 6" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* AI Agents Icon */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <svg width={48} height={48} fill="none" viewBox="0 0 48 48">
                <rect width="48" height="48" rx="24" fill="#e0e7ff" />
                <g>
                  <circle cx="24" cy="24" r="10" stroke="#2563eb" strokeWidth="2" fill="#e0e7ff" />
                  <rect x="18" y="28" width="12" height="2" rx="1" fill="#2563eb" />
                  <circle cx="20.5" cy="23.5" r="1.5" fill="#2563eb" />
                  <circle cx="27.5" cy="23.5" r="1.5" fill="#2563eb" />
                  <path d="M21 27c1.5 1 4.5 1 6 0" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="22" y="18" width="4" height="2" rx="1" fill="#2563eb" />
                </g>
              </svg>
            </div>
            <span className="text-gray-500 font-medium text-sm">AI Agents</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          La IA de conversación se ha trasladado a los agentes de IA
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-lg">
          La IA de Conversación ahora se encuentra en <b>la sección "Agentes de IA"</b> del menú <b>de subcuentas</b>, lo que te da acceso a todos los agentes de IA en un solo lugar. Ten la seguridad de que todos tus bots se mantendrán intactos.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-base"
        >
          Ir a Agentes de IA <span className="text-xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
}
