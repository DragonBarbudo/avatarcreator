import { CharacterConfig } from "../types/character";

// Changeable colors configuration for easy modification
export const changeableColors = {
  hair: {
    icon: "mingcute:hair-2-fill",
    label: "Cabello",
    defaultColor: "#8a5648", // Brown
    palette: [
      // Cafés
      "#2C1A1A", // Casi negro
      "#4A2C2C", // Oscuro
      "#6F4E37", // Medio
      "#8B5A2B", // Claro
      // Pelirojo
      "#B85C38",
      // Rubio
      "#F5DEB3",
      // Canoso
      "#A9A9A9", // Gris
      "#F5F5DC", // Blanco
      // Tonos de fantasía poco saturados
      "#87CEEB", // Azul cielo
      "#90EE90", // Verde claro
      "#DDA0DD", // Ciruela
    ]
  },
  face: {
    icon: "mingcute:face-fill",
    label: "Piel",
    defaultColor: "#FADFC9", // Lightest skin tone
    palette: [
      // Tonos de piel (oscuro a blanco)
      "#6F4E37", "#8B4513", "#A0522D", "#B87A3C", "#C68B59", "#CD853F", "#D49677", "#DEB887", "#E5B091", "#F4C8AB", "#F5DEB3", "#FBC59D", "#FADFC9",
      // Tonos rosados
      "#FFC0CB", "#FFB6C1", "#FFDAB9",
      // Tonos amarillos
      "#FFFACD", "#FAFAD2", "#FFFFE0",
    ]
  },
  shirt: {
    icon: "mingcute:t-shirt-fill",
    label: "Ropa",
    defaultColor: "#54A0FF", // Blue
    palette: [
      // Colores variados
      "#EE5A24", "#FF6B6B", "#ef7e7e", "#FF9FF3", "#8E45A5", "#5F27CD", "#4d1aa8", "#54A0FF", "#03bdea", "#45B7D1", "#342059", "#10AC84", "#4ECDC4", "#96CEB4", "#FECA57",
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
