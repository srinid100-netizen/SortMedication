"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addMedication(formData: FormData) {
  const supabase = await createClient();
  const { data: med, error } = await supabase
    .from("medications")
    .insert({
      name: String(formData.get("name")).trim(),
      strength: String(formData.get("strength") ?? "").trim() || null,
      unit: String(formData.get("unit") ?? "").trim() || "units",
    })
    .select("id")
    .single();
  if (error || !med) return;

  await supabase.from("stock_levels").insert({
    medication_id: med.id,
    quantity: Number(formData.get("quantity")) || 0,
    low_threshold: Number(formData.get("low")) || 0,
    surplus_threshold: Number(formData.get("surplus")) || 0,
  });
  revalidatePath("/");
}

// Positive change = delivery in, negative = dispensed out.
export async function recordMovement(formData: FormData) {
  const medicationId = String(formData.get("medication_id"));
  const change = Number(formData.get("change"));
  if (!Number.isInteger(change) || change === 0) return;

  const supabase = await createClient();
  const { data: level } = await supabase
    .from("stock_levels")
    .select("quantity")
    .eq("medication_id", medicationId)
    .single();
  if (!level || level.quantity + change < 0) return;

  await supabase.from("stock_movements").insert({ medication_id: medicationId, change });
  await supabase
    .from("stock_levels")
    .update({ quantity: level.quantity + change, updated_at: new Date().toISOString() })
    .eq("medication_id", medicationId);
  revalidatePath("/");
}
