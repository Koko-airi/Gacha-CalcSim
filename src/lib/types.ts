// Types and constants used across the application

// Gacha Calculator Types \\

interface PullSlot {
  id: string;
  type: SlotType;
  current: CharacterCurrent | WeaponCurrent;
  target: CharacterTarget | WeaponTarget;
}

type SlotType = "Character" | "Weapon";

type CharacterCurrent = "None" | "c0" | "c1" | "c2" | "c3" | "c4" | "c5";
type CharacterTarget = "c0" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
type WeaponCurrent = "None" | "r1" | "r2" | "r3" | "r4";
type WeaponTarget = "r1" | "r2" | "r3" | "r4" | "r5";
