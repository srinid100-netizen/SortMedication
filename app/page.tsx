import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Medications } from "./medications";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

async function CurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <>
      <p className="mt-2">Signed in as {data.user.email}</p>
      <form action={signOut}>
        <button className="mt-4 rounded border px-3 py-1">Sign out</button>
      </form>
    </>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">SortMedication</h1>
      <Suspense fallback={<p className="mt-2">Loading…</p>}>
        <CurrentUser />
      </Suspense>
      <Suspense fallback={<p className="mt-8">Loading stock…</p>}>
        <Medications />
      </Suspense>
    </main>
  );
}
