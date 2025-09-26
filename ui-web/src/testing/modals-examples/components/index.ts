/*
 * ================================================================
 * SÚBOR: index.ts
 * CESTA: /ui-web/src/components/shared/index.ts
 * POPIS: Export súbor pre všetky zdieľané komponenty - centralizované importovanie
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-12-25 14:35:00
 * ================================================================
 */

// === SHARED KOMPONENTY EXPORTS ===

// Priority selector komponent
export { default as PrioritySelector } from './PrioritySelector/PrioritySelector';
export type { PriorityType } from './PrioritySelector/PrioritySelector';

// Type selector komponent
export { default as TypeSelector } from './TypeSelector/TypeSelector';
export type { PartType } from './TypeSelector/TypeSelector';

// Dropdown s modal funkcionalitou
export { default as DropdownWithModal } from './DropdownWithModal/DropdownWithModal';

// Add item button komponent
export { default as AddItemButton } from './AddItemButton/AddItemButton';

// === UTILITY TYPES ===
export interface SharedComponentTheme {
  inputBackground?: string;
  inputBorder?: string;
  text?: string;
  textSecondary?: string;
  hoverBackground?: string;
  cardBackground?: string;
  border?: string;
}

// === COMMON INTERFACES ===
export interface BaseComponentProps {
  theme?: SharedComponentTheme;
  disabled?: boolean;
  className?: string;
}

// === CONSTANTS ===
export const PRIORITY_LEVELS = [
  'nizka',
  'normalna',
  'stredna',
  'rychla',
  'extra_rychla'
] as const;

export const PART_TYPES = ['PRT', 'ASM'] as const;

// === HELPER FUNKCIE ===
export const getPriorityLabel = (priority: string): string => {
  const labels = {
    nizka: 'Nízka',
    normalna: 'Normálna',
    stredna: 'Stredná',
    rychla: 'Rýchla',
    extra_rychla: 'Extra rýchla'
  };
  return labels[priority as keyof typeof labels] || priority;
};

export const getPartTypeLabel = (type: string): string => {
  const labels = {
    PRT: 'Díel (PRT)',
    ASM: 'Zostava (ASM)'
  };
  return labels[type as keyof typeof labels] || type;
};