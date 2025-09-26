/*
 * ================================================================
 * SÚBOR: useModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/ModalTemplate/useModal.tsx
 * POPIS: Custom hook pre správu modal state a lifecycle
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 21:55:00
 * ================================================================
 */

import { useState } from 'react';

interface UseModalOptions {
  onClose?: () => void;
  onConfirm?: () => void;
}

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  confirm: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
}

export const useModal = (options: UseModalOptions = {}): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = () => {
    setIsOpen(true);
    setIsSubmitting(false);
  };

  const close = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      if (options.onClose) {
        options.onClose();
      }
    }
  };

  const confirm = () => {
    if (!isSubmitting && options.onConfirm) {
      options.onConfirm();
    }
  };

  return {
    isOpen,
    open,
    close,
    confirm,
    isSubmitting,
    setIsSubmitting
  };
};

export default useModal;