
import React from "react";

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  isLoading: boolean;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColor,
  onColorChange,
  isLoading
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
            selectedColor === color
              ? "border-primary ring-2 ring-primary ring-offset-2"
              : "border-border"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          disabled={isLoading}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
