
import React from 'react';
import { cn } from '@/lib/utils';

interface PartPreviewProps {
  label: string;
  style: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PartPreview = ({
  isSelected,
  onClick,
  children
}: PartPreviewProps) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "aspect-square p-2 rounded-lg border transition-all",
        isSelected ? "border-primary bg-accent" : "border-border hover:border-primary/50"
      )}
    >
      <div className="w-full h-full flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center transform scale-75">
          {children}
        </div>
      </div>
    </button>
  );
};

export default PartPreview;
