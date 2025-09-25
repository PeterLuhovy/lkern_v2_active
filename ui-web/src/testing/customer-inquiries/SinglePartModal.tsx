/*
 * ================================================================
 * SÚBOR: SinglePartModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/SinglePartModal.tsx
 * POPIS: Modal pre pridanie/editáciu jedného dielu
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 10:30:00
 * ================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import ManufacturingTechnologyModal from './ManufacturingTechnologyModal';
import { useModalAnalytics } from './AnalyticsTracker';

interface Technology {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  notes: string;
}

interface Part {
  id: string;
  type: 'PRT' | 'ASM'; // Part or Assembly
  customerPartNumber: string;
  customerPartName: string;
  internalPartNumber: string;
  internalPartName: string;
  quantity: number;
  unit: string;
  priority: 'nizka' | 'normalna' | 'stredna' | 'rychla' | 'extra_rychla';
  notes: string;
  technologies: Technology[];
}

interface SinglePartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (part: Part) => void;
  theme: any;
  editPart?: Part | null;
  mode: 'add' | 'edit';
}

const SinglePartModal: React.FC<SinglePartModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme,
  editPart,
  mode
}) => {
  const [partData, setPartData] = useState<Part>({
    id: '',
    type: 'PRT',
    customerPartNumber: '',
    customerPartName: '',
    internalPartNumber: '',
    internalPartName: '',
    quantity: 1,
    unit: 'ks',
    priority: 'normalna',
    notes: '',
    technologies: []
  });

  const [isManufacturingTechOpen, setIsManufacturingTechOpen] = useState(false);
  const [autoGenerateInternal, setAutoGenerateInternal] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Analytics tracking
  const analytics = useModalAnalytics('SinglePartModal');
  const sessionIdRef = useRef<string | null>(null);
  const [debugStartTime, setDebugStartTime] = useState<number>(0);
  const [debugElapsedTime, setDebugElapsedTime] = useState<string>('0s');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Start analytics tracking
      sessionIdRef.current = analytics.startTracking();
      setDebugStartTime(Date.now());
      if (mode === 'edit' && editPart) {
        setPartData(editPart);
      } else {
        setPartData({
          id: Date.now().toString(),
          type: 'PRT',
          customerPartNumber: '',
          customerPartName: '',
          internalPartNumber: '',
          internalPartName: '',
          quantity: 1,
          unit: 'ks',
          priority: 'normalna',
          notes: '',
          technologies: []
        });
        setAutoGenerateInternal(true);
        setSelectedFiles([]);
      }
    } else if (sessionIdRef.current) {
      // Modal closed - end tracking with cancelled (default)
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
      setDebugStartTime(0);
      setDebugElapsedTime('0s');
    }
  }, [isOpen, mode, editPart, analytics]);

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

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isManufacturingTechOpen) {
          // Nech ManufacturingTechnologyModal spracuje Escape
          return;
        }
        e.preventDefault();
        e.stopPropagation();

        // End analytics tracking with cancelled outcome
        if (sessionIdRef.current) {
          analytics.endTracking('cancelled');
          sessionIdRef.current = null;
        }

        onClose();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        if (isManufacturingTechOpen) return;
        e.preventDefault();
        e.stopPropagation();
        if (!isSubmitting && partData.customerPartName.trim() && partData.internalPartName.trim()) {
          handleSubmit(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, partData.customerPartName, partData.internalPartName, isManufacturingTechOpen, onClose]);

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

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.tagName === 'BUTTON') {
        analytics.trackFocus(`${target.tagName.toLowerCase()}${target.type ? `[${target.type}]` : ''}`);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [isOpen, analytics]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Part, value: string | number) => {
    console.log(`[DEBUG] handleInputChange: ${field} = ${value}`);
    if (field === 'customerPartName' && autoGenerateInternal) {
      // Auto-generate internal part number based on customer part name
      const generated = `INT-${Date.now().toString().slice(-6)}-${value.toString().replace(/\s+/g, '').slice(0, 6).toUpperCase()}`;
      console.log(`[DEBUG] Generated internal number: ${generated}`);
      setPartData(prev => ({ ...prev, [field]: value, internalPartNumber: generated }));
    } else {
      setPartData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleTechnologiesSave = (technologies: Technology[]) => {
    setPartData(prev => ({ ...prev, technologies }));
    setIsManufacturingTechOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // At least one of customer or internal part name must be filled
    if (!partData.customerPartName.trim() && !partData.customerPartNumber.trim() && !partData.internalPartName.trim()) {
      alert('Vyplňte aspoň jedno z polí: Zákaznické číslo dielu, Zákaznický názov dielu, alebo Interný názov dielu');
      return;
    }

    setIsSubmitting(true);

    // End analytics tracking with confirmed outcome
    if (sessionIdRef.current) {
      analytics.endTracking('confirmed');
      sessionIdRef.current = null;
    }

    // Simulácia uloženia
    setTimeout(() => {
      onSave(partData);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const units = ['ks', 'kg', 'm', 'm²', 'm³', 'l', 'set', 'pair'];
  const priorities = [
    { value: 'nizka', label: 'Nízka priorita' },
    { value: 'normalna', label: 'Normálna priorita' },
    { value: 'stredna', label: 'Stredná priorita' },
    { value: 'rychla', label: 'Rýchla priorita' },
    { value: 'extra_rychla', label: 'Extra rýchla priorita' }
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
    }}>    {/* Removed onClick={onClose} - no click outside to close */}

      <div style={{
        background: theme.cardBackground,
        borderRadius: '12px',
        maxWidth: '600px',
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
            <span>SinglePartModal</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('SinglePartModal');
                console.log('📋 Copied: SinglePartModal');
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
                {mode === 'add' ? '⚙️ Pridať diel' : '✏️ Upraviť diel'}
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                {mode === 'add' ? 'Špecifikácia nového dielu' : 'Upraviť parametre dielu'}
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

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>

          {/* Typ dielu */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Typ dielu *
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleInputChange('type', 'PRT')}
                style={{
                  padding: '10px 20px',
                  background: partData.type === 'PRT'
                    ? 'linear-gradient(135deg, #4CAF50, #2E7D32)'
                    : theme.inputBackground,
                  color: partData.type === 'PRT' ? 'white' : theme.text,
                  border: `2px solid ${partData.type === 'PRT' ? '#4CAF50' : theme.inputBorder}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🔧 Díel (PRT)
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('type', 'ASM')}
                style={{
                  padding: '10px 20px',
                  background: partData.type === 'ASM'
                    ? 'linear-gradient(135deg, #FF9800, #F57C00)'
                    : theme.inputBackground,
                  color: partData.type === 'ASM' ? 'white' : theme.text,
                  border: `2px solid ${partData.type === 'ASM' ? '#FF9800' : theme.inputBorder}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🧩 Zostava (ASM)
              </button>
            </div>
          </div>

          {/* Zákaznické údaje */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Zákaznické číslo dielu
              </label>
              <input
                type="text"
                value={partData.customerPartNumber}
                onChange={(e) => handleInputChange('customerPartNumber', e.target.value)}
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
                placeholder="Napr. CUS-001-BRK"
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
                Zákaznický názov dielu *
              </label>
              <input
                type="text"
                required
                value={partData.customerPartName}
                onChange={(e) => handleInputChange('customerPartName', e.target.value)}
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
                placeholder="Napr. Titanium Bracket"
              />
            </div>
          </div>

          {/* Interné údaje */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text,
                  marginRight: '8px'
                }}>
                  Interné číslo dielu *
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: theme.textMuted,
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={!autoGenerateInternal}
                    onChange={(e) => setAutoGenerateInternal(!e.target.checked)}
                    style={{ marginRight: '4px' }}
                  />
                  Upraviť manuálne
                </label>
              </div>
              <input
                type="text"
                required
                disabled={autoGenerateInternal}
                value={partData.internalPartNumber}
                onChange={(e) => handleInputChange('internalPartNumber', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: autoGenerateInternal ? '#f0f0f0' : theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '6px',
                  color: autoGenerateInternal ? '#999' : theme.text,
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Automaticky generované"
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
                Interný názov dielu *
              </label>
              <input
                type="text"
                required
                value={partData.internalPartName}
                onChange={(e) => handleInputChange('internalPartName', e.target.value)}
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
                placeholder="Interný názov pre výrobu"
              />
            </div>
          </div>

          {/* Množstvo, jednotka a priorita */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Množstvo *
              </label>
              <input
                type="number"
                min="1"
                required
                value={partData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
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
                Jednotka
              </label>
              <select
                value={partData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
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
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Priorita dielu
              </label>
              <select
                value={partData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
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
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Technológie výroby */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Technológie výroby ({partData.technologies.length})
              </label>
              <button
                type="button"
                onClick={() => setIsManufacturingTechOpen(true)}
                style={{
                  padding: '6px 12px',
                  background: 'linear-gradient(135deg, #f57c00, #e65100)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                🏭 Pridať technológie
              </button>
            </div>

            {partData.technologies.length > 0 && (
              <div style={{
                maxHeight: '150px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: '8px'
              }}>
                {partData.technologies.map((tech, index) => (
                  <div key={tech.id} style={{
                    padding: '8px',
                    background: theme.hoverBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: theme.text, fontWeight: '600' }}>
                        {index + 1}. {tech.name}
                      </span>
                      <span style={{ color: theme.textMuted }}>
                        {tech.estimatedTime && `⏱️ ${tech.estimatedTime}`}
                      </span>
                    </div>
                    {tech.notes && (
                      <div style={{ color: theme.textMuted, marginTop: '2px' }}>
                        {tech.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Súbory - výkresy, plány */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Súbory - výkresy, plány ({selectedFiles.length})
              </label>
              <label style={{
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                📁 Pridať súbory
                <input
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.step,.stp,.igs,.iges,.jpg,.jpeg,.png,.bmp,.tiff"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div style={{
                maxHeight: '120px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: '8px'
              }}>
                {selectedFiles.map((file, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    background: theme.hoverBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px'
                  }}>
                    <div>
                      <span style={{ color: theme.text, fontWeight: '600' }}>
                        📄 {file.name}
                      </span>
                      <span style={{ color: theme.textMuted, marginLeft: '8px' }}>
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      style={{
                        padding: '2px 6px',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Poznámky */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Poznámky
            </label>
            <textarea
              value={partData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: theme.inputBackground,
                border: `2px solid ${theme.inputBorder}`,
                borderRadius: '6px',
                color: theme.text,
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              placeholder="Špecifické požiadavky a poznámky k dielu..."
            />
          </div>

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
              type="submit"
              disabled={isSubmitting || (!partData.customerPartName.trim() && !partData.customerPartNumber.trim() && !partData.internalPartName.trim())}
              style={{
                padding: '10px 24px',
                background: isSubmitting || (!partData.customerPartName.trim() && !partData.customerPartNumber.trim() && !partData.internalPartName.trim())
                  ? '#999'
                  : 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting || (!partData.customerPartName.trim() && !partData.customerPartNumber.trim() && !partData.internalPartName.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '120px',
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
                  <span>{mode === 'add' ? '➕' : '💾'}</span>
                  {mode === 'add' ? 'Pridať diel' : 'Uložiť zmeny'} (Ctrl+Enter)
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Manufacturing Technology Modal */}
      <ManufacturingTechnologyModal
        isOpen={isManufacturingTechOpen}
        onClose={() => setIsManufacturingTechOpen(false)}
        onSave={handleTechnologiesSave}
        theme={theme}
        initialTechnologies={partData.technologies}
        partType={partData.type}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SinglePartModal;