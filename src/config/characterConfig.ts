
import { CharacterConfig, CharacterPart } from "../types/character";

export const characterParts: CharacterPart[] = [
  { id: "face", label: "Face", options: 7 },
  { id: "hair", label: "Hair", options: 9 },
  { id: "eyes", label: "Eyes", options: 4 },
  { id: "mouth", label: "Mouth", options: 4 },
  { id: "shirt", label: "Shirt", options: 3 }
];

export const colorPalettes = {
  face: ["#FADFC9", "#F4C8AB", "#E5B091", "#D49677"],
  hair: ["#482B79", "#2F1D52", "#1A112E", "#0D0817"],
  eyes: ["#2F284C", "#1F1B32", "#0F0D19", "#000000"],
  mouth: ["#3A366F", "#262247", "#131124", "#000000"],
  shirt: ["#342059", "#673692", "#4D2582", "#281340"]
};

export const defaultConfig: CharacterConfig = {
  face: { style: 0, color: colorPalettes.face[0] },
  hair: { style: 0, color: colorPalettes.hair[0] },
  eyes: { style: 0, color: colorPalettes.eyes[0] },
  mouth: { style: 0, color: colorPalettes.mouth[0] },
  shirt: { style: 0, color: colorPalettes.shirt[0] }
};
