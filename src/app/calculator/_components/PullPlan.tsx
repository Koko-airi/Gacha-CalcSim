"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Plus, X } from "lucide-react";
import { figtree } from "@/lib/fonts";
import usePullPlan from "@/hooks/usePullPlan";

const CHAR_CURRENTS: CharacterCurrent[] = [
  "None",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
];
const CHAR_TARGETS: CharacterTarget[] = [
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
];
const WEAPON_CURRENTS: WeaponCurrent[] = ["None", "r1", "r2", "r3", "r4"];
const WEAPON_TARGETS: WeaponTarget[] = ["r1", "r2", "r3", "r4", "r5"];

export default function PullPlan({
  pullPlanState,
}: {
  pullPlanState: ReturnType<typeof usePullPlan>;
}) {
  const [
    slots,
    addSlot,
    removeSlot,
    duplicateSlot,
    updateSlotType,
    updateSlotCurrent,
    updateSlotTarget,
  ] = pullPlanState;

  return (
    <div className="space-y-4">
      <h3 className={`text-2xl font-bold ${figtree.className}`}>Pull Plan</h3>

      {/* 5 Star Selector */}
      <Select defaultValue="5star">
        <SelectTrigger className="h-14">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {/* Only one value for now */}
          <SelectItem value="5star">
            <span className="text-yellow-400">★★★★★</span>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Slots */}
      <div className="space-y-3 mt-4">
        {slots.map(slot => (
          <div key={slot.id} className="flex items-center gap-2">
            {/* Character Icon */}
            <div className="size-12 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-2xl">
                {slot.type === "Character" ? "👤" : "⚔️"}
              </span>
            </div>

            {/* Type Selector */}
            <Select
              value={slot.type}
              onValueChange={value =>
                updateSlotType(slot.id, value as SlotType)
              }
            >
              <SelectTrigger className="h-12 flex-1 border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Character">Character</SelectItem>
                <SelectItem value="Weapon">Weapon</SelectItem>
              </SelectContent>
            </Select>

            {/* Current Current Selector */}
            <Select
              value={slot.current}
              onValueChange={value => updateSlotCurrent(slot.id, value)}
            >
              <SelectTrigger className="h-12 w-24 border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {slot.type === "Character"
                  ? CHAR_CURRENTS.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))
                  : WEAPON_CURRENTS.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>

            {/* Arrow */}
            <span className="text-muted-foreground">→</span>

            {/* Target Current Selector */}
            <Select
              value={slot.target}
              onValueChange={value => updateSlotTarget(slot.id, value)}
            >
              <SelectTrigger className="h-12 w-24 border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {slot.type === "Character"
                  ? CHAR_TARGETS.map(option => {
                      // Only render options higher than current
                      if (
                        slot.current === "None" ||
                        Number(slot.current.slice(1)) < Number(option.slice(1))
                      ) {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      }
                      // else if (
                      //   Number(slot.current.slice(1)) >= Number(slot.target.slice(1))
                      // )
                      //   updateSlotTarget(
                      //     slot.id,
                      //     `c${Number(slot.current.slice(1)) + 1}`
                      //   );
                    })
                  : WEAPON_TARGETS.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>

            {/* Duplicate Button */}
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0 bg-card/50 cursor-pointer border-2 hidden sm:flex"
              onClick={() => duplicateSlot(slot.id)}
            >
              <Copy className="h-4 w-4" />
            </Button>

            {/* Remove Button */}
            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 shrink-0 cursor-pointer"
              onClick={() => removeSlot(slot.id)}
              disabled={slots.length === 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Slot Button */}
      <Button
        variant="outline"
        size="lg"
        className="w-full h-12 border-2 border-dashed bg-transparent"
        onClick={addSlot}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Reward
      </Button>
    </div>
  );
}
