import { compare } from "bcrypt";
import { redirect } from "remix";
import { db } from "./db.server";
import { commitSession, getSession } from "./session.server";

export let validateCredentials = async (email: string, password: string) => {
  let user = await db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });

  if (!user) {
    return null;
  }

  let isCorrectPassword = await compare(password, user.password);
  if (!isCorrectPassword) {
    return null;
  }

  return user;
};

export function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export let createUserSession = async (userId: string, redirectTo: string) => {
  let session = await getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
