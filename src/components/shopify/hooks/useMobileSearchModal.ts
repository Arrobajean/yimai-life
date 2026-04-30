import { useEffect, useCallback } from "react";

interface UseMobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UseMobileSearchModalReturn {
  handleEscape: (e: KeyboardEvent) => void;
}

export const useMobileSearchModal = ({
  isOpen,
  onClose,
}: UseMobileSearchModalProps): UseMobileSearchModalReturn => {
  // Cerrar con Escape
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  // Manejar teclas y scroll del body
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return {
    handleEscape,
  };
};
