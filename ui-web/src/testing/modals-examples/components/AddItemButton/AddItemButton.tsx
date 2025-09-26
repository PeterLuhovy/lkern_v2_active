/*
 * ================================================================
 * SÚBOR: AddItemButton.tsx
 * CESTA: /ui-web/src/components/shared/AddItemButton.tsx
 * POPIS: Zjednotený tlačidlo komponent pre pridávanie nových položiek (diely, technológie, etc.)
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-12-25 14:35:00
 * ================================================================
 */

// === IMPORTS ===
import React from 'react';
import './AddItemButton.css';

// === INTERFACES ===
interface AddItemButtonProps {
  // Základné props
  onClick: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;

  // Customization
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;

  // Theme a styling
  theme?: any;
  className?: string;

  // States
  count?: number;
  showCount?: boolean;

  // Accessibility
  ariaLabel?: string;
  title?: string;
}

// === VARIANT KONFIGURÁCIE ===
const VARIANT_CONFIG = {
  primary: {
    gradient: 'linear-gradient(135deg, #2196F3, #1565C0)',
    hoverGradient: 'linear-gradient(135deg, #1976D2, #0D47A1)',
    color: '#2196F3',
    defaultIcon: '➕'
  },
  secondary: {
    gradient: 'linear-gradient(135deg, #9E9E9E, #616161)',
    hoverGradient: 'linear-gradient(135deg, #757575, #424242)',
    color: '#9E9E9E',
    defaultIcon: '📄'
  },
  success: {
    gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    hoverGradient: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
    color: '#4CAF50',
    defaultIcon: '✅'
  },
  warning: {
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    hoverGradient: 'linear-gradient(135deg, #F57C00, #E65100)',
    color: '#FF9800',
    defaultIcon: '⚠️'
  }
} as const;

// === HLAVNÝ KOMPONENT ===
const AddItemButton: React.FC<AddItemButtonProps> = ({
  onClick,
  text,
  disabled = false,
  loading = false,

  icon,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,

  theme,
  className = '',

  count,
  showCount = false,

  ariaLabel,
  title
}) => {

  // === HELPER FUNKCIE ===
  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  const config = VARIANT_CONFIG[variant];
  const displayIcon = icon || config.defaultIcon;

  // === CSS CLASSES ===
  const buttonClasses = [
    'add-item-button',
    `add-item-button--${variant}`,
    `add-item-button--${size}`,
    fullWidth ? 'add-item-button--full-width' : '',
    disabled ? 'add-item-button--disabled' : '',
    loading ? 'add-item-button--loading' : '',
    className
  ].filter(Boolean).join(' ');

  // === RENDER ===
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      title={title || text}
      style={{
        '--variant-gradient': config.gradient,
        '--variant-hover-gradient': config.hoverGradient,
        '--variant-color': config.color,
        '--theme-input-background': theme?.inputBackground || '#ffffff',
        '--theme-input-border': theme?.inputBorder || '#ddd'
      } as React.CSSProperties}
    >
      {/* Loading spinner alebo ikona */}
      <span className="add-item-button__icon">
        {loading ? (
          <span className="add-item-button__spinner">⟳</span>
        ) : (
          displayIcon
        )}
      </span>

      {/* Text */}
      <span className="add-item-button__text">
        {text}
      </span>

      {/* Count badge */}
      {showCount && typeof count === 'number' && count > 0 && (
        <span className="add-item-button__count">
          {count}
        </span>
      )}

      {/* Hover effect overlay */}
      <span className="add-item-button__hover-overlay"></span>
    </button>
  );
};

// === EXPORT ===
export default AddItemButton;