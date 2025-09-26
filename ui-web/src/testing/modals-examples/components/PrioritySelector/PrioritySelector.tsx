/*
 * ================================================================
 * SÚBOR: PrioritySelector.tsx
 * CESTA: /ui-web/src/components/shared/PrioritySelector.tsx
 * POPIS: Zjednotený komponent pre výber priority objednávok a dielov
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-12-25 14:35:00
 * ================================================================
 */

// === IMPORTS ===
import React from 'react';
import './PrioritySelector.css';

// === INTERFACES ===
export type PriorityType = 'nizka' | 'normalna' | 'stredna' | 'rychla' | 'extra_rychla';

interface PrioritySelectorProps {
  value: PriorityType;
  onChange: (priority: PriorityType) => void;
  theme?: any;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  layout?: 'horizontal' | 'vertical';
}

// === PRIORITNÉ KONFIGURÁCIE ===
const PRIORITY_CONFIG = {
  nizka: {
    label: 'Nízka',
    color: '#9E9E9E',
    gradient: 'linear-gradient(135deg, #9E9E9E, #616161)',
    icon: '⏳',
    description: 'Štandardné objednávky - 21 dní'
  },
  normalna: {
    label: 'Normálna',
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #2196F3, #1565C0)',
    icon: '📋',
    description: 'Bežné priority - 14 dní'
  },
  stredna: {
    label: 'Stredná',
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    icon: '⚡',
    description: 'Urgencie - 7 dní'
  },
  rychla: {
    label: 'Rýchla',
    color: '#FF5722',
    gradient: 'linear-gradient(135deg, #FF5722, #D84315)',
    icon: '🔥',
    description: 'Kritické - 2 dni'
  },
  extra_rychla: {
    label: 'Extra rýchla',
    color: '#F44336',
    gradient: 'linear-gradient(135deg, #F44336, #C62828)',
    icon: '🚨',
    description: 'Emergency only - 1 deň'
  }
} as const;

// === HLAVNÝ KOMPONENT ===
const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  value,
  onChange,
  theme,
  disabled = false,
  size = 'medium',
  layout = 'horizontal'
}) => {

  // === HELPER FUNKCIE ===
  const handlePriorityClick = (priority: PriorityType) => {
    if (!disabled) {
      onChange(priority);
    }
  };

  const priorities = Object.keys(PRIORITY_CONFIG) as PriorityType[];

  // === RENDER ===
  return (
    <div
      className={`priority-selector priority-selector--${size} priority-selector--${layout}`}
      style={{
        '--theme-input-background': theme?.inputBackground || '#ffffff',
        '--theme-input-border': theme?.inputBorder || '#ddd',
        '--theme-text': theme?.text || '#333333'
      } as React.CSSProperties}
    >
      {/* Nadpis sekcie */}
      <div className="priority-selector__header">
        <span className="priority-selector__title">Priorita objednávky</span>
        {value && (
          <span className="priority-selector__current">
            {PRIORITY_CONFIG[value].icon} {PRIORITY_CONFIG[value].label}
          </span>
        )}
      </div>

      {/* Priority tlačidlá */}
      <div className="priority-selector__buttons">
        {priorities.map((priority) => {
          const config = PRIORITY_CONFIG[priority];
          const isActive = value === priority;

          return (
            <button
              key={priority}
              type="button"
              className={`priority-selector__button ${isActive ? 'active' : ''} priority-${priority}`}
              onClick={() => handlePriorityClick(priority)}
              disabled={disabled}
              title={config.description}
              style={{
                '--priority-color': config.color,
                '--priority-gradient': config.gradient
              } as React.CSSProperties}
            >
              <span className="priority-selector__icon">{config.icon}</span>
              <span className="priority-selector__label">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Popis vybranej priority */}
      {value && (
        <div className="priority-selector__description">
          <small>{PRIORITY_CONFIG[value].description}</small>
        </div>
      )}
    </div>
  );
};

// === EXPORT ===
export default PrioritySelector;