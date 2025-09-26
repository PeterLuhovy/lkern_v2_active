/*
 * ================================================================
 * SÚBOR: DemoDesignSystemModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/DemoDesignSystemModal/DemoDesignSystemModal.tsx
 * POPIS: Demo modal pre ukážku nového design systému v ModalTemplate v2.0.0
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 23:35:00
 * ================================================================
 */

import React, { useState } from 'react';
import ModalTemplate, {
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton,
  FormGrid,
  FormSection,
  DESIGN_TOKENS
} from '../ModalTemplate';

interface DemoData {
  name: string;
  email: string;
  category: string;
  priority: string;
  description: string;
  quantity: number;
  unit: string;
  notes: string;
}

interface DemoDesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DemoData) => void;
  theme: any;
}

const DemoDesignSystemModal: React.FC<DemoDesignSystemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme
}) => {
  const [formData, setFormData] = useState<DemoData>({
    name: '',
    email: '',
    category: 'DESIGN',
    priority: 'normal',
    description: '',
    quantity: 1,
    unit: 'ks',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleInputChange = (field: keyof DemoData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setNotificationMessage(`✅ Design System Demo úspešne uložené: "${formData.name}"`);
      setShowNotification(true);

      setTimeout(() => {
        onSave(formData);
        setIsSubmitting(false);
        setShowNotification(false);
        onClose();

        // Reset form
        setFormData({
          name: '',
          email: '',
          category: 'DESIGN',
          priority: 'normal',
          description: '',
          quantity: 1,
          unit: 'ks',
          notes: ''
        });
      }, 1500);
    }, 800);
  };

  const categories = [
    { value: 'DESIGN', label: '🎨 Design System' },
    { value: 'FRONTEND', label: '💻 Frontend' },
    { value: 'BACKEND', label: '⚙️ Backend' },
    { value: 'UX', label: '👤 User Experience' },
    { value: 'API', label: '🔌 API Development' }
  ];

  const priorities = [
    { value: 'low', label: 'Nízka' },
    { value: 'normal', label: 'Normálna' },
    { value: 'high', label: 'Vysoká' },
    { value: 'urgent', label: 'Urgentná' }
  ];

  const units = ['ks', 'kg', 'm', 'm²', 'l', 'set'];

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      theme={theme}
      modalName="DemoDesignSystemModal"
      title="🚀 Design System Demo v2.0.0"
      subtitle="Ukážka nových Form komponentov s DESIGN_TOKENS"
      maxWidth="700px"
      showConfirmButton={!!formData.name.trim()}
      confirmText="💾 Uložiť demo (Ctrl+Enter)"
      isSubmitting={isSubmitting}
      showNotification={showNotification}
      notificationMessage={notificationMessage}
    >
      <div style={{ padding: DESIGN_TOKENS.spacing.xl }}>

        <FormSection title="📋 Základné informácie" theme={theme}>
          <FormGrid columns="two">
            <div>
              <FormLabel theme={theme} required>Názov projektu</FormLabel>
              <FormInput
                theme={theme}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Napr. Modal Design System v2.0"
              />
            </div>
            <div>
              <FormLabel theme={theme}>Email kontakt</FormLabel>
              <FormInput
                theme={theme}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="developer@lkern.sk"
              />
            </div>
          </FormGrid>
        </FormSection>

        <FormSection title="⚙️ Konfigurácia" theme={theme}>
          <FormGrid columns="two">
            <div>
              <FormLabel theme={theme} required>Kategória</FormLabel>
              <FormSelect
                theme={theme}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </FormSelect>
            </div>
            <div>
              <FormLabel theme={theme}>Priorita</FormLabel>
              <FormSelect
                theme={theme}
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                {priorities.map(prio => (
                  <option key={prio.value} value={prio.value}>{prio.label}</option>
                ))}
              </FormSelect>
            </div>
          </FormGrid>
        </FormSection>

        <FormSection title="📊 Technické detaily" theme={theme}>
          <div style={{ marginBottom: DESIGN_TOKENS.spacing.lg }}>
            <FormLabel theme={theme}>Popis funkcionality</FormLabel>
            <FormTextarea
              theme={theme}
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailný popis nového design systému s DESIGN_TOKENS, FormLabel, FormInput komponenty..."
            />
          </div>

          <FormGrid columns="nameQuantityUnit">
            <div>
              <FormLabel theme={theme}>Poznámky</FormLabel>
              <FormInput
                theme={theme}
                type="text"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Ďalšie poznámky..."
              />
            </div>
            <div>
              <FormLabel theme={theme}>Množstvo</FormLabel>
              <FormInput
                theme={theme}
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <FormLabel theme={theme}>Jednotka</FormLabel>
              <FormSelect
                theme={theme}
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </FormSelect>
            </div>
          </FormGrid>
        </FormSection>

        <FormSection title="🎯 Akcie" theme={theme}>
          <FormGrid columns="three">
            <FormButton theme={theme} variant="primary" type="button">
              ✅ Primary Button
            </FormButton>
            <FormButton theme={theme} variant="secondary" type="button">
              🔧 Secondary Button
            </FormButton>
            <FormButton theme={theme} variant="delete" type="button">
              🗑️ Delete Button
            </FormButton>
          </FormGrid>
        </FormSection>

        <div style={{
          background: theme.hoverBackground,
          border: `2px solid ${DESIGN_TOKENS.colors.feedback.info}`,
          borderRadius: DESIGN_TOKENS.borderRadius.card,
          padding: DESIGN_TOKENS.spacing.lg,
          marginTop: DESIGN_TOKENS.spacing.xl
        }}>
          <h4 style={{
            margin: `0 0 ${DESIGN_TOKENS.spacing.sm} 0`,
            fontSize: DESIGN_TOKENS.typography.fontSize.medium,
            fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
            color: DESIGN_TOKENS.colors.feedback.info
          }}>
            💡 Design System Features:
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: DESIGN_TOKENS.spacing.lg,
            fontSize: DESIGN_TOKENS.typography.fontSize.standard,
            color: theme.textMuted,
            lineHeight: '1.6'
          }}>
            <li><strong>DESIGN_TOKENS:</strong> Centralizované spacing, typography, colors</li>
            <li><strong>Form komponenty:</strong> FormLabel, FormInput, FormSelect, FormTextarea</li>
            <li><strong>Layout komponenty:</strong> FormGrid, FormSection</li>
            <li><strong>Button variants:</strong> primary, secondary, delete s konzistentným styling</li>
            <li><strong>Grid layouts:</strong> two, three, nameQuantityUnit columns</li>
            <li><strong>Responsive design:</strong> Automatické spacing a breakpoints</li>
          </ul>
        </div>

      </div>
    </ModalTemplate>
  );
};

export default DemoDesignSystemModal;