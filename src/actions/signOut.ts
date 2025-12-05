"use server";

import { createClient } from "@/utils/supabase/server";

export default async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
