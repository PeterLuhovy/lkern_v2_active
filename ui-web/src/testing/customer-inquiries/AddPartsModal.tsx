/*
 * ================================================================
 * SÚBOR: AddPartsModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/AddPartsModal.tsx
 * POPIS: Modal pre pridávanie dielov do dopytu zákazníka
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 09:50:00
 * ================================================================
 */

import React, { useState } from 'react';

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

  if (!isOpen) return null;

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

  const handleSave = () => {
    // Filter out parts that have at least name filled
    const validParts = parts.filter(part => part.name.trim() !== '');
    onSave(validParts);
    onClose();
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>

      <div style={{
        background: theme.cardBackground,
        borderRadius: '12px',
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: `1px solid ${theme.border}`
      }} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={{
          padding: '20px',
          borderBottom: `2px solid ${theme.border}`,
          background: theme.inputBackground
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: '700',
                color: theme.text
              }}>
                ⚙️ Pridať diely do dopytu
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                Špecifikácia súčiastok a komponentov ({parts.length} dielov)
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: theme.textMuted,
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PARTS LIST */}
        <div style={{ padding: '20px' }}>

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

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: `1px solid ${theme.border}`
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: theme.inputBackground,
                color: theme.text,
                border: `2px solid ${theme.border}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Zrušiť
            </button>

            <button
              onClick={handleSave}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>💾</span>
              Uložiť diely ({parts.filter(p => p.name.trim()).length})
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddPartsModal;