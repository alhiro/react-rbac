"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const data = await api("/api/token/", "POST", form);

    if (data.access) {
      localStorage.setItem("access", data.access);
      document.cookie = `refresh=${data.refresh}; path=/`;

      window.location.href = "/dashboard";
    } else {
      setError("Username atau password salah.");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={login} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2">Login</button>
      </form>
    </div>
  );
}
