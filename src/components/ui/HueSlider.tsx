import React from 'react';
import { Slider } from './slider';

interface ColorListSliderProps {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
}

const ColorListSlider: React.FC<ColorListSliderProps> = ({ colors, value, onChange }) => {
  const currentIndex = colors.indexOf(value);

  const handleValueChange = (newIndex: number[]) => {
    const newColor = colors[newIndex[0]];
    if (newColor) {
      onChange(newColor);
    }
  };

  const generateBlockGradient = (colors: string[]) => {
    if (colors.length === 0) return 'none';
    if (colors.length === 1) return colors[0];

    let gradientString = 'linear-gradient(to right';
    const segmentWidth = 100 / colors.length;

    colors.forEach((color, index) => {
      const start = index * segmentWidth;
      const gradientStringPart = `, ${color} ${start}%, ${color} ${start + segmentWidth}%`;
      gradientString += gradientStringPart;
    });

    gradientString += ')';
    return gradientString;
  };

  const gradient = generateBlockGradient(colors);

  return (
    <Slider
      value={[currentIndex === -1 ? 0 : currentIndex]}
      max={colors.length - 1}
      step={1}
      onValueChange={handleValueChange}
      className="w-full h-6 rounded-sm py-6 px-1 cursor-pointer border-4"
      style={{ background: gradient }}
    />
  );
};

export default ColorListSlider;