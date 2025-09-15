"use client";

import React, { useState, useEffect } from "react";

export default function MyStaffPage() {
  // Initialize theme from localStorage, default to "light" if not set
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
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

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <h1 className="text-2xl font-semibold mb-1 text-foreground">My Staff</h1>
      <div className="flex items-center gap-2 mb-6">
        <select
          className="border border-border rounded px-3 py-2 text-sm bg-input text-foreground focus:ring-primary focus:ring-1"
          defaultValue=""
        >
          <option value="">User Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input
          type="text"
          placeholder="name, email, phone"
          className="border border-border rounded px-3 py-2 text-sm w-52 bg-input text-foreground focus:ring-primary focus:ring-1"
        />
        <button
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2 rounded ml-2"
        >
          + Add User
        </button>
      </div>
      <div className="bg-card rounded shadow border border-border">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left font-medium text-foreground">Name</th>
              <th className="px-4 py-2 text-left font-medium text-foreground">Email</th>
              <th className="px-4 py-2 text-left font-medium text-foreground">Phone</th>
              <th className="px-4 py-2 text-left font-medium text-foreground">User Type</th>
              <th className="px-4 py-2 text-left font-medium text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="py-12 text-center text-muted-foreground">
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 rounded-full p-4 mb-2">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#2563eb"
                        strokeWidth="2"
                        fill="#e0e7ff"
                        className="stroke-primary fill-primary/20"
                      />
                      <path
                        d="M12 8v4l3 3"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-primary"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold text-foreground">No Users Found</div>
                  <div className="text-sm text-muted-foreground">
                    No user is found with the current filter/search. Please try again with a different filter/search.
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
//listo 