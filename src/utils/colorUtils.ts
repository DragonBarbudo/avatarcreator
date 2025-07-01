/**
 * Darkens a hex color by a specified percentage
 * @param color - Hex color string (e.g., "#FF0000")
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export const darkenColor = (color: string, percent: number = 20): string => {
  // Remove the hash if present
  const hex = color.replace('#', '');
  
  // Parse the hex color
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Darken each component
  const darkenedR = Math.max(0, Math.floor(r * (100 - percent) / 100));
  const darkenedG = Math.max(0, Math.floor(g * (100 - percent) / 100));
  const darkenedB = Math.max(0, Math.floor(b * (100 - percent) / 100));
  
  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
};