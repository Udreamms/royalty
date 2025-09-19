"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Nuevo componente para el contenido de Social Planner
const SocialPlannerContent = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">Keep your social planned in one place</h1>
      <p className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
        Crea y gestiona tus sitios web, embudos y formularios.
      </p>

      {/* --- Contenido de la imagen original --- */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Mantén tu presencia social planificada en un solo lugar
          </h2>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-blue-600 dark:text-blue-400">Marketing</a>
            <a href="#" className="text-blue-600 dark:text-blue-400">Social Planner</a>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 text-gray-600 dark:text-gray-400">
          Mantén tu presencia social activa publicando posts en múltiples redes sociales a la vez.
        </p>

        <p className="mb-4 text-gray-900 dark:text-gray-300">
          Te recomendamos conectar 2 cuentas sociales para empezar:
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          {/* Botón Facebook */}
          <button className="flex items-center space-x-2 p-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.65 9.18 8.441 9.873V15.908h-2.923v-2.784h2.923v-2.12c0-2.887 1.76-4.475 4.348-4.475 1.24 0 2.298.092 2.61.134v2.793h-1.658c-1.306 0-1.56.621-1.56 1.534v2.012h3.11l-.504 2.784h-2.606v6.085C18.35 21.18 22 17.016 22 12c0-5.523-4.477-10-10-10z"></path></svg>
            </span>
            <span className="text-gray-900 dark:text-gray-200">Facebook</span>
          </button>
          {/* Botón Instagram */}
          <button className="flex items-center space-x-2 p-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.656 1.493 4.804 4.804.058 1.265.07 1.644.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.493 4.656-4.804 4.804-.058 0-.116.002-.175.002-1.265.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.656-1.493-4.804-4.804-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.493-4.656 4.804-4.804.058 0 .116-.002.175-.002zM12 4.604c-4.417 0-7.996 3.58-7.996 7.996s3.579 7.996 7.996 7.996c4.417 0 7.996-3.58 7.996-7.996s-3.579-7.996-7.996-7.996zM12 6.572c2.997 0 5.428 2.431 5.428 5.428s-2.431 5.428-5.428 5.428c-2.997 0-5.428-2.431-5.428-5.428s2.431-5.428 5.428-5.428zm6.5-5.32c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"></path></svg>
            </span>
            <span className="text-gray-900 dark:text-gray-200">Instagram</span>
          </button>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded mb-8">
          <p className="font-semibold text-blue-800 dark:text-blue-200">Ahorra tiempo programando posts</p>
          <p className="text-blue-700 dark:text-blue-300">
            Mantén tus canales sociales activos programando posts.
            <a href="#" className="text-blue-600 dark:text-blue-400 font-bold ml-2">Programar Ahora →</a>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Programación Masiva con CSV</h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
              Importa y programa múltiples posts a la vez usando archivos CSV para una gestión eficiente del contenido.
            </p>
            <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 font-bold">Revisar Ahora</a>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Posts en Cola Recurrentes</h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
              Crea una biblioteca de contenido atemporal que se recicla automáticamente para mantener tu feed fresco.
            </p>
            <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 font-bold">Revisar Ahora</a>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Post Recurrente</h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
              Configura posts que se repiten automáticamente en un horario para mantener un compromiso constante.
            </p>
            <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 font-bold">Revisar Ahora</a>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Generar Feed desde Posts RSS</h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
              Crea y comparte automáticamente posts de tus feeds RSS favoritos para estar al día.
            </p>
            <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 font-bold">Revisar Ahora</a>
          </div>
        </div>
      </div>
    </>
  );
};

// Nuevo componente para el contenido de Emails
const EmailsContent = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Email Marketing</h2>

      {/* Menú de tabs para Emails */}
      <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-6">
        <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-3">Statistics</a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-3">Campaigns</a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-3">Templates</a>
      </div>

      {/* Banner de datos de muestra */}
      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 2a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
          <p className="text-blue-800 dark:text-blue-200">
            You're viewing sample data. Create your own campaign to see real data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Clear Sample Data</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Resumen de Engagement */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <select className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <option>All Campaigns</option>
          </select>
          <input type="date" className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" value="2025-09-12" />
          <span>→</span>
          <input type="date" className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" value="2025-09-18" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Showing results for: Sep 12 - Sep 18</p>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Engagement Summary</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Summary of how recipients interact with your emails, like opening them, clicking links, and placing orders.</p>
        <div className="flex items-center mt-4">
          <div className="flex-grow">
            {/* Gráfico de barras placeholder */}
            <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Gráfico de barras de Engagement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis de Rendimiento */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance Analysis</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Track campaign performance trends for a metric over time.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">Email Delivered</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">24,159</h4>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">Bounced</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">380</h4>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">Unsubscribed</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">49</h4>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">Spam Complaints</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">12</h4>
          </div>
        </div>
        <div className="mt-6 flex items-center space-x-4">
          <div className="w-1/3">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Open Rate</h4>
            <span className="text-5xl font-bold text-gray-900 dark:text-white">44.24%</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total Opened: 10,688</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Delivery: 24,159</p>
          </div>
          <div className="w-2/3">
            {/* Gráfico de línea placeholder */}
            <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Gráfico de línea de Open Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top performing emails */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Top performing emails</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">List of top performing emails based on opened</p>
        <div className="mt-4 flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show statistics in numbers</span>
          </label>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Execution Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delivered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Click Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Flash Sale Campaign</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Sep 18, 2025 05:12 pm</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">7534</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">13.00%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">13.00%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Email Campaign</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Componente principal que gestiona el estado y renderiza el contenido
export default async function SocialPlannerPage() {
  const [activeTab, setActiveTab] = useState('Social Planner');

  // Determina qué contenido renderizar
  const renderContent = () => {
    switch (activeTab) {
      case 'Social Planner':
        return <SocialPlannerContent />;
      case 'Emails':
        return <EmailsContent />;
      default:
        return (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <h2 className="text-2xl font-semibold">No Content</h2>
            <p className="mt-2">This section is currently empty.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      
      {/* --- Menú de Navegación --- */}
      <div className="flex items-center space-x-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <span className="font-bold text-gray-900 dark:text-white">Marketing</span>
        <button 
          onClick={() => setActiveTab('Social Planner')} 
          className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Social Planner' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}
        >
          Social Planner
        </button>
        
        {/* Botón para "Emails" */}
        <button 
          onClick={() => setActiveTab('Emails')} 
          className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Emails' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}
        >
          Emails
        </button>
        
        <button onClick={() => setActiveTab('Snippets')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Snippets' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>Snippets</button>
        <button onClick={() => setActiveTab('Countdown Timers')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Countdown Timers' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>Countdown Timers</button>

        {/* Enlaces con dropdown (sin funcionalidad de dropdown en este ejemplo) */}
        <button onClick={() => setActiveTab('Trigger Links')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 flex items-center ${activeTab === 'Trigger Links' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>
          Trigger Links
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
        <button onClick={() => setActiveTab('Affiliate Manager')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 flex items-center ${activeTab === 'Affiliate Manager' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>
          Affiliate Manager
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
        
        <button onClick={() => setActiveTab('Brand Boards')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Brand Boards' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>Brand Boards</button>
        <button onClick={() => setActiveTab('Ad Manager')} className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pb-4 ${activeTab === 'Ad Manager' ? 'font-semibold border-b-2 border-blue-600 dark:border-blue-400' : ''}`}>Ad Manager</button>
      </div>
      {/* --- Fin del Menú --- */}

      {/* Renderiza el contenido dinámicamente */}
      {renderContent()}
      
    </div>
  );
}