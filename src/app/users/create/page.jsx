"use client";
import { useState } from "react";
import { api, getCookie } from "@/lib/api";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff"
  });
  const [msg, setMsg] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    const token = getCookie("access");

    const res = await api("/api/users/", "POST", form, token);

    if (res.username) {
      setMsg("User created!");
    } else {
      setMsg("Failed: " + JSON.stringify(res));
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl mb-4">Create User</h1>

      {msg && <p className="mb-3 text-red-600">{msg}</p>}

      <form onSubmit={submit}>
        <input name="username" placeholder="Username"
          className="border p-2 w-full mb-3" onChange={updateField} />

        <input name="email" placeholder="Email"
          className="border p-2 w-full mb-3" onChange={updateField} />

        <input name="password" placeholder="Password" type="password"
          className="border p-2 w-full mb-3" onChange={updateField} />

        <select name="role" className="border p-2 w-full mb-3" onChange={updateField}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
