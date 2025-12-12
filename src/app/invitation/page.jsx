"use client";
import { useState } from "react";
import { api, getCookie } from "@/lib/api";

export default function InvitationsPage() {
  const [form, setForm] = useState({ email: "", role: "staff" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
  
    const token = getCookie("access");
  
    if (!token) {
      setMsg("You are not authenticated. Please login.");
      return;
    }
  
    try {
      const res = await api(
        "/api/invitations/",
        "POST",
        form,
        token 
      );
  
      setMsg(res.detail || res);
    } catch (err) {
      console.error(err);
      setMsg("Failed to create invitation.");
    }
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

      {msg && (
        <div className="mt-3 text-red-500">
          {msg.accept_url_demo ? (
            <p>
              You have been invited!{' '}
              <a
                href={msg.accept_url_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Accept Invitation
              </a>
            </p>
          ) : (
            <p>{msg}</p>
          )}
        </div>
      )}
    </div>
  );
}
