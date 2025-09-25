/*
 * ================================================================
 * SÚBOR: NewCompanyModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/NewCompanyModal.tsx
 * POPIS: Modal pre pridanie novej spoločnosti do zoznamu
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 09:45:00
 * ================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { useModalAnalytics } from './AnalyticsTracker';

interface NewCompanyData {
  name: string;
  type: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  contactPerson: string;
}

interface NewCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: NewCompanyData) => void;
  theme: any;
}

const NewCompanyModal: React.FC<NewCompanyModalProps> = ({ isOpen, onClose, onSave, theme }) => {
  const [formData, setFormData] = useState<NewCompanyData>({
    name: '',
    type: 'MANUFACTURING',
    country: 'Slovakia',
    city: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    contactPerson: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Analytics tracking
  const analytics = useModalAnalytics('NewCompanyModal');
  const sessionIdRef = useRef<string | null>(null);
  const [debugStartTime, setDebugStartTime] = useState<number>(0);
  const [debugElapsedTime, setDebugElapsedTime] = useState<string>('0s');

  // Analytics tracking useEffect
  useEffect(() => {
    if (isOpen && !sessionIdRef.current) {
      const startTime = Date.now();
      setDebugStartTime(startTime);

      sessionIdRef.current = analytics.startSession('NewCompanyModal');

      // Debug timer update
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor(elapsed / 1000);
        const ms = elapsed % 1000;
        setDebugElapsedTime(`${seconds}.${Math.floor(ms / 100)}s`);
      }, 100);

      return () => {
        clearInterval(timer);
      };
    } else if (!isOpen && sessionIdRef.current) {
      analytics.endSession(sessionIdRef.current, 'modal_closed');
      sessionIdRef.current = null;
      setDebugStartTime(0);
      setDebugElapsedTime('0s');
    }
  }, [isOpen, analytics]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSubmitting && formData.name.trim()) {
          handleSubmit(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, formData.name, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof NewCompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulácia uloženia
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
      onClose();

      // Reset form
      setFormData({
        name: '',
        type: 'MANUFACTURING',
        country: 'Slovakia',
        city: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        contactPerson: ''
      });
    }, 1000);
  };

  const copyModalName = async () => {
    try {
      await navigator.clipboard.writeText('NewCompanyModal');
    } catch (err) {
      console.log('Copy failed:', err);
    }
  };

  const companyTypes = [
    { value: 'MANUFACTURING', label: '🏭 Výrobná spoločnosť' },
    { value: 'AEROSPACE', label: '✈️ Letecký priemysel' },
    { value: 'AUTOMOTIVE', label: '🚗 Automobilový priemysel' },
    { value: 'DEFENSE', label: '🛡️ Obranný priemysel' },
    { value: 'ENERGY', label: '⚡ Energetika' },
    { value: 'MEDICAL', label: '🏥 Medicínske zariadenia' },
    { value: 'RESEARCH', label: '🔬 Výskum a vývoj' },
    { value: 'OTHER', label: '📦 Ostatné' }
  ];

  const countries = [
    'Slovakia', 'Czech Republic', 'Germany', 'Austria', 'Poland', 'Hungary',
    'Slovenia', 'Croatia', 'Switzerland', 'France', 'Italy', 'United Kingdom',
    'Netherlands', 'Belgium', 'Sweden', 'Denmark', 'Norway', 'Finland'
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
        border: `1px solid ${theme.border}`,
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>

        {/* DEBUG INFO */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          fontSize: '10px',
          color: '#666',
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 1000
        }}>
          <span>NewCompanyModal</span>
          <button
            onClick={copyModalName}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '3px',
              padding: '1px 4px',
              cursor: 'pointer',
              fontSize: '9px',
              color: '#666'
            }}
          >
            copy
          </button>
        </div>

        {/* DEBUG TIMER */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '10px',
          color: '#666',
          fontFamily: 'monospace',
          zIndex: 1000
        }}>
          {debugElapsedTime}
        </div>

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
                🏢 Nová spoločnosť
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                Pridať novú spoločnosť do zoznamu
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

          {/* Základné údaje */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              color: '#9c27b0',
              fontWeight: '600'
            }}>
              Základné údaje
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Názov spoločnosti *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
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
                placeholder="Napr. ŠKODA AUTO a.s."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Typ spoločnosti *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
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
                  {companyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
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
                  Krajina *
                </label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
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
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Adresa */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              color: '#3366cc',
              fontWeight: '600'
            }}>
              Adresa
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Mesto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
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
                  placeholder="Bratislava"
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
                  Kontaktná osoba *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
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
                  placeholder="Ing. Ján Novák"
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Adresa
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
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
                placeholder="Hlavná 123"
              />
            </div>
          </div>

          {/* Kontakt */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              color: '#f57c00',
              fontWeight: '600'
            }}>
              Kontaktné údaje
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  placeholder="kontakt@firma.sk"
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
                  Telefón
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
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
                  placeholder="+421 2 1234 5678"
                />
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Webstránka
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
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
                placeholder="https://www.firma.sk"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '20px',
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
              disabled={isSubmitting}
              style={{
                padding: '10px 24px',
                background: isSubmitting
                  ? '#999'
                  : 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
                  <span>💾</span>
                  Uložiť (Ctrl+Enter)
                </>
              )}
            </button>
          </div>
        </form>
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

export default NewCompanyModal;