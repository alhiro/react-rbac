"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, getCookie } from "@/lib/api";

export default function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      const token = getCookie("access");
      const res = await api(`/api/users/${id}/`, "GET", null, token);
      setForm(res);
    }
    load();
  }, [id]);

  if (!form) return <p>Loading...</p>;

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function save(e) {
    e.preventDefault();
    const token = getCookie("access");

    const res = await api(`/api/users/${id}/`, "PUT", form, token);

    if (!form.username || !form.email || !form.role) {
      setMsg("Semua field harus diisi.");
      return;
    }

    if (res.username && Array.isArray(res.username)) {
      setMsg(res.username[0]);
      return;
    }

    if (res.username) setMsg("Updated!");
    else setMsg("Failed: " + JSON.stringify(res));
  }

  async function remove() {
    const token = getCookie("access");
    await api(`/api/users/${id}/`, "DELETE", null, token);
    window.location.href = "/users";
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl mb-4">Edit User</h1>

      {msg && <p className="mb-3">{msg}</p>}

      <form onSubmit={save}>
        <input name="username" value={form.username}
          className="border p-2 w-full mb-3" onChange={updateField} />

        <input name="email" value={form.email}
          className="border p-2 w-full mb-3" onChange={updateField} />

        <select name="role" value={form.role}
          className="border p-2 w-full mb-3" onChange={updateField}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
          Save
        </button>

        <button type="button" onClick={remove}
          className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </form>
    </div>
  );
}
