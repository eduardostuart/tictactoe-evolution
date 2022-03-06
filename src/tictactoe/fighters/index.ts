import { HumanLarge, HumanMedium, HumanSmall } from "./human";
import { UndeadLarge, UndeadMedium, UndeadSmall } from "./undead";

export type Identifier = "human" | "undead" | "orc" | "demon";

export interface Fighter {
  identifier: Identifier;
  pieces: any[]; // TODO
}

export const human: Fighter = {
  identifier: "human",
  pieces: [HumanLarge, HumanMedium, HumanSmall],
};

export const undead: Fighter = {
  identifier: "undead",
  pieces: [UndeadLarge, UndeadMedium, UndeadSmall],
};

export const FIGHTERS = {
  human,
  undead,
  orc: undefined,
  demon: undefined,
  monster: undefined,
};
