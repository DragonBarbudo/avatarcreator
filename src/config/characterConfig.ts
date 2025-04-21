
import { CharacterPart, ColorPalette } from "../types/character";

// Define the available parts and how many style options each has
export const characterParts: CharacterPart[] = [
  {
    id: "hair",
    label: "Hair",
    options: 5, // Updated to 5 to include styles 0-4
    defaultColor: "#5E4E37",
  },
  {
    id: "face",
    label: "Face",
    options: 3,
    defaultColor: "#F5D0C2",
  },
  {
    id: "eyes",
    label: "Eyes",
    options: 4,
    defaultColor: "#3F5787",
  },
  {
    id: "mouth",
    label: "Mouth",
    options: 4,
    defaultColor: "#D46A6A",
  },
  {
    id: "shirt",
    label: "Shirt",
    options: 3,
    defaultColor: "#7E69AB",
  },
];

// Define color palettes for each part
export const colorPalettes: ColorPalette = {
  hair: [
    "#261F1D", // Black
    "#5E4E37", // Brown
    "#E8C498", // Blonde
    "#9b87f5", // Purple
    "#64B5CD", // Cyan
    "#808080", // Gray
  ],
  face: [
    "#F5D0C2", // Light skin
    "#E0B0A0", // Medium skin
    "#A67B68", // Brown skin
    "#603A30", // Dark brown skin
    "#E5DEFF", // Purple skin
    "#D3E4FD", // Cyan skin
  ],
  eyes: [
    "#3F5787", // Blue
    "#287F59", // Green
    "#694734", // Brown
    "#9b87f5", // Purple
    "#64B5CD", // Cyan
    "#867e71", // Gray
  ],
  mouth: [
    "#D46A6A", // Pink
    "#C25353", // Dark pink
    "#8F2424", // Red
    "#9b87f5", // Purple
    "#64B5CD", // Cyan
    "#867e71", // Gray
  ],
  shirt: [
    "#7E69AB", // Purple
    "#4C72B0", // Blue
    "#55A868", // Green
    "#C44E52", // Red
    "#2A3D4F", // Navy
    "#000000", // Black
  ],
};

// Define the default configuration
export const defaultConfig = {
  hair: {
    style: 0,
    color: "#5E4E37"
  },
  face: {
    style: 0,
    color: "#F5D0C2"
  },
  eyes: {
    style: 0,
    color: "#3F5787"
  },
  mouth: {
    style: 0,
    color: "#D46A6A"
  },
  shirt: {
    style: 0,
    color: "#7E69AB"
  }
};
