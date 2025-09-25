/**
 * ================================================================
 * SÚBOR: ProfessionalDebugSystem.tsx
 * CESTA: /ui-web/src/components/shared/ProfessionalDebugSystem.tsx
 * POPIS: Debug List (orange, full width) + Navigation Bar (Orders V2 style)
 * VERZIA: v2.0.0
 * UPRAVENÉ: 2025-01-28 23:55:00
 * ================================================================
 */

import React from 'react';

// === INTERFACES ===

interface DebugListProps {
  pageName: string;                 // Page name (unformatted)
  pagePath: string;                 // File path to page
}

// === CONSTANTS ===

// Debug List Colors - Orange full width bar
const DEBUG_LIST_COLORS = {
  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  text: 'white',
  button: 'rgba(255,255,255,0.2)',
  buttonHover: 'rgba(255,255,255,0.3)'
};


// Debug List Styles - Orange bar across full width
const DEBUG_LIST_STYLES = {
  position: 'fixed' as const,
  top: '0',
  left: '0',
  right: '0',
  zIndex: 9999,
  padding: '8px 16px',
  background: DEBUG_LIST_COLORS.background,
  color: DEBUG_LIST_COLORS.text,
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
};


// Copy Button Styles - for debug list
const COPY_BUTTON_STYLES = {
  background: DEBUG_LIST_COLORS.button,
  border: 'none',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '10px',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};


// === KOMPONENT ===

const DebugList: React.FC<DebugListProps> = ({
  pageName,
  pagePath
}) => {

  // Copy page name function
  const copyPageName = async () => {
    try {
      await navigator.clipboard.writeText(pageName);
    } catch (err) {
      console.log('Copy page name failed:', err);
    }
  };

  // Copy page path function
  const copyPagePath = async () => {
    try {
      await navigator.clipboard.writeText(pagePath);
    } catch (err) {
      console.log('Copy page path failed:', err);
    }
  };

  return (
    <div style={DEBUG_LIST_STYLES}>
      {/* Page name */}
      <span style={{ fontWeight: 'bold' }}>
        {pageName}
      </span>

      {/* Copy name button */}
      <button
        onClick={copyPageName}
        style={COPY_BUTTON_STYLES}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = DEBUG_LIST_COLORS.buttonHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = DEBUG_LIST_COLORS.button;
        }}
        title="Copy page name to clipboard"
      >
        copy name
      </button>

      {/* Separator */}
      <span style={{ opacity: 0.7 }}>|</span>

      {/* Page path */}
      <span style={{ fontFamily: 'monospace', opacity: 0.9 }}>
        {pagePath}
      </span>

      {/* Copy path button */}
      <button
        onClick={copyPagePath}
        style={COPY_BUTTON_STYLES}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = DEBUG_LIST_COLORS.buttonHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = DEBUG_LIST_COLORS.button;
        }}
        title="Copy file path to clipboard"
      >
        copy path
      </button>
    </div>
  );
};

export default DebugList;