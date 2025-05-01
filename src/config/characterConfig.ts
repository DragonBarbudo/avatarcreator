
import { CharacterConfig, CharacterPart } from "../types/character";

export const characterParts: CharacterPart[] = [
  { id: "face", label: "Face", options: 5, defaultColor: "#FADFC9" },
  { id: "hair", label: "Hair", options: 9, defaultColor: "#482B79" },
  { id: "eyes", label: "Eyes", options: 9, defaultColor: "#2F284C" },
  { id: "mouth", label: "Mouth", options: 9, defaultColor: "#3A366F" },
  { id: "shirt", label: "Shirt", options: 3, defaultColor: "#342059" }
];

export const colorPalettes = {
  face: ["#FADFC9", "#F4C8AB", "#E5B091", "#D49677"],
  hair: ["#4d1aa8", "#03bdea", "#ef7e7e", "#0D0817", "#8a5648", "#dcbe90"],
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
