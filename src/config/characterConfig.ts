import { CharacterConfig, CharacterPart } from "../types/character";

export const characterParts: CharacterPart[] = [
  { id: "eyes", label: "Eyes", options: 9, defaultColor: "#2F284C" },
  { id: "hair", label: "Hair", options: 23, defaultColor: "#482B79" },
  { id: "brows", label: "Eyebrows", options: 10, defaultColor: "#3A366F" },
  { id: "nose", label: "Nose", options: 11, defaultColor: "#D49677" },
  { id: "mouth", label: "Mouth", options: 17, defaultColor: "#8B4B7A" },
  { id: "face", label: "Face", options: 9, defaultColor: "#FADFC9" },
  { id: "shirt", label: "Shirt", options: 9, defaultColor: "#342059" },
  { id: "colors", label: "Colors", options: 6, defaultColor: "#2F284C" }
];

// Changeable colors configuration for easy modification
export const changeableColors = {
  hair: {
    label: "Color del Cabello",
    defaultColor: "#31A4C3",
    palette: [
      // Blues
      "#31A4C3", "#03bdea", "#45B7D1", "#54A0FF", "#4ECDC4",
      // Purples
      "#4d1aa8", "#5F27CD", "#FF9FF3", "#8E45A5",
      // Browns/Natural
      "#0D0817", "#8a5648", "#dcbe90", "#B87A3C",
      // Reds/Pinks
      "#ef7e7e", "#FF6B6B"
    ]
  },
  face: {
    label: "Color de la Cara",
    defaultColor: "#FBC59D",
    palette: [
      // Light skin tones
      "#FBC59D", "#FADFC9", "#F5DEB3", "#DEB887",
      // Medium skin tones
      "#F4C8AB", "#E5B091", "#D49677", "#CD853F",
      // Darker skin tones
      "#C68B59", "#B87A3C", "#A0522D", "#8B4513"
    ]
  },
  shirt: {
    label: "Color de la Ropa",
    defaultColor: "#8E45A5",
    palette: [
      // Purples
      "#8E45A5", "#4d1aa8", "#5F27CD", "#342059",
      // Blues
      "#03bdea", "#45B7D1", "#54A0FF", "#4ECDC4",
      // Greens
      "#96CEB4", "#10AC84",
      // Reds/Oranges
      "#ef7e7e", "#FF6B6B", "#EE5A24", "#FECA57",
      // Other colors
      "#8a5648", "#FF9FF3"
    ]
  }
};

export const colorPalettes = {
  eyes: ["#2F284C", "#13387f", "#343537", "#49041b", "#553110"],
  hair: changeableColors.hair.palette,
  brows: ["#3A366F", "#8B4B7A", "#2F284C", "#553110", "#342059"],
  nose: ["#D49677", "#FADFC9", "#F4C8AB", "#E5B091"],
  mouth: ["#8B4B7A", "#ef7e7e", "#D49677", "#553110"],
  face: changeableColors.face.palette,
  shirt: changeableColors.shirt.palette,
  colors: ["#2F284C", "#13387f", "#343537", "#49041b", "#553110", "#4d1aa8"]
};

export const defaultConfig: CharacterConfig = {
  eyes: { style: 0, color: colorPalettes.eyes[0] },
  hair: { frontStyle: 0, backStyle: 0, color: changeableColors.hair.defaultColor },
  brows: { style: 0, color: colorPalettes.brows[0] },
  nose: { style: 0, color: colorPalettes.nose[0] },
  mouth: { style: 0, color: colorPalettes.mouth[0] },
  face: { style: 0, color: changeableColors.face.defaultColor },
  shirt: { style: 0, color: changeableColors.shirt.defaultColor }
};
