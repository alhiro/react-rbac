"use server";

import { cookies } from "next/headers";

export async function saveToken(access, refresh) {
  cookies().set("access", access, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  cookies().set("refresh", refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return true;
}
