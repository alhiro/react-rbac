"use client";

import { useEffect, useState } from "react";
import { api, getCookie } from "@/lib/api";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const token = getCookie("access");
      const res = await api("/api/users/", "GET", null, token);
      setUsers(res);
    }
  
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Users</h1>

      <a
        href="/users/create"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create User
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                <a
                  className="text-blue-600 underline"
                  href={`/users/${u.id}`}
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
