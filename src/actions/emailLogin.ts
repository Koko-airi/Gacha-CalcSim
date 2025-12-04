"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function emailLogin(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  console.log(email);

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
    },
  });

  redirect("/login/success");
}
