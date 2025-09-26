/**
 * ================================================================
 * SÚBOR: index.tsx
 * CESTA: /ui-web/src/testing/pages-dashboard/index.tsx
 * POPIS: Pages Dashboard - zobrazuje zoznam webstránok pre testovanie
 * VERZIA: v1.2.0
 * UPRAVENÉ: 2025-01-28 23:45:00
 * ================================================================
 */

import React, { useState } from 'react';
import OrdersVariant2 from './OrdersVariant2';
import OrdersVariant2V2 from './OrdersVariant2_V2';
import DebugBar from '../components/DebugBar/DebugBar';

type PageView = 'dashboard' | 'orders-variant2' | 'orders-variant2-v2';

const PagesDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');

  // === CONSTANTS ===

  // Zoznam dostupných webstránok
  const availablePages = [
    {
      id: 'orders-variant2',
      name: 'Orders Management',
      description: 'Professional Orders stránka s kompletnou funkcionalitou',
      category: 'ERP Core',
      status: 'PRODUCTION',
      color: '#16a34a',
      component: <OrdersVariant2 />
    },
    {
      id: 'orders-variant2-v2',
      name: 'Orders Management V2',
      description: 'Nová verzia Orders stránky s vylepšenou funkcionalitou',
      category: 'ERP Core',
      status: 'DEVELOPMENT',
      color: '#3b82f6',
      component: <OrdersVariant2V2 />
    }
  ];


  // === HLAVNÁ LOGIKA ===

  // Ak je vybraná konkrétna stránka, zobraziť ju
  if (currentPage === 'orders-variant2') {
    return (
      <div>
        <DebugBar title="Orders Management V1" />
        {availablePages[0].component}
      </div>
    );
  }

  if (currentPage === 'orders-variant2-v2') {
    return (
      <div>
        <DebugBar title="Orders Management V2" />
        {availablePages[1].component}
      </div>
    );
  }

  // Pages Dashboard - hlavná obrazovka
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      <DebugBar title="Pages Dashboard" />

      {/* Main Header - PRESNE AKO TESTING HUB */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px'
        }}>
          Pages Dizajn Examples
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Kolekcia webstránok a komponentov pre testovanie a vývoj
        </p>
      </div>

      {/* Pages Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {availablePages.map((page) => (
          <div
            key={page.id}
            onClick={() => setCurrentPage(page.id as PageView)}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${page.color}`,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderColor = page.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
            }}
          >

            {/* Page Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: page.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  fontSize: '24px'
                }}>
                  📄
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  {page.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500',
              lineHeight: '1.4',
              marginBottom: '16px',
              flexGrow: 1
            }}>
              {page.description}
            </p>

            {/* Status Badge */}
            <div style={{
              padding: '6px 12px',
              background: page.color,
              color: 'white',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {page.status}
            </div>
          </div>
        ))}

        {/* Placeholder pre budúce stránky */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7
        }}>
          <span style={{
            fontSize: '24px',
            marginBottom: '16px',
            filter: 'grayscale(100%)'
          }}>
            ➕
          </span>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#94a3b8',
            margin: '0 0 4px 0'
          }}>
            Ďalšie stránky
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            textAlign: 'center',
            margin: '0'
          }}>
            Budúce webstránky budú pridané postupne
          </p>
        </div>
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
          📄 <strong>Orders Management</strong> a <strong>Orders Management V2</strong> sú aktívne pre vývoj a testovanie.
          <br />
          Ďalšie stránky budú pridané postupne.
        </p>
      </div>
    </div>
  );
};

export default PagesDashboard;