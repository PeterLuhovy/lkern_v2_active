/*
 * ================================================================
 * SÚBOR: ManufacturingTechnologyModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/ManufacturingTechnologyModal.tsx
 * POPIS: Modal pre výber technológií výroby dielov
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 11:00:00
 * ================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { useModalAnalytics } from './AnalyticsTracker';

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

  // Analytics tracking
  const analytics = useModalAnalytics('ManufacturingTechnologyModal');
  const sessionIdRef = useRef<string | null>(null);
  const [debugStartTime, setDebugStartTime] = useState<number>(0);
  const [debugElapsedTime, setDebugElapsedTime] = useState<string>('0s');

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();

        // End analytics tracking with cancelled outcome
        if (sessionIdRef.current) {
          analytics.endTracking('cancelled');
          sessionIdRef.current = null;
        }

        onClose();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSubmitting) {
          handleSubmit(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Start/end analytics tracking
  useEffect(() => {
    if (isOpen && !sessionIdRef.current) {
      sessionIdRef.current = analytics.startTracking();
      setDebugStartTime(Date.now());
    } else if (!isOpen && sessionIdRef.current) {
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
      setDebugStartTime(0);
      setDebugElapsedTime('0s');
    }
  }, [isOpen, analytics]);

  // Debug timer
  useEffect(() => {
    if (!isOpen || debugStartTime === 0) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - debugStartTime;
      const seconds = Math.floor(elapsed / 1000);
      const milliseconds = elapsed % 1000;
      setDebugElapsedTime(`${seconds}.${Math.floor(milliseconds / 100)}s`);
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, debugStartTime]);

  // Click tracking
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      analytics.trackClick(event);
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        analytics.trackInput(`${target.tagName.toLowerCase()}${target.type ? `[${target.type}]` : ''}`);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('input', handleInput);
    };
  }, [isOpen, analytics]);

  if (!isOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // End analytics tracking with confirmed outcome
    if (sessionIdRef.current) {
      analytics.endTracking('confirmed');
      sessionIdRef.current = null;
    }

    setTimeout(() => {
      onSave(selectedTechnologies);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const groupedTechnologies = availableTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof availableTechnologies>);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>    {/* Removed onClick={onClose} - no click outside to close */}

      <div style={{
        background: theme.cardBackground,
        borderRadius: '12px',
        maxWidth: '800px',
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
          background: theme.inputBackground,
          position: 'relative'
        }}>
          {/* Debug info */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '10px',
            color: '#999',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>ManufacturingTechnologyModal</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('ManufacturingTechnologyModal');
                console.log('📋 Copied: ManufacturingTechnologyModal');
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '8px',
                color: '#999',
                padding: '1px 2px',
                opacity: 0.5
              }}
              title="Copy modal name"
            >
              📋
            </button>
          </div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '10px',
            color: '#999',
            opacity: 0.7,
            fontFamily: 'monospace'
          }}>
            {debugElapsedTime}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '700',
                color: theme.text
              }}>
                🏭 Technológie výroby
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                ManufacturingTechnologyModal - Výber výrobných technológií
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

        {/* CONTENT */}
        <div style={{ padding: '20px' }}>

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

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: `1px solid ${theme.border}`
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                background: theme.inputBackground,
                color: theme.text,
                border: `2px solid ${theme.border}`,
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              Zrušiť (Escape)
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                padding: '10px 24px',
                background: isSubmitting
                  ? '#999'
                  : 'linear-gradient(135deg, #f57c00, #e65100)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'cursor',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '140px',
                justifyContent: 'center'
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    animation: 'spin 1s linear infinite',
                    fontSize: '16px'
                  }}>⟳</span>
                  Ukladám...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Uložiť technológie ({selectedTechnologies.length}) (Ctrl+Enter)
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ManufacturingTechnologyModal;