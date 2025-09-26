/**
 * ================================================================
 * SÚBOR: index.tsx
 * CESTA: /ui-web/src/testing/index.tsx
 * POPIS: L-KERN Testing Dashboard - IDENTICKÉ ROZLOŽENIE AKO HLAVNÝ DASHBOARD
 * VERZIA: v2.3.0
 * UPRAVENÉ: 2025-01-28 23:45:00
 * ================================================================
 */

import React, { useState } from 'react';
import DesignExamples from './DashboardDesignExamples';
import ModalComponentsHub from '../../modals-examples';
import PagesDashboard from './DashboardTestPages';
import DebugBar from '../components/DebugBar/DebugBar';

type TestingSection = 'home' | 'design-examples' | 'modal-components' | 'pages-dashboard';

const TestingDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<TestingSection>('home');


  // Routing logic pre jednotlivé sekcie
  if (selectedSection === 'design-examples') {
    return (
      <div>
        <DebugBar title="Design Examples" />
        <DesignExamples />
      </div>
    );
  }

  if (selectedSection === 'pages-dashboard') {
    return (
      <div>
        <DebugBar title="Pages Dashboard" />
        <PagesDashboard />
      </div>
    );
  }

  if (selectedSection === 'modal-components') {
    return (
      <div>
        <DebugBar title="Modal Components" />
        <ModalComponentsHub />
      </div>
    );
  }

  // Testing Dashboard sekcie - IDENTICKÉ AKO HLAVNÝ DASHBOARD
  const testingSections = [
    {
      id: 'design-examples',
      name: '📄 Design Examples',
      description: 'Kolekcia webstránok a komponentov pre testovanie',
      status: 'AKTÍVNE',
      color: '#0ea5e9'
    },
    {
      id: 'modal-components',
      name: '🔧 Modal Components',
      description: 'Testovanie a vývoj modal komponentov',
      status: 'AKTÍVNE',
      color: '#3b82f6'
    },
    {
      id: 'api-testing',
      name: '⚡ API Testing',
      description: 'Testovanie backend služieb a API endpointov',
      status: 'V PRÍPRAVE',
      color: '#f59e0b'
    },
    {
      id: 'performance',
      name: '📊 Performance',
      description: 'Analýza výkonu a optimalizácia komponentov',
      status: 'V PRÍPRAVE',
      color: '#8b5cf6'
    },
    {
      id: 'automation',
      name: '🤖 Automation',
      description: 'Automatizované testovanie a CI/CD pipeline',
      status: 'V PRÍPRAVE',
      color: '#10b981'
    },
    {
      id: 'integration',
      name: '🔗 Integration',
      description: 'Testovanie integrácie medzi mikroslužbami',
      status: 'V PRÍPRAVE',
      color: '#f97316'
    },
    {
      id: 'security',
      name: '🛡️ Security',
      description: 'Bezpečnostné testovanie a penetračné testy',
      status: 'V PRÍPRAVE',
      color: '#dc2626'
    },
    {
      id: 'docs',
      name: '📚 Documentation',
      description: 'Technická dokumentácia a návody',
      status: 'V PRÍPRAVE',
      color: '#7c3aed'
    }
  ];

  // Hlavný Testing Dashboard - PRESNÁ KÓPIA ROZLOŽENIA Z App.tsx
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      <DebugBar title="L-KERN Testing Dashboard" />

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
          L-KERN Testing Dashboard
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Professional Testing Environment for ERP Development
        </p>
      </div>

      {/* Testing Sections Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {testingSections.map((section) => (
          <div
            key={section.id}
            onClick={() => {
              if (section.id === 'design-examples' || section.id === 'modal-components') {
                setSelectedSection(section.id as TestingSection);
              } else {
                alert(`${section.name} - ${section.status}`);
              }
            }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: (section.id === 'design-examples' || section.id === 'modal-components') ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${(section.id === 'design-examples' || section.id === 'modal-components') ? section.color : '#e2e8f0'}`,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              opacity: (section.id === 'design-examples' || section.id === 'modal-components') ? 1 : 0.7
            }}
            onMouseEnter={(e) => {
              if (section.id === 'design-examples' || section.id === 'modal-components') {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = section.color;
              }
            }}
            onMouseLeave={(e) => {
              if (section.id === 'design-examples' || section.id === 'modal-components') {
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
                background: (section.id === 'design-examples' || section.id === 'modal-components') ? section.color : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  fontSize: '24px',
                  filter: (section.id === 'design-examples' || section.id === 'modal-components') ? 'grayscale(0%)' : 'grayscale(100%)'
                }}>
                  {section.name.split(' ')[0]}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: (section.id === 'design-examples' || section.id === 'modal-components') ? '#1e293b' : '#94a3b8',
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
              color: (section.id === 'design-examples' || section.id === 'modal-components') ? '#64748b' : '#94a3b8',
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
              background: (section.id === 'design-examples' || section.id === 'modal-components') ? section.color : '#e2e8f0',
              color: (section.id === 'design-examples' || section.id === 'modal-components') ? 'white' : '#94a3b8',
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
          🧪 <strong>Design Examples</strong> a <strong>Modal Components</strong> sú aktívne pre vývoj a testovanie.
          <br />
          Ostatné testové moduly budú pridané postupne.
        </p>
      </div>
    </div>
  );
};

export default TestingDashboard;