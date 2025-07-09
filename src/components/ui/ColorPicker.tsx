
import React from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors = [],
  selectedColor,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {colors.map((color) => (
        <button
  key={color}
  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-4 ring-inset ring-4 ring-white' : 'border-transparent'}`}
  style={{
    backgroundColor: color,
    borderColor: selectedColor === color ? color : 'transparent',
  }}
  onClick={() => onChange(color)}
  aria-label={`Select color ${color}`}
/>
      ))}
    </div>
  );
};

export default ColorPicker;
