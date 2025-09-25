/*
 * ================================================================
 * SÚBOR: CustomerInquiryModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/CustomerInquiryModal/CustomerInquiryModal.tsx
 * POPIS: Modal komponent pre spracovanie dopytov od zákazníkov - clean ModalTemplate version
 * VERZIA: v5.0.0
 * UPRAVENÉ: 2024-12-25 14:30:00
 * ================================================================
 */

import React, { useState, useEffect } from 'react';
import NewCompanyModal from '../NewCompanyModal';
import SinglePartModal from '../SinglePartModal';
import MiniNotificationModal from '../MiniNotificationModal';
import ModalTemplate from '../ModalTemplate';
import './CustomerInquiryModal.css';

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
    hoverBackground: string;
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
  division: '01' | '02';
  company: string;
  inquiryType: string;
  priority: 'nizka' | 'normalna' | 'stredna' | 'rychla' | 'extra_rychla';
  parts: Part[];
}

const CustomerInquiryModal: React.FC<CustomerInquiryModalProps> = ({
  isOpen,
  onClose,
  theme
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
      name: 'Siemens Energy AG',
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
    },
    {
      id: '6',
      name: 'Boeing Commercial Airplanes',
      type: 'AEROSPACE',
      country: 'United States',
      city: 'Seattle',
      contactPerson: 'Michael Thompson',
      email: 'm.thompson@boeing.com',
      phone: '+1 206 544 2121'
    },
    {
      id: '7',
      name: 'Volkswagen Group',
      type: 'AUTOMOTIVE',
      country: 'Germany',
      city: 'Wolfsburg',
      contactPerson: 'Klaus Schmidt',
      email: 'k.schmidt@volkswagen.de',
      phone: '+49 5361 9 0'
    },
    {
      id: '8',
      name: 'General Electric Company',
      type: 'ENERGY',
      country: 'United States',
      city: 'Boston',
      contactPerson: 'Jennifer Davis',
      email: 'j.davis@ge.com',
      phone: '+1 617 443 3000'
    },
    {
      id: '9',
      name: 'Thales Group',
      type: 'DEFENSE',
      country: 'France',
      city: 'Paris',
      contactPerson: 'Philippe Dubois',
      email: 'p.dubois@thalesgroup.com',
      phone: '+33 1 57 77 80 00'
    },
    {
      id: '10',
      name: 'Medtronic plc',
      type: 'MEDICAL',
      country: 'Ireland',
      city: 'Dublin',
      contactPerson: 'Emma O\'Connor',
      email: 'e.oconnor@medtronic.com',
      phone: '+353 1 438 1700'
    }
  ]);

  const [formData, setFormData] = useState<InquiryFormData>({
    division: '02',
    company: '',
    inquiryType: 'CUSTOM_MANUFACTURING',
    priority: 'normalna',
    parts: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyFilter, setCompanyFilter] = useState('');
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
  const [showSinglePartModal, setShowSinglePartModal] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [partModalMode, setPartModalMode] = useState<'add' | 'edit'>('add');
  const [showNotification, setShowNotification] = useState(false);

  // Mini notification modal state
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  // Click outside handler for company dropdown
  useEffect(() => {
    if (!showCompanyDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const companyDropdown = target.closest('.company-dropdown-container');
      if (!companyDropdown) {
        setShowCompanyDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [showCompanyDropdown]);

  // Helper functions for notifications
  const showNotificationMessage = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    setNotification({ isOpen: true, type, title, message });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const handleInputChange = (field: keyof InquiryFormData, value: any) => {
    if (field === 'division') {
      // Pri zmene divízie resetuj typ dopytu na prvý dostupný
      const defaultInquiryType = value === '02' ? 'CUSTOM_MANUFACTURING' : 'GENERAL';

      setFormData(prev => ({
        ...prev,
        [field]: value,
        inquiryType: defaultInquiryType
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
    setCompanyFilter(newCompany.name);
    setShowCompanyDropdown(false);
    showNotificationMessage('success', 'Spoločnosť pridaná', `Spoločnosť "${companyData.name}" bola úspešne pridaná do zoznamu a vybraná pre tento dopyt.`);
  };

  const handleAddPart = () => {
    setPartModalMode('add');
    setEditingPart(null);
    setShowSinglePartModal(true);
  };

  const handleEditPart = (part: Part) => {
    setPartModalMode('edit');
    setEditingPart(part);
    setShowSinglePartModal(true);
  };

  const handleDeletePart = (partId: string) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.filter(p => p.id !== partId)
    }));
  };

  const handleSavePart = (partData: Part) => {
    if (partModalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        parts: [...prev.parts, partData]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        parts: prev.parts.map(p => p.id === partData.id ? partData : p)
      }));
    }
  };

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setFormData(prev => ({ ...prev, company: companyId }));
      setCompanyFilter(company.name);
      setShowCompanyDropdown(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.company) {
      return; // ModalTemplate will handle validation
    }

    setIsSubmitting(true);

    const selectedCompany = companies.find(c => c.id === formData.company);

    // Simulácia odoslania
    setTimeout(() => {
      console.log('Customer Inquiry submitted:', {
        ...formData,
        companyDetails: selectedCompany
      });
      setIsSubmitting(false);
      setShowNotification(true);

      // Close modal and notification together after 3 seconds
      setTimeout(() => {
        onClose();
        setShowNotification(false);
        setFormData({
          division: '02',
          company: '',
          inquiryType: 'CUSTOM_MANUFACTURING',
          priority: 'normalna',
          parts: []
        });
        setCompanyFilter('');
        setShowCompanyDropdown(false);
      }, 3000);
    }, 1000);
  };

  // Filtered companies for dropdown - alphabetically sorted
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companyFilter.toLowerCase()) ||
    company.city.toLowerCase().includes(companyFilter.toLowerCase()) ||
    company.country.toLowerCase().includes(companyFilter.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name, 'sk'));

  // Typy dopytu podľa divízie
  const getInquiryTypesByDivision = (division: '01' | '02') => {
    const commonTypes = [
      { value: 'GENERAL', label: '📋 Všeobecný dopyt' },
      { value: 'QUOTATION', label: '💰 Cenová ponuka' },
      { value: 'TECHNICAL', label: '🔧 Technická konzultácia' },
      { value: 'COMPLAINT', label: '⚠️ Reklamácia' },
      { value: 'SUPPORT', label: '🆘 Technická podpora' }
    ];

    if (division === '01') {
      // LCVV - Commercial Vehicle & Logistics
      return [
        ...commonTypes,
        { value: 'LOGISTICS', label: '🚚 Doprava a logistika' },
        { value: 'FLEET_MANAGEMENT', label: '🚛 Správa vozového parku' },
        { value: 'VEHICLE_PARTS', label: '🔧 Náhradné diely pre vozidlá' },
        { value: 'TRANSPORT_SOLUTIONS', label: '📦 Dopravné riešenia' },
        { value: 'WAREHOUSE_EQUIPMENT', label: '📋 Skladové vybavenie' }
      ];
    } else {
      // LIND - Industrial Defence
      return [
        ...commonTypes,
        { value: 'CUSTOM_MANUFACTURING', label: '⚙️ Výroba dielov na zákazku' },
        { value: 'DEFENSE_COMPONENTS', label: '🛡️ Obranné komponenty' },
        { value: 'PRECISION_MACHINING', label: '🔩 Presné obrábanie' },
        { value: 'QUALITY_ASSURANCE', label: '✅ Kontrola kvality' },
        { value: 'MATERIAL_TESTING', label: '🔬 Testovanie materiálov' },
        { value: 'CERTIFICATION', label: '📜 Certifikácia produktov' }
      ];
    }
  };

  const inquiryTypes = getInquiryTypesByDivision(formData.division);

  // Priority zo starého projektu
  const priorityOptions = [
    { value: 'nizka', label: 'Nízka priorita (21 dní)', color: '#388e3c' },
    { value: 'normalna', label: 'Normálna priorita (14 dní)', color: '#3366cc' },
    { value: 'stredna', label: 'Stredná priorita (7 dní)', color: '#f57c00' },
    { value: 'rychla', label: 'Rýchla priorita (2 dni)', color: '#f44336' },
    { value: 'extra_rychla', label: 'Extra rýchla (1 deň)', color: '#d32f2f' }
  ];

  // Divízia konfiguracia
  const divisionConfig = {
    '01': {
      name: 'LCVV',
      fullName: 'L-KERN Commercial Vehicle & Logistics',
      color: '#9c27b0',
      bgColor: '#9c27b020',
      icon: '🚛'
    },
    '02': {
      name: 'LIND',
      fullName: 'L-KERN Industrial Defence',
      color: '#f44336',
      bgColor: '#f4433620',
      icon: '⚔️'
    }
  };

  const selectedCompany = companies.find(c => c.id === formData.company);
  const currentDivision = divisionConfig[formData.division];

  return (
    <>
      <ModalTemplate
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={formData.company ? handleSubmit : undefined}
        theme={theme}
        modalName="CustomerInquiryModal"
        title={`${currentDivision.icon} Spracovanie dopytu zákazníka`}
        subtitle={`Prijatie a evidencia dopytu pre divíziu ${currentDivision.name}`}
        maxWidth="700px"
        showConfirmButton={!!formData.company}
        confirmText="📧 Odoslať dopyt (Ctrl+Enter)"
        isSubmitting={isSubmitting}
        showNotification={showNotification}
        notificationMessage={selectedCompany ? `Dopyt od spoločnosti "${selectedCompany.name}" bol úspešne prijatý a zaradený do spracovania pre divíziu ${currentDivision.name}.` : 'Dopyt bol úspešne odoslaný'}
      >
        {/* Divízia výber */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            color: currentDivision.color,
            fontWeight: '600'
          }}>
            {currentDivision.icon} Divízia
          </h3>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Vyberte divíziu *
            </label>
            <select
              required
              value={formData.division}
              onChange={(e) => handleInputChange('division', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: currentDivision.bgColor,
                border: `2px solid ${currentDivision.color}`,
                borderRadius: '6px',
                color: theme.text,
                fontSize: '14px',
                fontWeight: '600',
                boxSizing: 'border-box'
              }}
            >
              {Object.entries(divisionConfig).map(([code, config]) => (
                <option key={code} value={code}>
                  {config.icon} {code} - {config.name} ({config.fullName})
                </option>
              ))}
            </select>

            {/* Division Info */}
            <div style={{
              marginTop: '8px',
              padding: '8px 0px',
              background: 'transparent',
              fontSize: '12px',
              color: theme.textMuted
            }}>
              <strong style={{ color: currentDivision.color }}>
                {currentDivision.icon} {currentDivision.fullName}
              </strong>
              <br />
              {formData.division === '01'
                ? 'Špecializácia na komerčné vozidlá, logistiku a dopravu'
                : 'Špecializácia na priemyselné a obranné komponenty'}
            </div>
          </div>
        </div>

        {/* Spoločnosť s filtrom */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            color: currentDivision.color,
            fontWeight: '600'
          }}>
            Spoločnosť zákazníka
          </h3>

          <div className="company-dropdown-container" style={{ position: 'relative', marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Vyberte spoločnosť *
            </label>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                required={!formData.company}
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  setShowCompanyDropdown(true);
                }}
                onFocus={() => setShowCompanyDropdown(true)}
                onBlur={(e) => {
                  // Delay hiding to allow clicking on dropdown items
                  setTimeout(() => {
                    if (!e.currentTarget.contains(document.activeElement)) {
                      setShowCompanyDropdown(false);
                    }
                  }, 150);
                }}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '6px',
                  color: theme.text,
                  fontSize: '14px'
                }}
                placeholder="Začnite písať názov spoločnosti..."
              />

              <button
                type="button"
                onClick={() => setShowNewCompanyModal(true)}
                style={{
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}
              >
                + Nová firma
              </button>
            </div>

            {/* Company Dropdown */}
            {showCompanyDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: theme.cardBackground,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {filteredCompanies.length > 0 ? filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    style={{
                      padding: '12px',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${theme.border}`,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.hoverBackground;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: '2px'
                    }}>
                      {company.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textMuted
                    }}>
                      {company.city}, {company.country} • {company.contactPerson}
                    </div>
                  </div>
                )) : (
                  <div style={{
                    padding: '12px',
                    fontSize: '14px',
                    color: theme.textMuted,
                    textAlign: 'center'
                  }}>
                    Žiadne výsledky pre "{companyFilter}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Company Info */}
          {selectedCompany && (
            <div style={{
              background: theme.hoverBackground,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              padding: '12px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text,
                marginBottom: '6px'
              }}>
                ✅ Vybratá spoločnosť: {selectedCompany.name}
              </div>
              <div style={{ fontSize: '12px', color: theme.textMuted, lineHeight: '1.4' }}>
                📍 {selectedCompany.city}, {selectedCompany.country}<br/>
                👤 {selectedCompany.contactPerson}<br/>
                {selectedCompany.email && <>📧 {selectedCompany.email}<br/></>}
                {selectedCompany.phone && <>📞 {selectedCompany.phone}</>}
              </div>
            </div>
          )}
        </div>

        {/* Detaily dopytu */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            color: currentDivision.color,
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
                  padding: '10px 12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '6px',
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
                  padding: '10px 12px',
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: '6px',
                  color: theme.text,
                  fontSize: '14px'
                }}
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Diely */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Špecifikácia dielov
            </label>

            <button
              type="button"
              onClick={handleAddPart}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
              }}
            >
              <span>➕</span>
              Pridať nový diel
            </button>

            {/* Parts List with Edit/Delete */}
            {formData.parts.length > 0 && (
              <div style={{
                marginTop: '12px',
                background: theme.hoverBackground,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: '12px'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: theme.text,
                  marginBottom: '12px'
                }}>
                  📋 Pridané diely ({formData.parts.length}):
                </div>

                {formData.parts.map((part, index) => (
                  <div key={part.id} style={{
                    background: theme.inputBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: theme.text,
                        marginBottom: '2px'
                      }}>
                        {index + 1}. {part.name}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: theme.textMuted,
                        lineHeight: '1.3'
                      }}>
                        {part.quantity} {part.unit}
                        {part.material && ` • ${part.material}`}
                        {part.dimensions && ` • ${part.dimensions}`}
                      </div>
                      {part.description && (
                        <div style={{
                          fontSize: '11px',
                          color: theme.textMuted,
                          fontStyle: 'italic',
                          marginTop: '2px'
                        }}>
                          {part.description}
                        </div>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '4px'
                    }}>
                      <button
                        type="button"
                        onClick={() => handleEditPart(part)}
                        style={{
                          padding: '4px 8px',
                          background: '#3366cc',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                        title="Upraviť diel"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePart(part.id)}
                        style={{
                          padding: '4px 8px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                        title="Zmazať diel"
                      >
                        🗑️ Del
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ModalTemplate>

      {/* Sub-modals */}
      <NewCompanyModal
        isOpen={showNewCompanyModal}
        onClose={() => setShowNewCompanyModal(false)}
        onSave={handleNewCompany}
        theme={theme}
      />

      <SinglePartModal
        isOpen={showSinglePartModal}
        onClose={() => setShowSinglePartModal(false)}
        onSave={(partData: any) => handleSavePart(partData as Part)}
        theme={theme}
        editPart={editingPart as any}
        mode={partModalMode}
      />

      {/* Mini Notification Modal */}
      <MiniNotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        theme={theme}
      />
    </>
  );
};

export default CustomerInquiryModal;