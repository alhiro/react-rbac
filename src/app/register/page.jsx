"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: ""
  });

  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      invitation_token: form.token
    };

    const res = await api("/api/register/", "POST", payload);

    if (res.username) {
      setMsg("Registrasi berhasil!");
    } else {
      setMsg("Registrasi gagal: " + JSON.stringify(res));
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-semibold">Register</h2>

      <form onSubmit={submit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Username" value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} />

        <input className="border p-2 w-full" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input className="border p-2 w-full" placeholder="Password" type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <input className="border p-2 w-full" placeholder="Invitation Token"
          value={form.token}
          onChange={e => setForm({ ...form, token: e.target.value })} />

        <button className="bg-green-600 text-white w-full p-2">Register</button>
      </form>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
