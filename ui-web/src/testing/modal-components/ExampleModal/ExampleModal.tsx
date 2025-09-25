/*
 * ================================================================
 * SÚBOR: ExampleModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/ExampleModal/ExampleModal.tsx
 * POPIS: Príklad použitia ModalTemplate - jednoduchý modal
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 21:57:00
 * ================================================================
 */

import React, { useState } from 'react';
import ModalTemplate from '../ModalTemplate';
// import useModal from '../ModalTemplate/useModal';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string }) => void;
  theme: any;
}

const ExampleModal: React.FC<ExampleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme
}) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulácia async operácie
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
      // setIsCompleted(true);
      // Show success notification
      setShowNotification(true);

      // Both modal and notification close at EXACTLY the same time
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '' });
        setShowNotification(false);
        // setIsCompleted(false);
      }, 3000); // Exactly 3000ms to match notification auto-close
    }, 1000);
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      theme={theme}
      modalName="ExampleModal"
      title="🆕 Príklad Modal"
      subtitle="Ukážka použitia ModalTemplate"
      maxWidth="500px"
      isSubmitting={isSubmitting}
      confirmText="Uložiť (Ctrl+Enter)"
      cancelText="Zrušiť (Escape)"
      showNotification={showNotification}
      notificationMessage={`Dáta uložené: ${formData.name}${formData.email ? ` (${formData.email})` : ''}`}
    >
      {/* FORM CONTENT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '600',
            color: theme.text
          }}>
            Meno *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: theme.inputBackground,
              border: `2px solid ${theme.inputBorder}`,
              borderRadius: '6px',
              color: theme.text,
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            placeholder="Zadajte meno"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '600',
            color: theme.text
          }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: theme.inputBackground,
              border: `2px solid ${theme.inputBorder}`,
              borderRadius: '6px',
              color: theme.text,
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            placeholder="meno@email.sk"
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ExampleModal;