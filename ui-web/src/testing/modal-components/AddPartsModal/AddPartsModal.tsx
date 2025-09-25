/*
 * ================================================================
 * SÚBOR: AddPartsModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/AddPartsModal/AddPartsModal.tsx
 * POPIS: Modal pre pridávanie dielov do dopytu zákazníka - kompletne migrovaný na ModalTemplate
 * VERZIA: v3.0.0
 * UPRAVENÉ: 2024-12-25 14:30:00
 * ================================================================
 */

import React, { useState } from 'react';
import ModalTemplate from '../ModalTemplate';
import './AddPartsModal.css';

interface Part {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  material: string;
  dimensions: string;
  tolerances: string;
  notes: string;
}

interface AddPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (parts: Part[]) => void;
  theme: any;
  initialParts: Part[];
}

const AddPartsModal: React.FC<AddPartsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme,
  initialParts = []
}) => {
  const [parts, setParts] = useState<Part[]>(
    initialParts.length > 0 ? initialParts : [createEmptyPart()]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  function createEmptyPart(): Part {
    return {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      unit: 'ks',
      material: '',
      dimensions: '',
      tolerances: '',
      notes: ''
    };
  }


  const handlePartChange = (partId: string, field: keyof Part, value: string | number) => {
    setParts(prev => prev.map(part =>
      part.id === partId ? { ...part, [field]: value } : part
    ));
  };

  const addPart = () => {
    setParts(prev => [...prev, createEmptyPart()]);
  };

  const removePart = (partId: string) => {
    if (parts.length > 1) {
      setParts(prev => prev.filter(part => part.id !== partId));
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    // Filter out parts that have at least name filled
    const validParts = parts.filter(part => part.name.trim() !== '');

    setNotificationMessage(`Uložených ${validParts.length} dielov`);
    setShowNotification(true);

    setTimeout(() => {
      onSave(validParts);
      setIsSubmitting(false);
      setShowNotification(false);
      onClose();
    }, 2000);
  };

  const units = ['ks', 'kg', 'm', 'm²', 'm³', 'l', 'set', 'pair'];
  const materials = [
    'Steel 1.4301',
    'Steel 1.4404',
    'Aluminum 6061-T6',
    'Aluminum 7075-T6',
    'Titanium Grade 2',
    'Titanium Grade 5',
    'Carbon Steel',
    'Stainless Steel',
    'Brass',
    'Copper',
    'Plastic POM',
    'Plastic PEEK',
    'Other'
  ];

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSave}
      theme={theme}
      modalName="AddPartsModal"
      title="📦 Správa dielov"
      subtitle="Pridávanie a úprava dielov v dopyte"
      maxWidth="800px"
      showConfirmButton={parts.some(part => part.name.trim() !== '')}
      confirmText="💾 Uložiť diely (Ctrl+Enter)"
      isSubmitting={isSubmitting}
      showNotification={showNotification}
      notificationMessage={notificationMessage}
    >
      {/* Content */}
      <div style={{ padding: '0' }}>
        <p style={{
          margin: '0 0 16px 0',
          fontSize: '14px',
          color: theme.textMuted
        }}>
          Špecifikácia súčiastok a komponentov ({parts.length} dielov)
        </p>

          {parts.map((part, index) => (
            <div key={part.id} style={{
              background: theme.hoverBackground,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>

              {/* Part Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  🔩 Diel #{index + 1}
                </h3>
                {parts.length > 1 && (
                  <button
                    onClick={() => removePart(part.id)}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    ✕ Odstrániť
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Názov dielu *
                  </label>
                  <input
                    type="text"
                    value={part.name}
                    onChange={(e) => handlePartChange(part.id, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Napr. Titanium Bracket"
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Množstvo
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={part.quantity}
                    onChange={(e) => handlePartChange(part.id, 'quantity', parseInt(e.target.value) || 1)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Jednotka
                  </label>
                  <select
                    value={part.unit}
                    onChange={(e) => handlePartChange(part.id, 'unit', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Popis
                </label>
                <textarea
                  value={part.description}
                  onChange={(e) => handlePartChange(part.id, 'description', e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: theme.inputBackground,
                    border: `1px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '13px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Detailný popis dielu, účel použitia..."
                />
              </div>

              {/* Technical Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Materiál
                  </label>
                  <select
                    value={part.material}
                    onChange={(e) => handlePartChange(part.id, 'material', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Vyberte materiál...</option>
                    {materials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Rozmery
                  </label>
                  <input
                    type="text"
                    value={part.dimensions}
                    onChange={(e) => handlePartChange(part.id, 'dimensions', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Napr. 100x50x25 mm"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Tolerancie
                  </label>
                  <input
                    type="text"
                    value={part.tolerances}
                    onChange={(e) => handlePartChange(part.id, 'tolerances', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Napr. ±0.05mm"
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    Poznámky
                  </label>
                  <input
                    type="text"
                    value={part.notes}
                    onChange={(e) => handlePartChange(part.id, 'notes', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Špecifické požiadavky..."
                  />
                </div>
              </div>

            </div>
          ))}

          {/* Add New Part Button */}
          <button
            onClick={addPart}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <span>➕</span>
            Pridať ďalší diel
          </button>

      </div>
    </ModalTemplate>
  );
};

export default AddPartsModal;