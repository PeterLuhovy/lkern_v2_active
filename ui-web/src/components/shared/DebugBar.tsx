/**
 * ================================================================
 * SÚBOR: DebugBar.tsx
 * CESTA: /ui-web/src/components/shared/DebugBar.tsx
 * POPIS: Univerzálny debug komponent pre testing stránky s back buttonom
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2025-01-28 23:40:00
 * ================================================================
 */

import React from 'react';

// === INTERFACES ===

interface DebugBarProps {
  title: string;                    // Text na zobrazenie (napr. "Design Examples → Variant 2")
  onBack?: () => void;             // Callback pre back button (ak nie je, back button sa nezobrazí)
  backLabel?: string;              // Text pre back button (default: "← Späť")
  backgroundColor?: string;        // Background farba (default: rgba(0,0,0,0.8))
  position?: 'top-left' | 'top-right'; // Pozícia na obrazovke (default: top-left)
  showCopyButton?: boolean;        // Zobrazit copy button pre názov (default: false)
  copyText?: string;               // Text na kopírovanie (default: title)
}

// === CONSTANTS ===

// Pozície debug baru
// Prečo: Flexibility pre umiestnenie debug baru podľa potreby
// Kedy zmeniť: Pri pridaní nových pozícií alebo responsive úpravách
const POSITION_STYLES = {
  'top-left': {
    position: 'fixed' as const,
    top: '20px',
    left: '20px'
  },
  'top-right': {
    position: 'fixed' as const,
    top: '20px',
    right: '20px'
  }
};

// Základné štýly debug baru
// Prečo: Konzistentný vzhľad naprieč všetkými testing stránkami
// Kedy zmeniť: Pri brand zmene alebo visual refresh
const DEBUG_BAR_STYLES = {
  zIndex: 1000,                    // Vysoký z-index aby bol vždy na vrchu
  color: 'white',
  padding: '12px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

// Štýly pre back button
// Prečo: Konzistentný vzhľad tlačidiel v debug bare
// Kedy zmeniť: Pri zmene interakčných prvkov alebo accessibility požiadavkách
const BACK_BUTTON_STYLES = {
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  padding: '0',
  display: 'flex',
  alignItems: 'center'
};

// Štýly pre copy button
// Prečo: Kopírovanie názvu komponentu do schránky pre debugging
// Kedy zmeniť: Pri zmene copy UX alebo visual designu
const COPY_BUTTON_STYLES = {
  background: 'rgba(255,255,255,0.8)',
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: '3px',
  padding: '1px 6px',
  fontSize: '10px',
  cursor: 'pointer',
  color: '#333',
  marginLeft: '8px'
};

// === KOMPONENT ===

const DebugBar: React.FC<DebugBarProps> = ({
  title,
  onBack,
  backLabel = "← Späť",
  backgroundColor = "rgba(0,0,0,0.8)",
  position = "top-left",
  showCopyButton = false,
  copyText
}) => {
  // Copy function pre názov komponentu
  const copyToClipboard = async () => {
    try {
      const textToCopy = copyText || title;
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.log('Copy failed:', err);
    }
  };

  return (
    <div
      style={{
        ...POSITION_STYLES[position],
        ...DEBUG_BAR_STYLES,
        background: backgroundColor
      }}
    >
      {/* Back button - zobrazí sa len ak je onBack callback */}
      {onBack && (
        <button
          onClick={onBack}
          style={BACK_BUTTON_STYLES}
          title={`Späť na predchádzajúcu stránku`}
        >
          {backLabel}
        </button>
      )}

      {/* Debug title */}
      <span>
        TESTING: {title}
      </span>

      {/* Copy button - zobrazí sa len ak je showCopyButton true */}
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          style={COPY_BUTTON_STYLES}
          title={`Kopírovať "${copyText || title}" do schránky`}
        >
          copy
        </button>
      )}
    </div>
  );
};

export default DebugBar;