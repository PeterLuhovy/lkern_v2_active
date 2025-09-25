/*
 * ================================================================
 * SÚBOR: TestCustomerInquiries.tsx
 * CESTA: /ui-web/src/testing/modal-components/TestCustomerInquiries/TestCustomerInquiries.tsx
 * POPIS: Testovacia stránka pre všetky modal komponenty - refaktorovaná na novú štruktúru
 * VERZIA: v2.0.0
 * UPRAVENÉ: 2024-09-25 23:50:00
 * ================================================================
 */

import React, { useState } from 'react';
import CustomerInquiryModal from '../CustomerInquiryModal';
import ExampleModal from '../ExampleModal';
import SinglePartModal from '../SinglePartModal';
import ManufacturingTechnologyModal from '../ManufacturingTechnologyModal';
import NewCompanyModal from '../NewCompanyModal';
import AddPartsModal from '../AddPartsModal';
import DemoDesignSystemModal from '../DemoDesignSystemModal';

const TestCustomerInquiries: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);
  const [isSinglePartModalOpen, setIsSinglePartModalOpen] = useState(false);
  const [isManufacturingTechModalOpen, setIsManufacturingTechModalOpen] = useState(false);
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);
  const [isAddPartsModalOpen, setIsAddPartsModalOpen] = useState(false);
  const [isDemoDesignSystemModalOpen, setIsDemoDesignSystemModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme colors - skopírované z OrdersVariant2
  const theme = {
    light: {
      background: '#f2f3f7',
      cardBackground: '#ffffff',
      text: '#222222',
      textSecondary: '#495057',
      textMuted: '#666',
      border: '#dee2e6',
      headerBackground: '#d5d6dd',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      inputBackground: '#f2f3f7',
      inputBorder: '#dee2e6',
      hoverBackground: '#f8f9fa'
    },
    dark: {
      background: '#1a1a1a',
      cardBackground: '#2d2d2d',
      text: '#e0e0e0',
      textSecondary: '#b0b0b0',
      textMuted: '#888',
      border: '#404040',
      headerBackground: '#383838',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      inputBackground: '#4a4a4a',
      inputBorder: '#666666',
      hoverBackground: '#404040'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: "'Segoe UI', sans-serif",
      padding: '2rem',
      transition: 'background-color 0.3s ease'
    }}>
      {/* HEADER */}
      <div style={{
        background: currentTheme.cardBackground,
        padding: '20px',
        marginBottom: '2rem',
        border: `1px solid ${currentTheme.border}`,
        borderLeft: '6px solid #9c27b0',
        borderRadius: '8px',
        boxShadow: currentTheme.shadow,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              color: currentTheme.text
            }}>
              🧪 Customer Inquiries Testing
            </h1>
            <div style={{
              fontSize: '14px',
              color: '#9c27b0',
              fontWeight: '600',
              marginTop: '4px'
            }}>
              Testovacia stránka pre modal spracovania dopytov zákazníkov
            </div>
          </div>

          {/* Dark/Light mode toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '14px' }}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
            <div
              onClick={toggleDarkMode}
              style={{
                width: '50px',
                height: '24px',
                borderRadius: '12px',
                background: isDarkMode ? '#3366cc' : '#9c27b0',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                border: `1px solid ${isDarkMode ? '#2c5aa0' : '#6a1b9a'}`
              }}
              title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '1px',
                left: isDarkMode ? '27px' : '1px',
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        background: currentTheme.cardBackground,
        border: `1px solid ${currentTheme.border}`,
        borderLeft: '6px solid #3366cc',
        borderRadius: '8px',
        padding: '32px',
        marginBottom: '2rem',
        transition: 'all 0.3s ease',
        textAlign: 'center'
      }}>
        <h2 style={{
          margin: '0 0 16px 0',
          fontSize: '24px',
          fontWeight: '600',
          color: currentTheme.text
        }}>
          Spracovanie dopytov zákazníkov
        </h2>

        <p style={{
          margin: '0 0 32px 0',
          fontSize: '16px',
          color: currentTheme.textSecondary,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Kliknite na tlačidlo pre otvorenie modalu spracovania dopytov zákazníkov.
          Modal obsahuje formulár s údajmi zákazníka, detailmi dopytu a možnosťou nastavenia priority.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #6a1b9a, #4a148c)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(156, 39, 176, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #9c27b0, #6a1b9a)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(156, 39, 176, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>📝</span>
            <span>Customer Inquiry Modal</span>
          </button>

          <button
            onClick={() => setIsExampleModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>🎭</span>
            <span>ModalTemplate Test</span>
          </button>

          <button
            onClick={() => setIsSinglePartModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #F57C00, #E65100)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 152, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #FF9800, #F57C00)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 152, 0, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>⚙️</span>
            <span>Single Part Modal</span>
          </button>

          <button
            onClick={() => setIsManufacturingTechModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #f44336, #d32f2f)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #d32f2f, #b71c1c)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(244, 67, 54, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(244, 67, 54, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>🏭</span>
            <span>Manufacturing Tech</span>
          </button>

          <button
            onClick={() => setIsNewCompanyModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #3F51B5, #303F9F)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #303F9F, #1A237E)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(63, 81, 181, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3F51B5, #303F9F)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(63, 81, 181, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>🏢</span>
            <span>New Company Modal</span>
          </button>

          <button
            onClick={() => setIsAddPartsModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #607D8B, #455A64)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(96, 125, 139, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #455A64, #263238)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(96, 125, 139, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #607D8B, #455A64)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(96, 125, 139, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>📦</span>
            <span>Add Parts Modal</span>
          </button>

          <button
            onClick={() => setIsDemoDesignSystemModalOpen(true)}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #673AB7, #512DA8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(103, 58, 183, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #512DA8, #311B92)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(103, 58, 183, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #673AB7, #512DA8)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(103, 58, 183, 0.3)';
            }}
          >
            <span style={{ fontSize: '20px' }}>🚀</span>
            <span>Design System v2.0</span>
          </button>
        </div>
      </div>

      {/* INFO PANEL */}
      <div style={{
        background: currentTheme.cardBackground,
        border: `1px solid ${currentTheme.border}`,
        borderLeft: '6px solid #f57c00',
        borderRadius: '8px',
        padding: '24px',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: currentTheme.text,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>ℹ️</span> Informácie o testovaní
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          fontSize: '14px',
          color: currentTheme.textSecondary
        }}>
          <div>
            <h4 style={{
              margin: '0 0 8px 0',
              color: '#9c27b0',
              fontSize: '16px'
            }}>
              Funkcionalita modalu:
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '16px',
              lineHeight: '1.6'
            }}>
              <li>Formulár s údajmi zákazníka</li>
              <li>Výber typu dopytu (6 možností)</li>
              <li>Nastavenie priority</li>
              <li>Textové pole pre popis</li>
              <li>Validácia povinných polí</li>
              <li>Simulácia odosielania</li>
            </ul>
          </div>

          <div>
            <h4 style={{
              margin: '0 0 8px 0',
              color: '#3366cc',
              fontSize: '16px'
            }}>
              Styling:
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '16px',
              lineHeight: '1.6'
            }}>
              <li>Responsive dizajn</li>
              <li>Dark/Light mode podpora</li>
              <li>Konzistentné farby s ERP systémom</li>
              <li>Jednoduché CSS bez zložitých komponentov</li>
              <li>Hover efekty na tlačidlách</li>
              <li>Loading state pre odosielanie</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <CustomerInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={currentTheme}
        isDarkMode={isDarkMode}
      />

      <ExampleModal
        isOpen={isExampleModalOpen}
        onClose={() => setIsExampleModalOpen(false)}
        theme={currentTheme}
        onSave={(data) => {
          console.log('ExampleModal saved:', data);
        }}
      />

      <SinglePartModal
        isOpen={isSinglePartModalOpen}
        onClose={() => setIsSinglePartModalOpen(false)}
        onSave={(part) => {
          console.log('SinglePartModal saved:', part);
        }}
        theme={currentTheme}
        editPart={null}
        mode="add"
      />

      <ManufacturingTechnologyModal
        isOpen={isManufacturingTechModalOpen}
        onClose={() => setIsManufacturingTechModalOpen(false)}
        onSave={(technologies) => {
          console.log('ManufacturingTechnologyModal saved:', technologies);
        }}
        theme={currentTheme}
        initialTechnologies={[]}
        partType="PRT"
      />

      <NewCompanyModal
        isOpen={isNewCompanyModalOpen}
        onClose={() => setIsNewCompanyModalOpen(false)}
        onSave={(company) => {
          console.log('NewCompanyModal saved:', company);
        }}
        theme={currentTheme}
      />

      <AddPartsModal
        isOpen={isAddPartsModalOpen}
        onClose={() => setIsAddPartsModalOpen(false)}
        onSave={(parts) => {
          console.log('AddPartsModal saved:', parts);
        }}
        theme={currentTheme}
        initialParts={[]}
      />

      <DemoDesignSystemModal
        isOpen={isDemoDesignSystemModalOpen}
        onClose={() => setIsDemoDesignSystemModalOpen(false)}
        onSave={(data) => {
          console.log('DemoDesignSystemModal saved:', data);
        }}
        theme={currentTheme}
      />
    </div>
  );
};

export default TestCustomerInquiries;