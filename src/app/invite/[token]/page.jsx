"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AcceptInvitation({ params }) {
  const token = params.token;
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    api(`/api/invitation/validate/${token}/`).then(res => {
      if (res.email) {
        setEmail(res.email);
        setValid(true);
      }
    });
  }, []);

  if (!valid) return <p className="text-center mt-20">Token tidak valid</p>;

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl">Undangan untuk {email}</h2>

      <a href={`/register?token=${token}`} className="text-blue-600 underline mt-3 inline-block">
        Daftar Sekarang
      </a>
    </div>
  );
}
