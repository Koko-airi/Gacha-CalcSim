"use client";

import signOut from "@/actions/signOut";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      className="absolute font-semibold text-white top-4 right-4 cursor-pointer drop-shadow-emerald-700 drop-shadow-xs"
      onClick={() => {
        startTransition(async () => {
          await signOut();
          router.refresh();
        });
      }}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
