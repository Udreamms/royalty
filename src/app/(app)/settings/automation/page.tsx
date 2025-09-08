"use client";

import React, { useState } from 'react';

// Un componente de ícono simple para reutilizar
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// Componente para el Calendario Desplegable
const DatePickerDropdown = ({ onConfirm, onClear }) => {
    const calendarDays = (month, year, startingDay, numDays) => {
        const days = [];
        // Días del mes anterior (si es necesario)
        const prevMonthDays = (startingDay === 0 ? 6 : startingDay - 1); // Lunes es 1
        for (let i = 0; i < prevMonthDays; i++) {
            days.push({ day: '', muted: true }); // Relleno para alinear
        }
        // Días del mes actual
        for (let i = 1; i <= numDays; i++) {
            days.push({ day: i, muted: false, isToday: month === 'Sep' && i === 8 });
        }
        return days;
    };

    const sep2025 = calendarDays('Sep', 2025, 1, 30); // Sep 1, 2025 es Lunes
    const oct2025 = calendarDays('Oct', 2025, 3, 31); // Oct 1, 2025 es Miércoles

    const Calendar = ({ month, year, days }) => (
        <div className="w-64">
            <div className="flex justify-between items-center mb-2">
                <button className="p-1 text-muted-foreground hover:text-foreground">«</button>
                <button className="p-1 text-muted-foreground hover:text-foreground">‹</button>
                <span className="font-semibold">{month} {year}</span>
                <button className="p-1 text-muted-foreground hover:text-foreground">›</button>
                <button className="p-1 text-muted-foreground hover:text-foreground">»</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2 text-center text-sm">
                {/* Rellenando días del mes anterior para Septiembre */}
                {month === 'Sep' && <div className="text-muted-foreground/50">31</div>}
                
                {days.slice(month === 'Sep' ? 1: 3).map((d, i) => ( // Ajuste manual para el layout
                    (<button key={i} className={`w-8 h-8 rounded-full ${d.muted ? 'text-muted-foreground/50' : ''} ${d.isToday ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                      {d.day}
                    </button>)
                ))}
                 {/* Rellenando días del mes siguiente para Octubre */}
                {month === 'Oct' && <div className="text-muted-foreground/50">1</div>}
            </div>
        </div>
    );
     // Ajuste manual de días para un renderizado visual correcto
    const octDays = [
        {day: 28, muted: true}, {day: 29, muted: true}, {day: 30, muted: true},
        ...Array.from({length: 31}, (_, i) => ({day: i + 1, muted: false})),
        {day: 1, muted: true}, {day: 2, muted: true}, {day: 3, muted: true}, {day: 4, muted: true},{day: 5, muted: true},{day: 6, muted: true},{day: 7, muted: true},{day: 8, muted: true}
    ];

    return (
        <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-4 z-20">
            <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Select Date" className="w-full p-2 border border-border rounded-md bg-input"/>
                <input type="text" placeholder="Select Time" className="w-full p-2 border border-border rounded-md bg-input"/>
                <input type="text" placeholder="Select Date" className="w-full p-2 border border-border rounded-md bg-input"/>
                <input type="text" placeholder="Select Time" className="w-full p-2 border border-border rounded-md bg-input"/>
            </div>
            <div className="flex gap-4">
                 <Calendar month="Sep" year="2025" days={sep2025} />
                 <Calendar month="Oct" year="2025" days={octDays} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClear} className="px-4 py-1.5 border border-border rounded-md hover:bg-muted">Clear</button>
                <button onClick={onConfirm} className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Confirm</button>
            </div>
        </div>
    );
};


export default function AutomationPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  // Estado para manejar las fechas de pausa
  const [pauseDates, setPauseDates] = useState([
    { id: 1, startDate: '', endDate: '', selectedWorkflow: '', annually: false }
  ]);

  const addPauseDate = () => {
    if (pauseDates.length < 15) {
      setPauseDates([...pauseDates, { id: Date.now(), startDate: '', endDate: '', selectedWorkflow: '', annually: false }]);
    }
  };

  const removePauseDate = (id) => {
    setPauseDates(pauseDates.filter(date => date.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-12 bg-background text-foreground">
      
      {/* Sección 1: Global Workflow Settings */}
      <section>
        <h1 className="text-3xl font-bold">Global Workflow Settings</h1>
        
        <div className="mt-6 space-y-6">
          {/* Card: Pro Plans */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Save More With Workflow Pro Plans</h2>
              <p className="mt-1 text-muted-foreground">Unlock more Workflow Premium Executions, enjoy better cost efficiency, and scale automations with ease. (Visible to Agency Admins only)</p>
            </div>
            <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap hover:bg-primary/90 transition-colors">
              <Icon path="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              View Plans
            </button>
          </div>

          {/* Card: Notifications */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="p-6 space-y-4">
               <div className="flex items-start gap-4">
                   <div className="mt-1">
                     <Icon path="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" className="w-8 h-8 text-muted-foreground"/>
                   </div>
                   <div>
                       <h3 className="font-semibold text-foreground">Email Notification</h3>
                       <p className="text-muted-foreground">By default, Workflow error notifications are sent to all Admin Users via email, but you can add other email addresses to be notified here.</p>
                   </div>
                   <select className="w-full max-w-xs border border-border rounded-md px-3 py-2 bg-input text-foreground focus:ring-primary focus:ring-1 appearance-none" disabled={!notificationsEnabled}>
                       <option>Select Users</option>
                   </select>
               </div>
               <div className="flex justify-end">
                   <button className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!notificationsEnabled}>
                       Save
                   </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Pause Workflow */}
      <section>
        <h1 className="text-3xl font-bold">Pause Workflow</h1>
        <p className="mt-1 text-muted-foreground">Temporarily pause selected workflows, putting them in draft state during a specified time period.</p>
        
        <div className="mt-6 bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold">When to pause workflow?</h3>
             <span className="text-sm text-muted-foreground">Pause Dates: {pauseDates.length}/15</span>
          </div>

          <div className="space-y-6">
            {pauseDates.map((date) => (
              <div key={date.id} className="relative space-y-4 pb-6 border-b border-border last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* INPUT DE FECHA CON onClick PARA MOSTRAR CALENDARIO */}
                  <div 
                    className="w-full sm:w-auto flex-1 flex items-center border border-border rounded-md cursor-pointer"
                    onClick={() => setDatePickerVisible(!isDatePickerVisible)}
                  >
                    <div className="w-1/2 p-2 text-muted-foreground">Start Date and Time</div>
                    <span className="text-muted-foreground mx-2">→</span>
                    <div className="w-1/2 p-2 text-muted-foreground">End Date and Time</div>
                  </div>

                  {/* CALENDARIO DESPLEGABLE */}
                  {isDatePickerVisible && (
                    <DatePickerDropdown 
                      onConfirm={() => setDatePickerVisible(false)}
                      onClear={() => setDatePickerVisible(false)}
                    />
                  )}

                  <select className="w-full sm:w-56 border border-border rounded-md p-2 bg-input text-foreground focus:ring-primary focus:ring-1 appearance-none">
                    <option>Select Workflows</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-foreground">
                       <Icon path="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive" onClick={() => removePauseDate(date.id)}>
                       <Icon path="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary"/>
                  Annually
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
             <button onClick={addPauseDate} className="font-semibold text-primary hover:text-primary/80" disabled={pauseDates.length >= 15}>
               + Add Date
             </button>
          </div>
        </div>
        
        <div className="mt-4 px-2 space-y-1 text-sm text-muted-foreground">
          <p>* Maximum allowed difference between the start and end date is 15 days.</p>
          <p>* A Workflow should not be part of two or more date ranges that are overlapping.</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-primary text-primary-foreground font-semibold px-8 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Save
          </button>
        </div>
      </section>
    </div>
  );
}