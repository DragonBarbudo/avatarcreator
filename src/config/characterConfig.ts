import { CharacterConfig } from "../types/character";

// Define the color lists for the sliders
export const hairColors = [
  "#2C1A1A", "#4A2C2C", "#6F4E37", "#8B5A2B", "#B85C38", "#F5DEB3", "#A9A9A9",
  "#F5F5DC", "#87CEEB", "#90EE90", "#DDA0DD", "#FF69B4", "#DB7093",
];
export const faceColors = [
  "#6F4E37", "#8B4513", "#A0522D", "#B87A3C", "#C68B59", "#CD853F", "#D49677",
  "#DEB887", "#E5B091", "#F4C8AB", "#F5DEB3", "#FBC59D", "#FADFC9",
];
export const shirtColors = [
  "#FFFFFF", "#E0E0E0", "#C0C0C0", "#A0A0A0", "#808080", "#606060", "#404040",
  "#202020", "#000000", "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF",
  "#0000FF", "#8B00FF", "#FF00FF", "#EE5A24", "#FF6B6B", "#FF9FF3", "#8E45A5",
  "#5F27CD", "#54A0FF", "#10AC84", "#FECA57",
];

// Changeable colors configuration for easy modification
export const changeableColors = {
  hair: {
    label: "Cabello",
    colors: hairColors,
  },
  face: {
    label: "Piel",
    colors: faceColors,
  },
  shirt: {
    label: "Ropa",
    colors: shirtColors,
  },
};

export const defaultConfig: CharacterConfig = {
  eyes: { style: 0, color: "#2F284C" },
  hair: { frontStyle: 0, backStyle: 0, color: hairColors[2] },
  brows: { style: 0, color: "#3A366F" },
  nose: { style: 0, color: "#D49677" },
  mouth: { style: 0, color: "#8B4B7A" },
  face: { style: 0, color: faceColors[12] },
  shirt: { style: 0, color: shirtColors[15] },
};

