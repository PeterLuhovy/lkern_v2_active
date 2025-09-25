/**
 * ================================================================
 * SÚBOR: index.tsx
 * CESTA: /ui-web/src/testing/modal-components/index.tsx
 * POPIS: Modal Components Hub - organizovaný prístup k všetkým modal komponentom
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2025-01-27 22:15:00
 * ================================================================
 */

import React, { useState } from 'react';

const ModalComponentsHub: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  // === CONSTANTS ===

  // Modal komponenty organizované do kategórií
  // Prečo: Lepšia organizácia a prehľadnosť všetkých modal komponentov
  // Kedy zmeniť: Pri pridávaní nových modal komponentov
  const MODAL_CATEGORIES = {
    templateSystem: {
      name: 'Template System',
      icon: '🎭',
      color: '#8b5cf6',
      description: 'Základný template systém pre všetky modaly',
      components: [
        {
          id: 'modal-template',
          name: 'ModalTemplate',
          description: 'Univerzálny template pre všetky modaly - implementácia prebieha',
          status: 'DEVELOPMENT',
          component: <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#64748b' }}>
            🎭 ModalTemplate System<br />
            <small>V príprave - bude implementovaný postupne</small>
          </div>
        }
      ]
    },
    customerInquiry: {
      name: 'Customer Inquiry',
      icon: '📋',
      color: '#16a34a',
      description: 'Komponenty pre spracovanie dopytov zákazníkov',
      components: [
        {
          id: 'customer-inquiry-modal',
          name: 'Customer Inquiry Modal',
          description: 'Modal pre nové dopyty zákazníkov - implementácia prebieha',
          status: 'DEVELOPMENT',
          component: <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#64748b' }}>
            📋 Customer Inquiry Modal<br />
            <small>V príprave - bude implementovaný postupne</small>
          </div>
        }
      ]
    },
    utilities: {
      name: 'Utilities',
      icon: '⚡',
      color: '#6b7280',
      description: 'Pomocné komponenty a utility modaly',
      components: [
        {
          id: 'placeholder-modal',
          name: 'Placeholder Modal',
          description: 'Dočasný komponent pre testovanie',
          status: 'DEMO',
          component: <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#64748b' }}>
            ⚡ Placeholder Modal<br />
            <small>Demo komponent - ostatné budú pridané postupne</small>
          </div>
        }
      ]
    }
  } as const;

  // Status farby pre komponenty
  // Prečo: Vizuálne odlíšenie stavu komponentov
  // Kedy zmeniť: Pri zmene status workflow
  const STATUS_COLORS = {
    PRODUCTION: '#16a34a',    // Zelená - produkčné použitie
    ACTIVE: '#3b82f6',        // Modrá - aktívne vo vývoji
    DEVELOPMENT: '#f97316',   // Oranžová - vo vývoji
    TESTING: '#8b5cf6',       // Fialová - v testovaní
    DEMO: '#6b7280'           // Sivá - demo účely
  } as const;

  // === KOMPONENTY ===

  // Komponent pre zobrazenie jednotlivého modal komponentu
  const ComponentCard: React.FC<{
    component: any;
    category: string;
    onSelect: (id: string) => void;
  }> = ({ component, category, onSelect }) => (
    <div
      onClick={() => onSelect(component.id)}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        border: '2px solid #f1f5f9'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Status Badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          background: STATUS_COLORS[component.status as keyof typeof STATUS_COLORS],
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {component.status}
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
          {category}
        </div>
      </div>

      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '8px'
      }}>
        {component.name}
      </h4>

      <p style={{
        fontSize: '14px',
        color: '#64748b',
        fontWeight: '500',
        lineHeight: '1.5',
        marginBottom: '16px'
      }}>
        {component.description}
      </p>

      <button style={{
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
        Test Component →
      </button>
    </div>
  );

  // === HLAVNÁ LOGIKA ===

  // Ak je vybraný konkrétny komponent, zobraz ho
  if (selectedComponent) {
    const component = Object.values(MODAL_CATEGORIES)
      .flatMap(category => category.components)
      .find(comp => comp.id === selectedComponent);

    if (component) {
      return (
        <div>
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            <button
              onClick={() => setSelectedComponent('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '16px'
              }}
            >
              ← Späť
            </button>
            TESTING: {component.name}
          </div>
          {component.component}
        </div>
      );
    }
  }

  // Modal Components Hub dashboard
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '40px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          background: '#3b82f6',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          MODAL COMPONENTS TESTING
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '16px'
        }}>
          🔧 Modal Components Hub
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#64748b',
          fontWeight: '500',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Organizované modal komponenty s postupnou implementáciou.
          <br />
          <strong>Základná štruktúra</strong> je pripravená pre budúce komponenty.
        </p>
      </div>

      {/* Categories */}
      {Object.entries(MODAL_CATEGORIES).map(([categoryKey, category]) => (
        <div key={categoryKey} style={{ marginBottom: '60px' }}>

          {/* Category Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '16px',
            borderBottom: `3px solid ${category.color}`
          }}>
            <div style={{
              fontSize: '32px',
              marginRight: '16px'
            }}>
              {category.icon}
            </div>
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                {category.name}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                fontWeight: '500',
                margin: 0
              }}>
                {category.description}
              </p>
            </div>
            <div style={{
              marginLeft: 'auto',
              padding: '8px 16px',
              background: category.color,
              color: 'white',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              {category.components.length} Components
            </div>
          </div>

          {/* Components Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {category.components.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                category={category.name}
                onSelect={setSelectedComponent}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '80px',
        padding: '32px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          🧪 Modal Development Environment
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Modal Components Hub je pripravený pre postupné pridávanie komponentov.
          <br />
          Každý komponent bude mať svoj vlastný testing kontext a funkcionalitu.
        </p>
      </div>
    </div>
  );
};

export default ModalComponentsHub;