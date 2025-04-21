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
  label,
  style,
  color,
  isSelected,
  onClick,
  children
}: PartPreviewProps) => {
  return <button onClick={onClick} className={cn("flex flex-col items-center gap-2 p-4 rounded-lg border transition-all", isSelected ? "border-primary bg-accent" : "border-border hover:border-primary/50")}>
      <div className="w-16 h-16 flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center transform scale-50">
          {children}
        </div>
      </div>
      
    </button>;
};
export default PartPreview;