
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
        "aspect-square rounded-sm  transition-all",
        isSelected ? "bg-primary" : " hover:border-primary/50"
      )}
    >
      <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-sm overflow-hidden">
        <div className="w-full h-full flex items-center justify-center transform scale-90">
          {children}
        </div>
      </div>
    </button>
  );
};

export default PartPreview;
