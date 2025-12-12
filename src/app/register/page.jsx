"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: token
  });

  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      invitation_token: form.token || token
    };

    const res = await api("/api/register/", "POST", payload);

    if (!form.username || !form.email || !form.password) {
      setMsg("Semua field harus diisi.");
      return;
    }

    if (payload) {
      setMsg("Registrasi berhasil!");
    } else {
      setMsg("Registrasi gagal: " + JSON.stringify(res.message));
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl mb-2 font-semibold">Register</h2>
      <p className="text-gray-600 text-sm mb-4">
        Daftar akun baru menggunakan undangan (invitation token).
      </p>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Invitation Token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>

      {msg && <p className="mt-3 text-center text-sm text-red-500">{msg}</p>}

      <p className="text-sm mt-4 text-center">
        Sudah punya akun?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
