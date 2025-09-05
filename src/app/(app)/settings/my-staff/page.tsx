import React from "react";

export default function MyStaffPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-1">My Staff</h1>
      <div className="flex items-center gap-2 mb-6">
        <select className="border rounded px-3 py-2 text-sm" defaultValue="">
          <option value="">User Role</option>
          {/* Puedes agregar más opciones aquí */}
        </select>
        <input
          type="text"
          placeholder="name, email, phone,"
          className="border rounded px-3 py-2 text-sm flex-1"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded ml-2">
          + Add User
        </button>
      </div>
      <div className="bg-white rounded shadow border">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Phone</th>
              <th className="px-4 py-2 text-left font-medium">User Type</th>
              <th className="px-4 py-2 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="py-12 text-center text-muted-foreground">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-2">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="#e0e7ff" />
                      <path d="M12 8v4l3 3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="font-semibold">No Users found</div>
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
