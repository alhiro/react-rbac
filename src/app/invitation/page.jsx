"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function InvitationsPage() {
  const [form, setForm] = useState({ email: "", role: "staff" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access");

    const res = await api("/api/invitations/create/", "POST", form, token);
    setMsg(JSON.stringify(res));
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-3">Buat Undangan</h2>

      <form onSubmit={submit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <select className="border p-2 w-full"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        <button className="bg-blue-600 text-white p-2 w-full">Kirim Undangan</button>
      </form>

      <p className="mt-3">{msg}</p>
    </div>
  );
}
