/**
 * ================================================================
 * SÚBOR: PageNavigationBar.tsx
 * CESTA: /ui-web/src/components/shared/PageNavigationBar.tsx
 * POPIS: Navigačný bar pre stránky - dizajn podľa OrdersVariant2.tsx
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2025-01-28 23:58:00
 * ================================================================
 */

import React from 'react';

// === INTERFACES ===

interface BreadcrumbItem {
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface PageNavigationBarProps {
  breadcrumbs: BreadcrumbItem[];
  onBack?: () => void;
  backLabel?: string;
  isDarkMode?: boolean;
}

// === THEME CONFIGURATION ===

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

// Navigation colors - inspired by OrdersVariant2 design
const NAV_COLORS = {
  light: {
    primary: '#9c27b0',      // Primary purple from OrdersVariant2
    primaryHover: '#7b1fa2',
    secondary: '#3366cc',    // Secondary blue
    success: '#4caf50',      // Success green
    breadcrumbActive: '#9c27b0',
    breadcrumbHover: '#7b1fa2'
  },
  dark: {
    primary: '#ab47bc',      // Lighter purple for dark mode
    primaryHover: '#8e24aa',
    secondary: '#5c7cfa',    // Lighter blue
    success: '#66bb6a',      // Lighter green
    breadcrumbActive: '#ab47bc',
    breadcrumbHover: '#8e24aa'
  }
};

// === KOMPONENT ===

const PageNavigationBar: React.FC<PageNavigationBarProps> = ({
  breadcrumbs,
  onBack,
  backLabel = '← Back',
  isDarkMode = false
}) => {
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const navColors = isDarkMode ? NAV_COLORS.dark : NAV_COLORS.light;

  return (
    <div style={{
      background: currentTheme.cardBackground,
      border: `1px solid ${currentTheme.border}`,
      borderLeft: '6px solid #9c27b0', // Purple accent like OrdersVariant2
      borderRadius: '8px',
      boxShadow: currentTheme.shadow,
      margin: '20px auto',
      maxWidth: '1200px',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      marginTop: '54px' // Space for debug list (34px) + margin
    }}>
      {/* Breadcrumbs navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flex: 1
      }}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span style={{
                color: currentTheme.textMuted,
                margin: '0 4px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                /
              </span>
            )}
            <span
              style={{
                cursor: item.onClick ? 'pointer' : 'default',
                color: item.isActive ? navColors.breadcrumbActive : currentTheme.textMuted,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: item.isActive ? '700' : '500',
                transition: 'color 0.2s ease',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Segoe UI', sans-serif"
              }}
              onMouseEnter={(e) => {
                if (item.onClick && !item.isActive) {
                  e.currentTarget.style.color = navColors.breadcrumbHover;
                  e.currentTarget.style.background = currentTheme.hoverBackground;
                }
              }}
              onMouseLeave={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.color = currentTheme.textMuted;
                  e.currentTarget.style.background = 'transparent';
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginLeft: '20px'
        }}>
          <button
            onClick={onBack}
            style={{
              background: navColors.primary,
              border: `1px solid ${navColors.primary}`,
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: "'Segoe UI', sans-serif",
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = navColors.primaryHover;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = navColors.primary;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
            title="Go back to previous page"
          >
            {backLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default PageNavigationBar;