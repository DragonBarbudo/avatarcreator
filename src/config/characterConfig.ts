
import { CharacterPart, ColorPalette } from "../types/character";

// Define the available parts and how many style options each has
export const characterParts: CharacterPart[] = [
  {
    id: "hair",
    label: "Hair",
    options: 4,
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
    "#5E4E37", // Brown
    "#261F1D", // Dark Brown
    "#E8C498", // Blonde
    "#B7A890", // Light Brown
    "#A52A2A", // Auburn
    "#808080", // Gray
    "#000000", // Black
    "#E6CEA0", // Golden blonde
  ],
  face: [
    "#F5D0C2", // Light
    "#E0B0A0", // Medium
    "#C09285", // Tan
    "#A67B68", // Brown
    "#874C41", // Dark brown
    "#603A30", // Deep brown
  ],
  eyes: [
    "#3F5787", // Blue
    "#287F59", // Green
    "#694734", // Brown
    "#000000", // Black
    "#6F5A46", // Hazel
    "#867e71", // Gray
    "#9b87f5", // Purple
  ],
  mouth: [
    "#D46A6A", // Light pink
    "#C25353", // Medium pink
    "#A83C3C", // Dark pink
    "#8F2424", // Red
  ],
  shirt: [
    "#7E69AB", // Purple
    "#4C72B0", // Blue
    "#55A868", // Green
    "#C44E52", // Red
    "#8172B2", // Lavender
    "#CCB974", // Yellow
    "#64B5CD", // Light blue
    "#2A3D4F", // Navy
    "#000000", // Black
    "#FFFFFF", // White
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
