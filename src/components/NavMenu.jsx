'use client';

import { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from "jwt-decode";
import { getCookie } from "@/lib/api";

export default function NavMenu() {
  const [role, setRole] = useState('guest');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = getCookie('access');
      if (token) {
        try {
          const payload = jwt_decode(token);
          const userRole = payload.role || 'guest';
          console.log(userRole);
          setTimeout(() => setRole(userRole), 0);
        } catch (e) {
          console.error('Failed to decode token', e);
          setTimeout(() => setRole('guest'), 0);
        }
      } else {
        setTimeout(() => setRole('guest'), 0);
      }
    }
    setTimeout(() => setLoaded(true), 0);
  }, []);

  function logout() {
    document.cookie = "access=; path=/; max-age=0";
    document.cookie = "refresh=; path=/; max-age=0";
    window.location.href = "/login";
  }

  const menu = {
    guest: [
      { name: "Home", link: "/" },
      { name: "Login", link: "/login" },
    ],
    admin: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Users", link: "/users" },
      { name: "Invitation", link: "/invitation" },
    ],
    manager: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Team", link: "/team" },
    ],
    staff: [
      { name: "Dashboard", link: "/dashboard" },
    ],
  };

  if (!loaded || role === 'guest') return null;

  const items = menu[role] || menu.guest;

  return (
    <nav className="p-4 bg-gray-200 flex gap-4">
      {items.map((m) => (
        <a key={m.link} href={m.link} className="text-blue-700">
          {m.name}
        </a>
      ))}

      <button
          onClick={logout}
          className="text-red-600 ml-auto px-2 py-1 border rounded hover:bg-red-100"
        >
          Logout
      </button>
    </nav>
  );
}