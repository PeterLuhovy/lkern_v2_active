/*
 * ================================================================
 * SÚBOR: TestCustomerInquiries.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/TestCustomerInquiries.tsx
 * POPIS: Testovacia stránka pre Customer Inquiries modal - upravená z OrdersVariant2
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 09:20:00
 * ================================================================
 */

import React, { useState } from 'react';
import CustomerInquiryModal from './CustomerInquiryModal';

const TestCustomerInquiries: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            gap: '12px',
            margin: '0 auto'
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
          <span>Otvoriť Customer Inquiry Modal</span>
        </button>
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

      {/* MODAL */}
      <CustomerInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={currentTheme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default TestCustomerInquiries;