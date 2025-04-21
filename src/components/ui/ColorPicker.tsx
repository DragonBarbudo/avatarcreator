
import React from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => (
        <button
          key={color}
          className={`color-swatch ${selectedColor === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
