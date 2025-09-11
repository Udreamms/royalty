"use client";

import React, { useState, useEffect } from "react";



export default function OpportunitiesPipelinesPage() {
  // Initialize theme from localStorage, default to "light" if not set
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  // Effect to toggle the 'dark' class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [tab, setTab] = useState<"opportunities" | "pipelines">("opportunities");
  const [allowDifferentOwners, setAllowDifferentOwners] = useState(true);
  const [autoOwnerToContact, setAutoOwnerToContact] = useState(true);
  const [autoContactToOwner, setAutoContactToOwner] = useState(true);

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      {/* Main title and tabs */}
      <div className="border-b border-border flex items-center gap-8 mb-6">
        <span className="text-xl font-semibold py-4 text-foreground">
          Opportunities and Pipelines
        </span>
        <div className="flex gap-2">
          <button
            className={`px-2 pb-2 border-b-2 ${
              tab === "opportunities"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setTab("opportunities")}
          >
            Opportunities
          </button>
          <button
            className={`px-2 pb-2 border-b-2 ${
              tab === "pipelines"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setTab("pipelines")}
          >
            Pipelines
          </button>
        </div>
      </div>

      {/* Opportunities Tab */}
      {tab === "opportunities" && (
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-foreground">
            Customize Opportunity Settings
          </h1>
          <div className="bg-card rounded border border-border shadow p-6 max-w-2xl">
            <div className="flex items-center mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDifferentOwners}
                  onChange={() => setAllowDifferentOwners((v) => !v)}
                  className="peer sr-only"
                />
                <span
                  className={`w-11 h-6 flex items-center bg-muted rounded-full p-1 duration-300 ease-in-out ${
                    allowDifferentOwners ? "bg-primary" : ""
                  }`}
                >
                  <span
                    className={`bg-background w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      allowDifferentOwners ? "translate-x-5" : ""
                    }`}
                  />
                </span>
                <span className="ml-3 font-medium text-foreground">
                  Allow Different Owners for Contacts and Their Opportunities
                </span>
              </label>
            </div>
            <div className="ml-14 mb-2">
              <a href="#" className="text-primary text-sm hover:underline">
                Learn more about this setting
              </a>
              <div className="text-xs text-muted-foreground mt-1">
                Note: If this setting is enabled, workflows may stop assigning
                owners to opportunities.
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={autoOwnerToContact}
                  onChange={() => setAutoOwnerToContact((v) => !v)}
                  className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary mt-1"
                />
                <span>
                  <span className="font-medium text-foreground">
                    Automatically Convert Opportunity Owner to Contact Follower
                  </span>
                  <span
                    className="ml-1 text-muted-foreground cursor-pointer"
                    title="When a new owner is selected for an opportunity, they will be added as a follower of that opportunity's contact."
                  >
                    &#9432;
                  </span>
                  <div className="text-sm text-muted-foreground">
                    When a new owner is selected for an opportunity, they will
                    be added as a follower of that opportunity's contact.
                  </div>
                </span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={autoContactToOwner}
                  onChange={() => setAutoContactToOwner((v) => !v)}
                  className="form-checkbox h-4 w-4 rounded bg-input border-border text-primary focus:ring-primary mt-1"
                />
                <span>
                  <span className="font-medium text-foreground">
                    Automatically Convert Contact Owner to Opportunity Follower
                  </span>
                  <span
                    className="ml-1 text-muted-foreground cursor-pointer"
                    title="When a new owner is selected for a contact, they will be added as a follower to that contact's opportunities."
                  >
                    &#9432;
                  </span>
                  <div className="text-sm text-muted-foreground">
                    When a new owner is selected for a contact, they will be
                    added as a follower to that contact's opportunities.
                  </div>
                </span>
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium disabled:bg-primary/50"
                disabled
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pipelines Tab */}
      {tab === "pipelines" && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Pipelines</h2>
            <button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-4 py-2 rounded flex items-center gap-2">
              <span className="text-lg">+</span> Create Pipeline
            </button>
          </div>

          {/* Table */}
          <div className="border border-border rounded">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 border rounded text-sm bg-background"
              />
            </div>
            <table className="w-full text-left">
              <thead className="bg-muted text-foreground/80 text-sm">
                <tr>
                  <th className="px-4 py-2">Pipeline Name</th>
                  <th className="px-4 py-2">No. of Stages</th>
                  <th className="px-4 py-2">Updated on</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="font-medium text-lg mb-1">
                      No Pipelines Found! Organize Your Sales with Pipelines
                    </div>
                    <div className="text-sm mb-4">
                      Create a pipeline to manage your Opportunities, measure
                      progress, and close more deals efficiently.
                    </div>
                    <div className="flex justify-center gap-3">
                      <button className="px-4 py-2 border rounded text-sm text-primary hover:underline">
                        Learn More
                      </button>
                      <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded text-sm">
                        + Create Pipeline
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
