"use client";

import React, { useState } from "react";

// --- REUSABLE ICON COMPONENT ---
const Icon = ({ children, className = "w-5 h-5", title = "" }: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    role={title ? "img" : "presentation"}
    aria-label={title || undefined}
    aria-hidden={title ? undefined : true}
  >
    {children}
  </svg>
);

// --- INTERFACES ---
interface DatePickerPopoverProps {
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  onDateChange: (dates: { start: Date | null; end: Date | null }) => void;
  onClose: () => void;
}
interface CalendarMonthProps {
  dateToDisplay: Date;
}
interface PauseDate {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  selectedWorkflow: string;
  annually: boolean;
}
interface PauseDate {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  selectedWorkflow: string;
  annually: boolean;
}
interface IconProps {
  className?: string;
  title?: string;
  children: React.ReactNode; // recibiendo <path> como children
}

// --- CALENDAR (CORRECTED AND IMPROVED COMPONENT) ---
const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  initialStartDate,
  initialEndDate,
  onDateChange,
  onClose
}) => {
  const [draftStartDate, setDraftStartDate] = useState<Date | null>(initialStartDate);
  const [draftEndDate, setDraftEndDate] = useState<Date | null>(initialEndDate);
  const [displayDate, setDisplayDate] = useState<Date>(initialStartDate || new Date());

  const ChevronLeftIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );

  const ChevronDoubleLeftIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 19.5-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  );

  const ChevronDoubleRightIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
    </svg>
  );

  // Corrected Date creation for navigation
  const goToPrevMonth = () => setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goToNextMonth = () => setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToPrevYear = () => setDisplayDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
  const goToNextYear = () => setDisplayDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));

  const handleDateClick = (date: Date) => {
    if (!draftStartDate || draftEndDate) {
      setDraftStartDate(date);
      setDraftEndDate(null);
    } else if (date < draftStartDate) {
      setDraftEndDate(draftStartDate);
      setDraftStartDate(date);
    } else {
      setDraftEndDate(date);
    }
  };

const handleConfirm = () => {
    onDateChange({ start: draftStartDate, end: draftEndDate });
    onClose();
  };

  const handleClear = () => {
    setDraftStartDate(null);
    setDraftEndDate(null);
  };

  const CalendarMonth: React.FC<CalendarMonthProps> = ({ dateToDisplay }) => {
    const year = dateToDisplay.getFullYear();
    const month = dateToDisplay.getMonth();
    const monthName = dateToDisplay.toLocaleString("en-US", { month: "long" });
    const today = new Date();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = firstDayOfMonth; i > 0; i--) {
      // Ensured a valid Date object is created for "previous month" days
      calendarDays.push({ day: prevMonthDays - i + 1, isCurrent: false, date: new Date(year, month - 1, prevMonthDays - i + 1) });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, isCurrent: true, date: new Date(year, month, i) });
    }

    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, isCurrent: false, date: new Date(year, month + 1, i) });
    }

    return (
      <div className="flex-shrink-0 w-72">
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <button onClick={goToPrevYear} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md" aria-label="Previous Year"><ChevronDoubleLeftIcon /></button>
            <button onClick={goToPrevMonth} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md" aria-label="Previous Month"><ChevronLeftIcon /></button>
          </div>
          <span className="font-semibold text-foreground text-base">{monthName} {year}</span>
          <div className="flex items-center gap-1">
            <button onClick={goToNextMonth} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md" aria-label="Next Month"><ChevronRightIcon /></button>
            <button onClick={goToNextYear} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md" aria-label="Next Year"><ChevronDoubleRightIcon /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-x-2 text-center text-xs font-medium text-muted-foreground">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {calendarDays.map(({ day, isCurrent, date }, index) => {
            if (!isCurrent || !date) {
              return <div key={index} className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground/40">{day}</div>;
            }
            const isStartDate = draftStartDate && date.toDateString() === draftStartDate.toDateString();
            const isEndDate = draftEndDate && date.toDateString() === draftEndDate.toDateString();
            const isToday = date.toDateString() === today.toDateString();
            
            const normalizedStartDate = draftStartDate && draftEndDate ? (draftStartDate < draftEndDate ? draftStartDate : draftEndDate) : null;
            const normalizedEndDate = draftStartDate && draftEndDate ? (draftStartDate < draftEndDate ? draftEndDate : draftStartDate) : null;
            const isInRange = normalizedStartDate && normalizedEndDate && date > normalizedStartDate && date < normalizedEndDate;

            const baseClasses = "relative flex h-9 w-9 items-center justify-center text-sm transition-colors rounded-full";
            const stateClasses = isStartDate || isEndDate
              ? "bg-primary text-primary-foreground"
              : isInRange
              ? "bg-primary/10 text-primary"
              : isToday
              ? "border border-primary text-primary"
              : "hover:bg-muted text-foreground";

            return (
              <button key={index} onClick={() => handleDateClick(date)} className={`${baseClasses} ${stateClasses}`} aria-label={`Select ${date.toDateString()}`}>
                {day}
                {isToday && !isStartDate && !isEndDate && !isInRange && (
                  <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonthDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
  const formatDate = (date: Date | null) => date ? date.toLocaleDateString('en-CA') : '';


  return (
    <div className="absolute left-0 top-full z-10 mt-2 min-w-max rounded-xl border bg-card p-4 shadow-lg">
      {/* Date and Time Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Start Date" readOnly className="border-border bg-input rounded-md p-2 text-sm text-center cursor-default" value={draftStartDate ? draftStartDate.toLocaleDateString() : 'Start Date'} />
          <input type="text" placeholder="Start Time" readOnly className="border-border bg-input rounded-md p-2 text-sm text-center cursor-default" value="Select Time" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="End Date" readOnly className="border-border bg-input rounded-md p-2 text-sm text-center cursor-default" value={draftEndDate ? draftEndDate.toLocaleDateString() : 'End Date'} />
          <input type="text" placeholder="End Time" readOnly className="border-border bg-input rounded-md p-2 text-sm text-center cursor-default" value="Select Time" />
        </div>
      </div>
      <div className="flex gap-x-6">
          <CalendarMonth dateToDisplay={displayDate} />
          <CalendarMonth dateToDisplay={nextMonthDate} />
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-200 pt-3">
          <button onClick={handleClear} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Clear
          </button>
          <button onClick={handleConfirm} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Confirm
          </button>
      </div>
    </div>
  );
};


export default function AutomationPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState<number | null>(null);
  const [pauseDates, setPauseDates] = useState<PauseDate[]>([
  { id: 1, startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 7)), selectedWorkflow: '', annually: false }
]);


  const addPauseDate = () => {
  if (pauseDates.length < 15) {
    setPauseDates([
      ...pauseDates,
      { id: Date.now(), startDate: null, endDate: null, selectedWorkflow: "", annually: false }
    ]);
  }
};

const removePauseDate = (id: number) => {
  setPauseDates(pauseDates.filter(date => date.id !== id));
};

const updatePauseDate = (id: number, newData: Partial<PauseDate>) => {
  setPauseDates(
    pauseDates.map((d) => (d.id === id ? { ...d, ...newData } : d))
  );
};

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-12 bg-background text-foreground">
      {/* Section 1: Global Workflow Settings */}
      <section>
          <h1 className="text-3xl font-bold">Global Workflow Settings</h1>
          <div className="mt-6 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Save More With Workflow Pro Plans</h2>
                <p className="mt-1 text-muted-foreground">Unlock more Workflow Premium Executions, enjoy better cost efficiency, and scale automations with ease. (Visible to Agency Admins only)</p>
              </div>
              <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap hover:bg-primary/90 transition-colors">
                <Icon title="View Plans">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </Icon>             
                View Plans
              </button>
            </div>
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Icon className="w-8 h-8 text-muted-foreground" title="Email Icon">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                      </Icon>                    
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

      {/* Section 2: Pause Workflow */}
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
                  {/* DATE INPUT */}
                  <div className="w-full sm:w-auto flex-1 relative">
                    <button
                      onClick={() => setDatePickerVisible(isDatePickerVisible === date.id ? null : date.id)}
                      className="w-full flex items-center justify-between border border-border rounded-md cursor-pointer p-2"
                    >
                      <span className="text-muted-foreground">
                        {date.startDate ? date.startDate.toLocaleDateString() : "Start Date and Time"}
                      </span>
                      <span className="text-muted-foreground mx-2">→</span>
                      <span className="text-muted-foreground">
                        {date.endDate ? date.endDate.toLocaleDateString() : "End Date and Time"}
                      </span>
                    <Icon title="Calendar Icon" className="ml-2 w-5 h-5 text-muted-foreground">
                       <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </Icon>
                    </button>
                    {isDatePickerVisible === date.id && (
                      <DatePickerPopover
                        initialStartDate={date.startDate}
                        initialEndDate={date.endDate}
                        onDateChange={(newDates) => updatePauseDate(date.id, { startDate: newDates.start, endDate: newDates.end }) }
                        onClose={() => setDatePickerVisible(null)}
                      />
                    )}
                  </div>
                  <select className="w-full sm:w-56 border border-border rounded-md p-2 bg-input text-foreground">
                    <option>Select Workflows</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button
  className="p-2 text-muted-foreground hover:text-foreground"
  aria-label="Duplicate date entry"
  onClick={() => {
    const newDate = { ...date, id: Date.now() }; // copia el objeto con un nuevo id
    setPauseDates([...pauseDates, newDate]);
  }}
>
  <Icon title="Duplicate Icon">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </Icon>
</button>

                    <button className="p-2 text-muted-foreground hover:text-destructive" onClick={() => removePauseDate(date.id)} aria-label="Remove date entry">
                      <Icon title="Remove Icon">
                       <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                     </Icon>
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={date.annually} onChange={(e) => updatePauseDate(date.id, { annually: e.target.checked }) } className="rounded border-border text-primary focus:ring-primary" />
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
      </section>
    </div>
  );
}

//casi listo (arreglar botones del calendario)