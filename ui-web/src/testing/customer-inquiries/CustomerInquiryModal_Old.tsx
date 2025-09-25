/*
 * ================================================================
 * SÚBOR: CustomerInquiryModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/CustomerInquiryModal.tsx
 * POPIS: Modal komponent pre spracovanie dopytov od zákazníkov - testovacia verzia
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 09:15:00
 * ================================================================
 */

import React, { useState } from 'react';
import NewCompanyModal from './NewCompanyModal';
import AddPartsModal from './AddPartsModal';

interface CustomerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    inputBackground: string;
    inputBorder: string;
  };
  isDarkMode: boolean;
}

interface Company {
  id: string;
  name: string;
  type: string;
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
}

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

interface InquiryFormData {
  company: string;
  inquiryType: string;
  priority: 'nizka' | 'normalna' | 'stredna' | 'rychla' | 'extra_rychla';
  parts: Part[];
}

const CustomerInquiryModal: React.FC<CustomerInquiryModalProps> = ({
  isOpen,
  onClose,
  theme,
  isDarkMode
}) => {
  // Predefinované spoločnosti
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'ŠKODA AUTO a.s.',
      type: 'AUTOMOTIVE',
      country: 'Czech Republic',
      city: 'Mladá Boleslav',
      contactPerson: 'Ing. Pavel Novák',
      email: 'p.novak@skoda-auto.cz',
      phone: '+420 326 811 111'
    },
    {
      id: '2',
      name: 'Airbus Defence and Space',
      type: 'AEROSPACE',
      country: 'Germany',
      city: 'Munich',
      contactPerson: 'Dr. Hans Mueller',
      email: 'hans.mueller@airbus.com',
      phone: '+49 89 607 0'
    },
    {
      id: '3',
      name: 'Lockheed Martin Corporation',
      type: 'DEFENSE',
      country: 'United States',
      city: 'Bethesda',
      contactPerson: 'John Smith',
      email: 'john.smith@lmco.com',
      phone: '+1 301 897 6000'
    },
    {
      id: '4',
      name: 'Siemens Energy',
      type: 'ENERGY',
      country: 'Germany',
      city: 'Munich',
      contactPerson: 'Dr. Anna Weber',
      email: 'anna.weber@siemens-energy.com',
      phone: '+49 89 636 00'
    },
    {
      id: '5',
      name: 'Johnson & Johnson Medical',
      type: 'MEDICAL',
      country: 'United States',
      city: 'New Brunswick',
      contactPerson: 'Sarah Johnson',
      email: 's.johnson@jnj.com',
      phone: '+1 732 524 0400'
    }
  ]);

  const [formData, setFormData] = useState<InquiryFormData>({
    company: '',
    inquiryType: 'GENERAL',
    priority: 'normalna',
    parts: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyFilter, setCompanyFilter] = useState('');
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
  const [showAddPartsModal, setShowAddPartsModal] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof InquiryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewCompany = (companyData: any) => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name: companyData.name,
      type: companyData.type,
      country: companyData.country,
      city: companyData.city,
      contactPerson: companyData.contactPerson,
      email: companyData.email || '',
      phone: companyData.phone || ''
    };

    setCompanies(prev => [...prev, newCompany]);
    setFormData(prev => ({ ...prev, company: newCompany.id }));
    alert(`✅ Spoločnosť "${companyData.name}" bola pridaná do zoznamu!`);
  };

  const handleAddParts = (parts: any[]) => {
    setFormData(prev => ({ ...prev, parts }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedCompany = companies.find(c => c.id === formData.company);

    // Simulácia odoslania
    setTimeout(() => {
      console.log('Customer Inquiry submitted:', {
        ...formData,
        companyDetails: selectedCompany
      });
      alert('Dopyt bol úspešne odoslaný!');
      setIsSubmitting(false);
      onClose();

      // Reset form
      setFormData({
        company: '',
        inquiryType: 'GENERAL',
        priority: 'normalna',
        parts: []
      });
      setCompanyFilter('');
    }, 1500);
  };

  // Filtered companies for dropdown
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companyFilter.toLowerCase()) ||
    company.city.toLowerCase().includes(companyFilter.toLowerCase()) ||
    company.country.toLowerCase().includes(companyFilter.toLowerCase())
  );

  const inquiryTypes = [
    { value: 'GENERAL', label: '📋 Všeobecný dopyt' },
    { value: 'QUOTATION', label: '💰 Cenová ponuka' },
    { value: 'TECHNICAL', label: '🔧 Technická konzultácia' },
    { value: 'COMPLAINT', label: '⚠️ Reklamácia' },
    { value: 'SUPPORT', label: '🆘 Technická podpora' },
    { value: 'PARTNERSHIP', label: '🤝 Obchodná spolupráca' },
    { value: 'CUSTOM_MANUFACTURING', label: '⚙️ Zákazkové súčiastky' },
    { value: 'QUALITY_ASSURANCE', label: '✅ Kontrola kvality' },
    { value: 'LOGISTICS', label: '🚚 Doprava a logistika' },
    { value: 'CERTIFICATION', label: '📜 Certifikácia produktov' }
  ];

  // Priority zo starého projektu - presne ako v objednávkach
  const priorityOptions = [
    { value: 'nizka', label: 'Nízka priorita (21 dní)', color: '#388e3c' },
    { value: 'normalna', label: 'Normálna priorita (14 dní)', color: '#3366cc' },
    { value: 'stredna', label: 'Stredná priorita (7 dní)', color: '#f57c00' },
    { value: 'rychla', label: 'Rýchla priorita (2 dni)', color: '#f44336' },
    { value: 'extra_rychla', label: 'Extra rýchla (1 deň)', color: '#d32f2f' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>

      <div style={{
        background: theme.cardBackground,
        borderRadius: '8px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
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
                fontSize: '24px',
                fontWeight: '700',
                color: theme.text
              }}>
                📝 Nový dopyt zákazníka
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                Vyplňte formulár pre odoslanie dopytu
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
                padding: '4px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.inputBackground;
                e.currentTarget.style.color = theme.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = theme.textMuted;
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>

          {/* Základné údaje zákazníka */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#9c27b0',
              fontWeight: '600'
            }}>
              Údaje zákazníka
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
                  Meno a priezvisko *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Ing. Ján Novák"
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
                  Spoločnosť *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Napr. ŠKODA AUTO a.s."
                />
              </div>
            </div>

            {/* Typ spoločnosti */}
            <div style={{ marginBottom: '16px' }}>
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
                value={formData.companyType}
                onChange={(e) => handleInputChange('companyType', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '4px',
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
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
                  Telefón
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dopyt */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#3366cc',
              fontWeight: '600'
            }}>
              Detaily dopytu
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
                  Typ dopytu *
                </label>
                <select
                  required
                  value={formData.inquiryType}
                  onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '14px'
                  }}
                >
                  {inquiryTypes.map(type => (
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
                  Priorita
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: theme.inputBackground,
                    border: `2px solid ${theme.inputBorder}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                Predmet dopytu *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '4px',
                  color: theme.text,
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Napríklad: Cenová ponuka na titanium komponenty"
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
                Popis dopytu *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '4px',
                  color: theme.text,
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                placeholder="Podrobný popis vášho dopytu, požiadaviek, špecifikácií...

Príklad pre výrobu:
- Typ súčiastky: Titanium komponenty pre leteckú techniku
- Množstvo: 500 kusov
- Materiál: Grade 5 titanium alloy
- Tolerancia: ±0.05mm
- Certifikácia: AS9100 požadovaná
- Termín dodania: Q2 2024

Príklad pre služby:
- Typ služby: Kontrola kvality existujúcich súčiastok
- Rozsah: 1000 kusov hydraulických komponentov
- Požadované testy: Tlakové testy do 350 bar
- Dokumentácia: Test certifikáty + protokoly
- Lokácia: Naše priestory / Vaše priestory"
              />
            </div>
          </div>

          {/* BUTTONS */}
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
                transition: 'all 0.2s ease',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = theme.border;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = theme.inputBackground;
                }
              }}
            >
              Zrušiť
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 24px',
                background: isSubmitting
                  ? '#999'
                  : 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '140px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6a1b9a, #4a148c)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #9c27b0, #6a1b9a)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    animation: 'spin 1s linear infinite',
                    fontSize: '16px'
                  }}>⟳</span>
                  Odesilám...
                </>
              ) : (
                <>
                  <span>📧</span>
                  Odoslať dopyt
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CustomerInquiryModal;