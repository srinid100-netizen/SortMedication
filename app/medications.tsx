import { createClient } from "@/lib/supabase/server";
import { addMedication, recordMovement } from "./actions";

type Row = {
  id: string;
  name: string;
  strength: string | null;
  unit: string;
  stock_levels: { quantity: number; low_threshold: number; surplus_threshold: number }[];
};

function status(q: number, low: number, surplus: number) {
  if (q <= low) return { label: "Low stock", cls: "bg-red-100 text-red-800" };
  if (surplus > 0 && q >= surplus) return { label: "Surplus", cls: "bg-amber-100 text-amber-800" };
  return { label: "OK", cls: "bg-green-100 text-green-800" };
}

export async function Medications() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("medications")
    .select("id, name, strength, unit, stock_levels(quantity, low_threshold, surplus_threshold)")
    .order("name");
  const rows = (data ?? []) as Row[];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Stock</h2>
      <ul className="mt-3 divide-y rounded border">
        {rows.length === 0 && <li className="p-3 text-sm">No medications yet. Add one below.</li>}
        {rows.map((m) => {
          const l = m.stock_levels[0];
          const s = l ? status(l.quantity, l.low_threshold, l.surplus_threshold) : null;
          return (
            <li key={m.id} className="flex flex-wrap items-center gap-3 p-3">
              <div className="min-w-40 flex-1">
                <div className="font-medium">
                  {m.name} {m.strength}
                </div>
                <div className="text-sm text-zinc-600">
                  {l ? `${l.quantity} ${m.unit} (low ≤ ${l.low_threshold}, surplus ≥ ${l.surplus_threshold})` : "No stock record"}
                </div>
              </div>
              {s && <span className={`rounded px-2 py-0.5 text-xs ${s.cls}`}>{s.label}</span>}
              <form action={recordMovement} className="flex gap-2">
                <input type="hidden" name="medication_id" value={m.id} />
                <input
                  name="change"
                  type="number"
                  placeholder="+in / −out"
                  className="w-24 rounded border p-1"
                  required
                />
                <button className="rounded border px-2">Record</button>
              </form>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Add medication</h2>
      <form action={addMedication} className="mt-3 grid gap-2 sm:grid-cols-3">
        <input name="name" placeholder="Name" className="rounded border p-2" required />
        <input name="strength" placeholder="Strength (500 mg)" className="rounded border p-2" />
        <input name="unit" placeholder="Unit (tablets)" className="rounded border p-2" />
        <input name="quantity" type="number" min={0} placeholder="Quantity now" className="rounded border p-2" />
        <input name="low" type="number" min={0} placeholder="Low threshold" className="rounded border p-2" />
        <input name="surplus" type="number" min={0} placeholder="Surplus threshold" className="rounded border p-2" />
        <button className="rounded bg-black p-2 text-white sm:col-span-3">Add</button>
      </form>
    </section>
  );
}
