
import React from "react";
import { Icon } from "@iconify/react";

interface SaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isLoading }) => {
  return (
    <button 
      onClick={onSave}
      disabled={isLoading} 
      className=" top-2 right-2 save-button"
    >
      <Icon icon="mingcute:check-2-fill" width="16" />
      <span className="text-md">Actualizar avatar</span>
    </button>
  );
};

export default SaveButton;
