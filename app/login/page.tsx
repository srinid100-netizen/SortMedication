"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(mode: "in" | "up") {
    setMessage("");
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${location.origin}/auth/callback` },
          });
    if (error) return setMessage(error.message);
    if (mode === "up") return setMessage("Check your email to confirm your account.");
    location.href = "/";
  }

  async function google() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Sign in to SortMedication</h1>
      <input
        className="rounded border p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="rounded border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="rounded bg-black p-2 text-white" onClick={() => submit("in")}>
        Sign in
      </button>
      <button className="rounded border p-2" onClick={() => submit("up")}>
        Create account
      </button>
      <button className="rounded border p-2" onClick={google}>
        Continue with Google
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </main>
  );
}
