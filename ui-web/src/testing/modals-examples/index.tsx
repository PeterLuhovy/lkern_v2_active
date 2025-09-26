/**
 * ================================================================
 * SÚBOR: index.tsx
 * CESTA: /ui-web/src/testing/modal-components/index.tsx
 * POPIS: Modal Components Hub - organizovaný prístup k všetkým modal komponentom
 * VERZIA: v1.1.0
 * UPRAVENÉ: 2025-01-28 23:45:00
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

  // Status farby pre komponenty (dočasne nepoužívané)
  // Prečo: Vizuálne odlíšenie stavu komponentov
  // Kedy zmeniť: Pri zmene status workflow
  // const STATUS_COLORS = {
  //   PRODUCTION: '#16a34a',    // Zelená - produkčné použitie
  //   ACTIVE: '#3b82f6',        // Modrá - aktívne vo vývoji
  //   DEVELOPMENT: '#f97316',   // Oranžová - vo vývoji
  //   TESTING: '#8b5cf6',       // Fialová - v testovaní
  //   DEMO: '#6b7280'           // Sivá - demo účely
  // } as const;

  // === KOMPONENTY ===

  // ComponentCard dočasne odstránený kvôli TypeScript chybám

  // === HLAVNÁ LOGIKA ===

  // Ak je vybraný konkrétny komponent, zobraz ho
  if (selectedComponent) {
    const component = Object.values(MODAL_CATEGORIES)
      .flatMap((category: any) => category.components)
      .find((comp: any) => comp.id === selectedComponent);

    if (component) {
      return (component as any).component;
    }
  }

  // Modal Components Hub dashboard
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
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px'
        }}>
          L-KERN Modal Components
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Organizované testovanie a vývoj modal komponentov ERP systému
        </p>
      </div>

      {/* Modal Components Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {Object.entries(MODAL_CATEGORIES).map(([categoryKey, category]) => (
          <div
            key={categoryKey}
            onClick={() => category.components.length > 0 && setSelectedComponent(category.components[0].id)}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: category.components.length > 0 ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${category.color}`,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              opacity: category.components.length > 0 ? 1 : 0.7
            }}
            onMouseEnter={(e) => {
              if (category.components.length > 0) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = category.color;
              }
            }}
            onMouseLeave={(e) => {
              if (category.components.length > 0) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >

            {/* Category Icon a Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: category.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  fontSize: '24px',
                  filter: category.components.length > 0 ? 'grayscale(0%)' : 'grayscale(100%)'
                }}>
                  {category.icon}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: category.components.length > 0 ? '#1e293b' : '#94a3b8',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  {category.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: category.components.length > 0 ? '#64748b' : '#94a3b8',
              fontWeight: '500',
              lineHeight: '1.4',
              marginBottom: '16px',
              flexGrow: 1
            }}>
              {category.description}
            </p>

            {/* Status Badge */}
            <div style={{
              padding: '6px 12px',
              background: category.components.length > 0 ? category.color : '#e2e8f0',
              color: category.components.length > 0 ? 'white' : '#94a3b8',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {category.components.length > 0 ? 'DEVELOPMENT' : 'V PRÍPRAVE'}
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
          🔧 <strong>Template System</strong> a <strong>Customer Inquiry</strong> sú aktívne pre vývoj a testovanie.
          <br />
          Ostatné moduly budú pridané postupne.
        </p>
      </div>
    </div>
  );
};

export default ModalComponentsHub;