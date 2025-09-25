/**
 * ================================================================
 * SÚBOR: NavigationBar.tsx
 * CESTA: /ui-web/src/components/shared/NavigationBar.tsx
 * POPIS: Univerzálny navigačný bar pre všetky testing stránky
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2025-01-28 23:55:00
 * ================================================================
 */

import React from 'react';

// === INTERFACES ===

interface BreadcrumbItem {
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface NavigationBarProps {
  breadcrumbs: BreadcrumbItem[];
  onBack?: () => void;
  backLabel?: string;
  theme?: {
    cardBackground: string;
    border: string;
    shadow: string;
    text: string;
    textMuted: string;
  };
}

// === CONSTANTS ===

// Default theme pre prípad že nie je poskytnutá
const DEFAULT_THEME = {
  cardBackground: '#ffffff',
  border: '#e5e7eb',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  text: '#1f2937',
  textMuted: '#6b7280'
};

// Navigation colors
const NAV_COLORS = {
  primary: '#16a34a',
  primaryHover: '#15803d',
  breadcrumbActive: '#16a34a'
};

// === KOMPONENT ===

const NavigationBar: React.FC<NavigationBarProps> = ({
  breadcrumbs,
  onBack,
  backLabel = '← Back',
  theme = DEFAULT_THEME
}) => {
  return (
    <div style={{
      padding: '12px 24px',
      background: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      margin: '20px auto 20px auto',
      maxWidth: '1200px',
      boxShadow: theme.shadow,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Breadcrumbs navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span style={{ color: theme.textMuted, margin: '0 3px', fontSize: '14px' }}>
                /
              </span>
            )}
            <span
              style={{
                cursor: item.onClick ? 'pointer' : 'default',
                color: item.isActive ? NAV_COLORS.breadcrumbActive : theme.textMuted,
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: item.isActive ? 'bold' : '500',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (item.onClick && !item.isActive) {
                  e.currentTarget.style.color = NAV_COLORS.breadcrumbActive;
                }
              }}
              onMouseLeave={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.color = theme.textMuted;
                }
              }}
              onClick={item.onClick}
            >
              {item.name}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Action buttons */}
      {onBack && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onBack}
            style={{
              background: NAV_COLORS.primary,
              border: `1px solid ${NAV_COLORS.primary}`,
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = NAV_COLORS.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.background = NAV_COLORS.primary}
            title="Go back to previous page"
          >
            {backLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;