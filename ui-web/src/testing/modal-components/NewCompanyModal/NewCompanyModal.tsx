/*
 * ================================================================
 * SÚBOR: NewCompanyModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/NewCompanyModal/NewCompanyModal.tsx
 * POPIS: Modal pre pridanie novej spoločnosti do zoznamu - migrovaný na ModalTemplate
 * VERZIA: v3.0.0
 * UPRAVENÉ: 2024-12-25 14:30:00
 * ================================================================
 */

import React, { useState } from 'react';
import ModalTemplate from '../ModalTemplate';
import './NewCompanyModal.css';

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleInputChange = (field: keyof NewCompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Simulácia uloženia
    setTimeout(() => {
      setNotificationMessage(`Spoločnosť "${formData.name}" bola úspešne pridaná do zoznamu.`);
      setShowNotification(true);

      setTimeout(() => {
        onSave(formData);
        setIsSubmitting(false);
        setShowNotification(false);
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
      }, 2000);
    }, 1000);
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
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      theme={theme}
      modalName="NewCompanyModal"
      title="🏢 Pridanie novej spoločnosti"
      subtitle="Zadajte základné informácie o novej spoločnosti"
      maxWidth="600px"
      showConfirmButton={!!formData.name.trim()}
      confirmText="💾 Pridať spoločnosť (Ctrl+Enter)"
      isSubmitting={isSubmitting}
      showNotification={showNotification}
      notificationMessage={notificationMessage}
    >

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

    </ModalTemplate>
  );
};

export default NewCompanyModal;