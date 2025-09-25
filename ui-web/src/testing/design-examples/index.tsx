/**
 * ================================================================
 * SÚBOR: index.tsx
 * CESTA: /ui-web/src/testing/design-examples/index.tsx
 * POPIS: Design Examples Hub - IDENTICKÉ ROZLOŽENIE AKO TESTING DASHBOARD
 * VERZIA: v2.0.0
 * UPRAVENÉ: 2025-01-28 23:50:00
 * ================================================================
 */

import React, { useState } from 'react';
import OrdersVariant2 from './OrdersVariant2';
import OrdersVariant2_V2 from './OrdersVariant2_V2';
import OrdersVariant2_V3 from './OrdersVariant2_V3';
import ObsoleteVariants from './obs/ObsoleteVariants';
import DebugList from '../../components/shared/ProfessionalDebugSystem';

type DesignVariant = 'home' | 'variant2' | 'variant2-v2' | 'variant2-v3' | 'obsolete';

const DesignExamples: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<DesignVariant>('home');

  // Routing logic pre jednotlivé varianty
  if (selectedVariant === 'variant2') {
    return (
      <div>
        <DebugList
          pageName="Orders Management V1"
          pagePath="/ui-web/src/testing/design-examples/OrdersVariant2.tsx"
        />
        <OrdersVariant2 />
      </div>
    );
  }

  if (selectedVariant === 'variant2-v2') {
    return (
      <div>
        <DebugList
          pageName="Orders Management V2"
          pagePath="/ui-web/src/testing/design-examples/OrdersVariant2_V2.tsx"
        />
        <OrdersVariant2_V2 />
      </div>
    );
  }

  if (selectedVariant === 'variant2-v3') {
    return (
      <div>
        <DebugList
          pageName="Orders Management V3"
          pagePath="/ui-web/src/testing/design-examples/OrdersVariant2_V3.tsx"
        />
        <OrdersVariant2_V3 />
      </div>
    );
  }

  if (selectedVariant === 'obsolete') {
    return (
      <div>
        <DebugList
          pageName="Obsolete Variants"
          pagePath="/ui-web/src/testing/design-examples/obs/ObsoleteVariants.tsx"
        />
        <ObsoleteVariants />
      </div>
    );
  }

  // Design Examples sekcie - IDENTICKÉ AKO TESTING DASHBOARD
  const designVariants = [
    {
      id: 'variant2',
      name: '📋 Orders Management V1',
      description: 'Základná verzia Orders Management systému - stabilná produkčná verzia',
      status: 'PRODUCTION',
      color: '#16a34a'
    },
    {
      id: 'variant2-v2',
      name: '⚡ Enhanced V2',
      description: 'Rozšírené funkcionality - Bulk operations, Enhanced search, Mobile responsive',
      status: 'ENHANCED',
      color: '#9c27b0'
    },
    {
      id: 'variant2-v3',
      name: '✨ Golden Ratio V3',
      description: 'V2 funkcionalita + Golden Ratio Design System - Matematické proporcie',
      status: 'PREMIUM',
      color: '#3366cc'
    },
    {
      id: 'obsolete',
      name: '📦 Obsolete Variants',
      description: 'Staré varianty pre porovnanie a referencie (V1, V3-V9)',
      status: 'ARCHÍV',
      color: '#f97316'
    },
    {
      id: 'future-v4',
      name: '🚀 Future V4',
      description: 'Plánovaný variant s AI integráciou a real-time analytics',
      status: 'V PRÍPRAVE',
      color: '#0ea5e9'
    },
    {
      id: 'mobile-first',
      name: '📱 Mobile First',
      description: 'Mobilný variant optimalizovaný pre tablety a telefóny',
      status: 'V PRÍPRAVE',
      color: '#8b5cf6'
    },
    {
      id: 'accessibility',
      name: '♿ Accessibility',
      description: 'Variant s plnou podporou accessibility a WCAG štandardov',
      status: 'V PRÍPRAVE',
      color: '#10b981'
    },
    {
      id: 'dark-theme',
      name: '🌙 Dark Theme',
      description: 'Tmavý variant pre prácu v noci a úsporu očí',
      status: 'V PRÍPRAVE',
      color: '#374151'
    }
  ];

  // Hlavný Design Examples Dashboard - PRESNÁ KÓPIA ROZLOŽENIA Z testing/index.tsx
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      <DebugList
        pageName="Design Examples Hub (Main)"
        pagePath="/ui-web/src/testing/design-examples/index.tsx"
      />

      {/* Main Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px'
        }}>
          L-KERN Design Examples
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Professional Design Variants for Orders Management System
        </p>
      </div>

      {/* Design Variants Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {designVariants.map((variant) => {
          const isActive = ['variant2', 'variant2-v2', 'variant2-v3', 'obsolete'].includes(variant.id);

          return (
            <div
              key={variant.id}
              onClick={() => {
                if (isActive) {
                  setSelectedVariant(variant.id as DesignVariant);
                } else {
                  alert(`${variant.name} - ${variant.status}`);
                }
              }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                cursor: isActive ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${isActive ? variant.color : '#e2e8f0'}`,
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                opacity: isActive ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (isActive) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = variant.color;
                }
              }}
              onMouseLeave={(e) => {
                if (isActive) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
                }
              }}
            >

              {/* Variant Icon a Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: isActive ? variant.color : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{
                    fontSize: '24px',
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)'
                  }}>
                    {variant.name.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: isActive ? '#1e293b' : '#94a3b8',
                    margin: 0,
                    marginBottom: '4px'
                  }}>
                    {variant.name.split(' ').slice(1).join(' ')}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: isActive ? '#64748b' : '#94a3b8',
                fontWeight: '500',
                lineHeight: '1.4',
                marginBottom: '16px',
                flexGrow: 1
              }}>
                {variant.description}
              </p>

              {/* Status Badge */}
              <div style={{
                padding: '6px 12px',
                background: isActive ? variant.color : '#e2e8f0',
                color: isActive ? 'white' : '#94a3b8',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {variant.status}
              </div>
            </div>
          );
        })}
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
          🎨 <strong>Orders Management V1</strong>, <strong>Enhanced V2</strong>, <strong>Golden Ratio V3</strong> a <strong>Obsolete Variants</strong> sú aktívne pre testovanie.
          <br />
          Budúce design varianty budú pridané postupne.
        </p>
      </div>
    </div>
  );
};

export default DesignExamples;