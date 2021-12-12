import { ActionFunction, json } from "remix";
import { validateCredentials, createUserSession } from "~/utils/auth.server";

let validateEmail = (email: string) => {
  if (!email.includes("@")) {
    return "Invalid email";
  }
};

let validatePassword = (password: string) => {
  if (password.length < 6) {
    return "Your password must be at least 6 characters long";
  }
};

export let action: ActionFunction = async ({ request }) => {
  let form = await request.formData();
  let email = form.get("email");
  let password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json(
      {
        formError: `Form not submitted correctly.`,
      },
      { status: 400 }
    );
  }

  let fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  let fields = { email, password };
  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  let user = await validateCredentials(email, password);
  if (!user) {
    return json(
      { fields, formError: "Email/Password combination is incorrect" },
      { status: 400 }
    );
  }

  return createUserSession(user.id, "/");
};

export default function LoginView() {
  return (
    <form method="post" className="p-6 flex flex-col gap-4 items-start">
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-gray-400 border-2 border-solid px-2 py-1"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-gray-400 border-2 border-solid px-2 py-1"
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className="bg-gray-400 text-gray-900 font-semibold px-4 py-2"
      >
        Login
      </button>
    </form>
  );
}
