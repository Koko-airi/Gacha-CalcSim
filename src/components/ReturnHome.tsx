"use client";

import transition from "@/lib/transition";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReturnHome() {
  const router = useRouter();

  return (
    <button
      onClick={() => transition(router, "/", "calculator-page")}
      className="hover:bg-transparent cursor-pointer text-gray-100 drop-shadow-sm drop-shadow-gray-200/40 absolute z-20 top-2 transition-transform duration-200 hover:scale-105"
    >
      <ArrowLeft className="size-6" />
    </button>
  );
}
