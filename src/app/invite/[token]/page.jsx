"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, getCookie } from "@/lib/api";

export default function AcceptInvitation() {
  const { token: inviteToken } = useParams();
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const token = getCookie("access");

  useEffect(() => {
    if (!token) return; 
    
    api(`/api/invitation/validate?token=${inviteToken}`, "GET", null, token).then(res => {
      if (res.email) {
        setEmail(res.email);
        setValid(true);
      }
    });
  }, [inviteToken, token]);

  if (!valid) return <p className="text-center mt-20">Token tidak valid</p>;

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl">Undangan untuk {email}</h2>

      <a href={`/register?token=${inviteToken}`} className="text-blue-600 underline mt-3 inline-block">
        Daftar Sekarang
      </a>
    </div>
  );
}
