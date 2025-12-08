'use client';

import { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function NavMenu() {
  const [role, setRole] = useState('guest');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access');
      if (token) {
        try {
          const payload = jwt_decode(token);
          console.log(payload);
          const userRole = payload.role || 'guest';
          setRole(userRole);
        } catch (e) {
          console.error('Failed to decode token', e);
          setRole('guest');
        }
      } else {
        setRole('guest');
      }
    }
    setLoaded(true);
  }, []);

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

  const items = menu[role] || menu.guest;

  if (!loaded) return null;

  return (
    <nav className="p-4 bg-gray-200 flex gap-4">
      {items.map((m) => (
        <a key={m.link} href={m.link} className="text-blue-700">
          {m.name}
        </a>
      ))}
    </nav>
  );
}
