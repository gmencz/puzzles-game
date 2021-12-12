import { createCookieSessionStorage, redirect } from "remix";

export let { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      name: "_session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [process.env.SESSION_SECRET!],
      secure: process.env.NODE_ENV === "production",
    },
  });
