
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StyleSelectorProps {
  totalStyles: number;
  currentStyle: number;
  onChange: (style: number) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  totalStyles,
  currentStyle,
  onChange,
}) => {
  const handlePrev = () => {
    const newStyle = (currentStyle - 1 + totalStyles) % totalStyles;
    onChange(newStyle);
  };

  const handleNext = () => {
    const newStyle = (currentStyle + 1) % totalStyles;
    onChange(newStyle);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="option-button"
        onClick={handlePrev}
        aria-label="Previous style"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div className="text-xs text-center min-w-[2rem]">
        {currentStyle + 1} / {totalStyles}
      </div>
      <button
        className="option-button"
        onClick={handleNext}
        aria-label="Next style"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default StyleSelector;
