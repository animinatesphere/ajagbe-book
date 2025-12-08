import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // Admin password kept in Vite env: VITE_ADMIN_PASSWORD
    // const secret = import.meta.env.VITE_ADMIN_PASSWORD || "";
    const secret = "ajagbe202";
    if (password === secret && secret !== "") {
      // mark admin session in localStorage (simple approach)
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password or admin password not configured.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin login</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the admin password to access the dashboard.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 border rounded-md"
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-gray-900 text-white rounded">
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-4 text-xs text-gray-400">
          Admin panel is protected by a password in your environment variables.
        </p>
      </div>
    </div>
  );
}
