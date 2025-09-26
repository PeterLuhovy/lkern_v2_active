/*
 * ================================================================
 * SÚBOR: TypeSelector.tsx
 * CESTA: /ui-web/src/components/shared/TypeSelector.tsx
 * POPIS: Zjednotený komponent pre výber typu dielu (PRT/ASM) - Part alebo Assembly
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-12-25 14:35:00
 * ================================================================
 */

// === IMPORTS ===
import React from 'react';
import './TypeSelector.css';

// === INTERFACES ===
export type PartType = 'PRT' | 'ASM';

interface TypeSelectorProps {
  value: PartType;
  onChange: (type: PartType) => void;
  theme?: any;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
}

// === TYPOVÉ KONFIGURÁCIE ===
const TYPE_CONFIG = {
  PRT: {
    label: 'Díel (PRT)',
    fullLabel: 'Jednotlivý diel',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    icon: '🔧',
    description: 'Samostatný diel alebo komponent'
  },
  ASM: {
    label: 'Zostava (ASM)',
    fullLabel: 'Zostava dielov',
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    icon: '🧩',
    description: 'Zostava zložená z viacerých dielov'
  }
} as const;

// === HLAVNÝ KOMPONENT ===
const TypeSelector: React.FC<TypeSelectorProps> = ({
  value,
  onChange,
  theme,
  disabled = false,
  size = 'medium',
  required = false
}) => {

  // === HELPER FUNKCIE ===
  const handleTypeClick = (type: PartType) => {
    if (!disabled) {
      onChange(type);
    }
  };

  const types = Object.keys(TYPE_CONFIG) as PartType[];

  // === RENDER ===
  return (
    <div
      className={`type-selector type-selector--${size}`}
      style={{
        '--theme-input-background': theme?.inputBackground || '#ffffff',
        '--theme-input-border': theme?.inputBorder || '#ddd',
        '--theme-text': theme?.text || '#333333'
      } as React.CSSProperties}
    >
      {/* Nadpis sekcie */}
      <div className="type-selector__header">
        <label className="type-selector__title">
          Typ dielu {required && <span className="required">*</span>}
        </label>
        {value && (
          <span className="type-selector__current">
            {TYPE_CONFIG[value].icon} {TYPE_CONFIG[value].label}
          </span>
        )}
      </div>

      {/* Type tlačidlá */}
      <div className="type-selector__buttons">
        {types.map((type) => {
          const config = TYPE_CONFIG[type];
          const isActive = value === type;

          return (
            <button
              key={type}
              type="button"
              className={`type-selector__button ${isActive ? 'active' : ''} type-${type.toLowerCase()}`}
              onClick={() => handleTypeClick(type)}
              disabled={disabled}
              title={config.description}
              style={{
                '--type-color': config.color,
                '--type-gradient': config.gradient
              } as React.CSSProperties}
            >
              <span className="type-selector__icon">{config.icon}</span>
              <span className="type-selector__label">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Popis vybraného typu */}
      {value && (
        <div className="type-selector__description">
          <small>{TYPE_CONFIG[value].description}</small>
        </div>
      )}

      {/* Pomocný text */}
      <div className="type-selector__help">
        <small>
          <strong>PRT:</strong> Jednotlivé diely, komponenty, suroviny<br />
          <strong>ASM:</strong> Zostavy, podzostavy, finálne produkty
        </small>
      </div>
    </div>
  );
};

// === EXPORT ===
export default TypeSelector;