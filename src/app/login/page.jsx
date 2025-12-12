"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { saveToken } from "@/app/actions/auth"; 

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const data = await api("/api/token/", "POST", form);

    if (data.access) {
      document.cookie = `access=${data.access}; path=/; SameSite=Strict`;
      document.cookie = `refresh=${data.refresh}; path=/; SameSite=Strict`;
    
      window.location.href = "/dashboard";
    } else {
      setError("Username atau password salah.");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl mb-2 font-semibold">Login</h2>
      <p className="text-gray-600 text-sm mb-4">
        Silakan masuk untuk mengakses dashboard dan fitur lainnya.
      </p>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={login} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
