/*
 * ================================================================
 * SÚBOR: App.tsx
 * CESTA: /ui-web/src/App.tsx
 * POPIS: Hlavný App komponent L-KERN ERP systému - organizovaný s novým Testing Hub
 * VERZIA: v3.0.1
 * UPRAVENÉ: 2025-01-28 23:30:00
 * ================================================================
 */

import './App.css'
import { useState } from 'react'
import TestingDashboard from './testing'
import { COLORS } from './config/constants'

// === CONSTANTS ===

// L-KERN ERP sekcie s brand farbami
// Prečo: Centralizácia hlavných aplikačných sekcií a ich visual identity
// Kedy zmeniť: Pri pridávaní nových modulov alebo rebrandingu
const ERP_SECTIONS = {
  dashboard: {
    color: COLORS.brand.secondary,     // Modrá pre dashboard analytics
    status: 'V PRÍPRAVE'
  },
  orders: {
    color: COLORS.brand.primary,       // Fialová brand farba pre orders
    status: 'V PRÍPRAVE'
  },
  customers: {
    color: COLORS.status.success,      // Zelená pre customers (positive)
    status: 'V PRÍPRAVE'
  },
  parts: {
    color: COLORS.status.warning,      // Oranžová pre parts (attention)
    status: 'V PRÍPRAVE'
  },
  packing: {
    color: COLORS.status.info,         // Modrá pre packing (informational)
    status: 'V PRÍPRAVE'
  },
  delivery: {
    color: COLORS.brand.accent,        // Ružová accent pre delivery
    status: 'V PRÍPRAVE'
  },
  invoices: {
    color: COLORS.priority.rychla,     // Červeno-oranžová pre invoices (urgent)
    status: 'V PRÍPRAVE'
  }
} as const;



function App() {
  const [selectedSection, setSelectedSection] = useState<string>('');

  // === KOMPONENTY ===

  // ERP sekcie pre hlavný dashboard
  // Prečo: Centralizácia všetkých sekčných informácií
  // Kedy zmeniť: Pri pridávaní nových modulov
  const erpSections = [
    {
      id: 'dashboard',
      name: '📊 Dashboard',
      description: 'Prehľad a analytics',
      status: ERP_SECTIONS.dashboard.status,
      color: ERP_SECTIONS.dashboard.color
    },
    {
      id: 'orders',
      name: '📋 Orders',
      description: 'Správa objednávok',
      status: ERP_SECTIONS.orders.status,
      color: ERP_SECTIONS.orders.color
    },
    {
      id: 'customers',
      name: '👥 Customers',
      description: 'Databáza zákazníkov',
      status: ERP_SECTIONS.customers.status,
      color: ERP_SECTIONS.customers.color
    },
    {
      id: 'parts',
      name: '⚙️ Parts',
      description: 'Katalóg súčiastok',
      status: ERP_SECTIONS.parts.status,
      color: ERP_SECTIONS.parts.color
    },
    {
      id: 'packing',
      name: '📦 Packing',
      description: 'Balenie a expedícia',
      status: ERP_SECTIONS.packing.status,
      color: ERP_SECTIONS.packing.color
    },
    {
      id: 'delivery',
      name: '🚚 Delivery',
      description: 'Doručenie a logistika',
      status: ERP_SECTIONS.delivery.status,
      color: ERP_SECTIONS.delivery.color
    },
    {
      id: 'invoices',
      name: '💰 Invoices',
      description: 'Fakturácia a platby',
      status: ERP_SECTIONS.invoices.status,
      color: ERP_SECTIONS.invoices.color
    },
    {
      id: 'testing',
      name: '🧪 Testing',
      description: 'Organizované testovanie a vývoj',
      status: 'AKTÍVNE',
      color: '#E91E63'
    }
  ];

  // === HLAVNÁ LOGIKA ===

  // Ak je vybraná testing sekcia - zobraz nový organizovaný TestingHub
  if (selectedSection === 'testing') {
    return (
      <div>
        <TestingDashboard />
      </div>
    );
  }

  // Hlavný dashboard s ERP sekciami
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      {/* Main Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #9c27b0 0%, #3366cc 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px'
        }}>
          L-KERN ERP System
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Professional Manufacturing Enterprise Resource Planning
        </p>
      </div>

      {/* ERP Sections Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {erpSections.map((section) => (
          <div
            key={section.id}
            onClick={() => {
              if (section.id === 'testing') {
                setSelectedSection('testing');
              } else {
                alert(`${section.name} - ${section.status}`);
              }
            }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: section.id === 'testing' ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${section.id === 'testing' ? section.color : '#e2e8f0'}`,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              opacity: section.id === 'testing' ? 1 : 0.7
            }}
            onMouseEnter={(e) => {
              if (section.id === 'testing') {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = section.color;
              }
            }}
            onMouseLeave={(e) => {
              if (section.id === 'testing') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >

            {/* Section Icon a Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: section.id === 'testing' ? section.color : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  fontSize: '24px',
                  filter: section.id === 'testing' ? 'grayscale(0%)' : 'grayscale(100%)'
                }}>
                  {section.name.split(' ')[0]}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: section.id === 'testing' ? '#1e293b' : '#94a3b8',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  {section.name.split(' ').slice(1).join(' ')}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: section.id === 'testing' ? '#64748b' : '#94a3b8',
              fontWeight: '500',
              lineHeight: '1.4',
              marginBottom: '16px',
              flexGrow: 1
            }}>
              {section.description}
            </p>

            {/* Status Badge */}
            <div style={{
              padding: '6px 12px',
              background: section.id === 'testing' ? section.color : '#e2e8f0',
              color: section.id === 'testing' ? 'white' : '#94a3b8',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {section.status}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '48px',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#64748b',
          fontWeight: '500',
          margin: 0
        }}>
          🧪 <strong>Testing Hub</strong> je aktívny pre vývoj a testovanie komponentov.
          <br />
          Ostatné moduly sú v príprave pre produkčné nasadenie.
        </p>
      </div>
    </div>
  );
}

export default App;