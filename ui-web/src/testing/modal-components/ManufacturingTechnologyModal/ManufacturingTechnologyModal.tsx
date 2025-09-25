/*
 * ================================================================
 * SÚBOR: ManufacturingTechnologyModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/ManufacturingTechnologyModal/ManufacturingTechnologyModal.tsx
 * POPIS: Modal pre výber technológií výroby dielov - migrovaný na ModalTemplate
 * VERZIA: v3.0.0
 * UPRAVENÉ: 2024-12-25 14:30:00
 * ================================================================
 */

import React, { useState } from 'react';
import ModalTemplate from '../ModalTemplate';
import './ManufacturingTechnologyModal.css';

interface Technology {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  notes: string;
}

interface ManufacturingTechnologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (technologies: Technology[]) => void;
  theme: any;
  initialTechnologies: Technology[];
  partType?: 'PRT' | 'ASM';
}

const ManufacturingTechnologyModal: React.FC<ManufacturingTechnologyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme,
  initialTechnologies = [],
  partType = 'PRT'
}) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>(initialTechnologies);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const availableTechnologies = [
    { value: 'LASER_CUTTING', label: '🔥 Rezanie laserom', category: 'Cutting' },
    { value: 'PLASMA_CUTTING', label: '⚡ Rezanie plazmou', category: 'Cutting' },
    { value: 'WATERJET_CUTTING', label: '💧 Rezanie vodným lúčom', category: 'Cutting' },
    { value: 'SHEET_BENDING', label: '📐 Ohýbanie plechov', category: 'Forming' },
    { value: 'TUBE_BENDING', label: '🔄 Ohýbanie rúrok', category: 'Forming' },
    { value: 'DRILLING', label: '🔩 Vŕtanie', category: 'Machining' },
    { value: 'MILLING', label: '⚙️ Frézovanie', category: 'Machining' },
    { value: 'TURNING', label: '🔄 Sústruženie', category: 'Machining' },
    { value: 'WELDING_TIG', label: '⚡ Zvárame TIG', category: 'Welding' },
    { value: 'WELDING_MIG', label: '⚡ Zvárame MIG/MAG', category: 'Welding' },
    { value: 'SPOT_WELDING', label: '🔸 Bodové zváranie', category: 'Welding' },
    { value: 'ASSEMBLY', label: '🔧 Montáž', category: 'Assembly' },
    { value: 'SURFACE_TREATMENT', label: '🎨 Povrchová úprava', category: 'Finishing' },
    { value: 'POWDER_COATING', label: '🎨 Práškové lakovanie', category: 'Finishing' },
    { value: 'ANODIZING', label: '⚡ Eloxovanie', category: 'Finishing' }
  ];

  const handleAddTechnology = (techValue: string) => {
    const tech = availableTechnologies.find(t => t.value === techValue);
    if (!tech) return;

    const newTechnology: Technology = {
      id: Date.now().toString(),
      name: tech.label,
      description: `${tech.category} technológia`,
      estimatedTime: '',
      notes: ''
    };

    setSelectedTechnologies(prev => [...prev, newTechnology]);
  };

  const handleUpdateTechnology = (id: string, field: keyof Technology, value: string) => {
    setSelectedTechnologies(prev => prev.map(tech =>
      tech.id === id ? { ...tech, [field]: value } : tech
    ));
  };

  const handleRemoveTechnology = (id: string) => {
    setSelectedTechnologies(prev => prev.filter(tech => tech.id !== id));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setNotificationMessage(`Uložené ${selectedTechnologies.length} výrobných technológií`);
    setShowNotification(true);

    setTimeout(() => {
      onSave(selectedTechnologies);
      setIsSubmitting(false);
      setShowNotification(false);
      onClose();
    }, 1500);
  };

  const groupedTechnologies = availableTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof availableTechnologies>);

  const getSubtitle = () => {
    if (partType === 'PRT') {
      return `Diely (PRT) - Výber výrobných technológií pre súčiastky`;
    } else {
      return `Zostavy (ASM) - Výber výrobných technológií pre zostavy`;
    }
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      theme={theme}
      modalName="ManufacturingTechnologyModal"
      title="🏭 Technológie výroby dielov"
      subtitle={getSubtitle()}
      maxWidth="800px"
      showConfirmButton={true}
      confirmText="💾 Uložiť technológie (Ctrl+Enter)"
      isSubmitting={isSubmitting}
      showNotification={showNotification}
      notificationMessage={notificationMessage}
    >

      {/* Add Technology Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          margin: '0 0 12px 0',
          fontSize: '16px',
          color: '#4CAF50',
          fontWeight: '600'
        }}>
          Dostupné technológie
        </h3>

        {Object.entries(groupedTechnologies).map(([category, techs]) => (
          <div key={category} style={{ marginBottom: '16px' }}>
            <h4 style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: theme.textMuted,
              fontWeight: '600'
            }}>
              {category}:
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {techs.map(tech => (
                <button
                  key={tech.value}
                  type="button"
                  onClick={() => handleAddTechnology(tech.value)}
                  disabled={selectedTechnologies.some(st => st.name === tech.label)}
                  style={{
                    padding: '6px 12px',
                    background: selectedTechnologies.some(st => st.name === tech.label)
                      ? '#e0e0e0'
                      : '#4CAF50',
                    color: selectedTechnologies.some(st => st.name === tech.label)
                      ? '#999'
                      : 'white',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: selectedTechnologies.some(st => st.name === tech.label)
                      ? 'not-allowed'
                      : 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tech.label} {selectedTechnologies.some(st => st.name === tech.label) && '✓'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Technologies */}
      {selectedTechnologies.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            color: '#f57c00',
            fontWeight: '600'
          }}>
            Vybrané technológie ({selectedTechnologies.length})
          </h3>

          {selectedTechnologies.map((tech, index) => (
            <div key={tech.id} style={{
              background: theme.hoverBackground,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <h4 style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  {index + 1}. {tech.name}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(tech.id)}
                  style={{
                    padding: '4px 8px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  🗑️ Odstrániť
                </button>
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
                    Odhadovaný čas
                  </label>
                  <input
                    type="text"
                    value={tech.estimatedTime}
                    onChange={(e) => handleUpdateTechnology(tech.id, 'estimatedTime', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '12px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Napr. 2 hodiny, 30 min"
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
                    value={tech.notes}
                    onChange={(e) => handleUpdateTechnology(tech.id, 'notes', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      background: theme.inputBackground,
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '4px',
                      color: theme.text,
                      fontSize: '12px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Špecifické požiadavky..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </ModalTemplate>
  );
};

export default ManufacturingTechnologyModal;