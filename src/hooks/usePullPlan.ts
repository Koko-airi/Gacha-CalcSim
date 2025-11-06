import { useState } from "react";

export default function usePullPlan() {
  const newSlot = (): PullSlot => ({
    id: crypto.randomUUID(),
    type: "Character",
    current: "None",
    target: "c0",
  });

  const [slots, setSlots] = useState<PullSlot[]>([newSlot()]);

  const addSlot = () => {
    setSlots([...slots, newSlot()]);
  };

  const removeSlot = (id: string) => {
    if (slots.length > 1) {
      setSlots(slots.filter(slot => slot.id !== id));
    }
  };

  const duplicateSlot = (id: string) => {
    const slotToDuplicate = slots.find(slot => slot.id === id);
    if (slotToDuplicate) {
      setSlots([
        ...slots,
        {
          ...slotToDuplicate,
          id: crypto.randomUUID(),
        },
      ]);
    }
  };

  const updateSlotType = (id: string, type: SlotType) => {
    setSlots(
      slots.map(slot =>
        slot.id === id
          ? {
              ...slot,
              type,
              current: "None",
              target: type === "Character" ? "c0" : "r1",
            }
          : slot
      )
    );
  };

  const updateSlotCurrent = (id: string, current: string) => {
    setSlots(
      slots.map(slot =>
        slot.id === id
          ? {
              ...slot,
              current: current as CharacterCurrent | WeaponCurrent,
              // Adjust target to be one above current if current >= target
              target:
                current !== "None" &&
                Number(current.slice(1)) >= Number(slot.target.slice(1))
                  ? (`${slot.type === "Character" ? "c" : "r"}${
                      Number(current.slice(1)) + 1
                    }` as CharacterTarget | WeaponTarget)
                  : slot.target,
            }
          : slot
      )
    );
  };

  const updateSlotTarget = (id: string, target: string) => {
    setSlots(
      slots.map(slot =>
        slot.id === id
          ? {
              ...slot,
              target: target as CharacterTarget | WeaponTarget,
            }
          : slot
      )
    );
  };

  return [
    slots,
    addSlot,
    removeSlot,
    duplicateSlot,
    updateSlotType,
    updateSlotCurrent,
    updateSlotTarget,
  ] as const;
}
