"use client";

import { Button } from "@/components/ui/button";
import transition from "@/lib/transition";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TransitionLogin() {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      className="absolute font-semibold text-white top-4 right-4 cursor-pointer drop-shadow-emerald-700 drop-shadow-xs"
      onClick={() => {
        transition(router, `/login`, "home-page");
      }}
    >
      <LogIn />
      Sign in to save your pulls!
    </Button>
  );
}
