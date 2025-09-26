/*
 * ================================================================
 * SÚBOR: SinglePartModal.tsx
 * CESTA: /ui-web/src/testing/modal-components/SinglePartModal/SinglePartModal.tsx
 * POPIS: Modal pre pridanie/editáciu jedného dielu - zdieľané komponenty + dokumentované konštanty
 * VERZIA: v4.2.0
 * UPRAVENÉ: 2024-09-25 15:25:00
 * ================================================================
 */

import React, { useState, useEffect } from 'react';
import ManufacturingTechnologyModal from '../ManufacturingTechnologyModal';
import ModalTemplate from '../ModalTemplate';
import { PrioritySelector, TypeSelector, AddItemButton } from '../../components';
import type { PriorityType, PartType } from '../../components';
import './SinglePartModal.css';

// === CONSTANTS ===

// UI rozměry a layout nastavenia (všetky hodnoty v pixeloch)
// Prečo: Konzistentné rozmery modal komponentu pre jednotný UX
// Kedy zmeniť: Pri responsive dizajn úpravách alebo UX optimalizácii
const LAYOUT_SIZES = {
  MODAL_MAX_WIDTH: '600px',        // Optimálna šírka part modal pre desktop
  GRID_GAP: '12px',                // Štandardný rozostup medzi grid elementami
  MARGIN_BOTTOM: '16px',           // Dolný margin pre sekcie formuláru
  INPUT_PADDING: '10px 12px',      // Vnútorný padding pre input fieldy
  BORDER_RADIUS: '6px',            // Zaoblenie rohov pre input fieldy a tlačidlá
  SMALL_BORDER_RADIUS: '4px',      // Menšie zaoblenie pre malé elementy
  MICRO_BORDER_RADIUS: '3px'       // Najmenšie zaoblenie pre badges/tagy
};

// Typography a font sizing (všetky hodnoty v pixeloch)
// Prečo: Konzistentné veľkosti písma pre čitateľnosť a hierachiu
// Kedy zmeniť: Pri accessibility úpravách alebo font system refactore
const TYPOGRAPHY = {
  LABEL_FONT_SIZE: '14px',         // Štandardná veľkosť pre form labely
  INPUT_FONT_SIZE: '14px',         // Veľkosť textu v input fieldoch
  SMALL_FONT_SIZE: '12px',         // Menší text pre pomocné informácie
  TINY_FONT_SIZE: '10px',          // Najmenší text pre badges a tagy
  LABEL_MARGIN_BOTTOM: '6px'       // Rozostup medzi labelom a input fieldom
};

// Farby a color scheme (hex kódy)
// Prečo: Design system farby pre konzistentný vzhľad modalu
// Kedy zmeniť: Pri rebrandingu alebo theme systém aktualizácii
const COLORS = {
  DISABLED_BACKGROUND: '#f0f0f0',  // Svetlo sivé pozadie pre disabled inputy
  DISABLED_TEXT: '#999',           // Sivá farba textu pre disabled stav
  ERROR_BACKGROUND: '#f44336',     // Červené pozadie pre error badges
  WHITE_TEXT: '#fff',              // Biely text pre kontrastné pozadie
  BUTTON_GRADIENT: 'linear-gradient(135deg, #2196F3, #1976D2)' // Modrý gradient pre primary tlačidlá
};

// Kontajner rozměry a scrollable oblasti (pixely)
// Prečo: Optimálne výšky pre scrollable listy bez layout problémov
// Kedy zmeniť: Pri content density zmenách alebo mobile optimalizácii
const CONTAINER_SIZES = {
  TECH_LIST_MAX_HEIGHT: '150px',   // Max výška zoznamu technológií
  FILE_LIST_MAX_HEIGHT: '120px',   // Max výška zoznamu súborov
  CONTAINER_PADDING: '8px',        // Vnútorný padding pre list kontajnery
  ITEM_PADDING: '8px',             // Padding pre individuálne list items
  SMALL_ITEM_PADDING: '6px 8px',   // Padding pre kompaktné list items
  BUTTON_PADDING: '6px 12px'       // Padding pre malé action tlačidlá
};

// CSS Grid template definície
// Prečo: Reusable grid layouts pre konzistentný alignment
// Kedy zmeniť: Pri form layout redesign alebo responsive úpravách
const GRID_LAYOUTS = {
  TWO_COLUMNS: '1fr 1fr',                // Rovnaké dva stĺpce pre form fieldy
  THREE_COLUMNS_MIXED: '100px 100px 1fr' // Quantity + Unit + Name layout
};

// Spacing a margin hodnoty (pixely)
// Prečo: Štandardizované rozostupy pre visual harmony
// Kedy zmeniť: Pri spacing system refactore alebo design aktualizácii
const SPACING = {
  STANDARD_GAP: '12px',            // Štandardný gap medzi elementami
  SMALL_GAP: '4px',                // Malý gap pre tight spacing
  LARGE_GAP: '16px',               // Väčší gap pre section separation
  CHECKBOX_MARGIN: '8px',          // Margin okolo checkboxov
  MICRO_MARGIN: '2px'              // Najmenší margin pre fine-tuning
};

interface Technology {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  notes: string;
}

interface Part {
  id: string;
  type: PartType;
  customerPartNumber: string;
  customerPartName: string;
  internalPartNumber: string;
  internalPartName: string;
  quantity: number;
  unit: string;
  priority: PriorityType;
  notes: string;
  technologies: Technology[];
}

interface SinglePartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (part: Part) => void;
  theme: any;
  editPart?: Part | null;
  mode: 'add' | 'edit';
}

const SinglePartModal: React.FC<SinglePartModalProps> = ({
  isOpen,
  onClose,
  onSave,
  theme,
  editPart,
  mode
}) => {
  const [partData, setPartData] = useState<Part>({
    id: '',
    type: 'PRT',
    customerPartNumber: '',
    customerPartName: '',
    internalPartNumber: '',
    internalPartName: '',
    quantity: 1,
    unit: 'ks',
    priority: 'normalna',
    notes: '',
    technologies: []
  });

  const [isManufacturingTechOpen, setIsManufacturingTechOpen] = useState(false);
  const [autoGenerateInternal, setAutoGenerateInternal] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && editPart) {
        setPartData(editPart);
      } else {
        setPartData({
          id: Date.now().toString(),
          type: 'PRT',
          customerPartNumber: '',
          customerPartName: '',
          internalPartNumber: '',
          internalPartName: '',
          quantity: 1,
          unit: 'ks',
          priority: 'normalna',
          notes: '',
          technologies: []
        });
        setAutoGenerateInternal(true);
        setSelectedFiles([]);
      }
    }
  }, [isOpen, mode, editPart]);

  const handleInputChange = (field: keyof Part, value: string | number) => {
    console.log(`[DEBUG] handleInputChange: ${field} = ${value}`);
    if (field === 'customerPartName' && autoGenerateInternal) {
      // Auto-generate internal part number based on customer part name
      const generated = `INT-${Date.now().toString().slice(-6)}-${value.toString().replace(/\s+/g, '').slice(0, 6).toUpperCase()}`;
      console.log(`[DEBUG] Generated internal number: ${generated}`);
      setPartData(prev => ({ ...prev, [field]: value.toString(), internalPartNumber: generated }));
    } else {
      setPartData(prev => ({ ...prev, [field]: typeof value === 'string' ? value : value.toString() }));
    }
  };

  const handleTechnologiesSave = (technologies: Technology[]) => {
    setPartData(prev => ({ ...prev, technologies }));
    setIsManufacturingTechOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // At least one of customer or internal part name must be filled
    if (!partData.customerPartName.trim() && !partData.customerPartNumber.trim() && !partData.internalPartName.trim()) {
      return; // ModalTemplate will handle validation
    }

    setIsSubmitting(true);

    // Simulácia uloženia
    setTimeout(() => {
      onSave(partData);
      setIsSubmitting(false);
      setShowNotification(true);

      // Close modal and notification together after 3 seconds
      setTimeout(() => {
        onClose();
        setShowNotification(false);
      }, 3000);
    }, 1000);
  };

  const units = ['ks', 'kg', 'm', 'm²', 'm³', 'l', 'set', 'pair'];

  return (
    <>
      <ModalTemplate
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        theme={theme}
        modalName="SinglePartModal"
        title={mode === 'add' ? '⚙️ Pridať diel' : '✏️ Upraviť diel'}
        subtitle={mode === 'add' ? 'Špecifikácia nového dielu' : 'Upraviť parametre dielu'}
        maxWidth={LAYOUT_SIZES.MODAL_MAX_WIDTH}
        isSubmitting={isSubmitting}
        confirmText={mode === 'add' ? 'Pridať diel (Ctrl+Enter)' : 'Uložiť zmeny (Ctrl+Enter)'}
        cancelText="Zrušiť (Escape)"
        showNotification={showNotification}
        notificationMessage={`Diel ${mode === 'add' ? 'pridaný' : 'upravený'}: ${partData.customerPartName || partData.internalPartName}`}
      >
        <div>

          {/* Typ dielu - Zjednotený komponent */}
          <TypeSelector
            value={partData.type}
            onChange={(type) => handleInputChange('type', type)}
            theme={theme}
            required={true}
          />

          {/* Zákaznické údaje */}
          <div style={{ display: 'grid', gridTemplateColumns: GRID_LAYOUTS.TWO_COLUMNS, gap: SPACING.STANDARD_GAP, marginBottom: LAYOUT_SIZES.MARGIN_BOTTOM }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: TYPOGRAPHY.LABEL_MARGIN_BOTTOM,
                fontSize: TYPOGRAPHY.LABEL_FONT_SIZE,
                fontWeight: '600',
                color: theme.text
              }}>
                Zákaznické číslo dielu
              </label>
              <input
                type="text"
                value={partData.customerPartNumber}
                onChange={(e) => handleInputChange('customerPartNumber', e.target.value)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
                placeholder="Napr. CUS-001-BRK"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: TYPOGRAPHY.LABEL_MARGIN_BOTTOM,
                fontSize: TYPOGRAPHY.LABEL_FONT_SIZE,
                fontWeight: '600',
                color: theme.text
              }}>
                Zákaznický názov dielu *
              </label>
              <input
                type="text"
                required
                value={partData.customerPartName}
                onChange={(e) => handleInputChange('customerPartName', e.target.value)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
                placeholder="Napr. Titanium Bracket"
              />
            </div>
          </div>

          {/* Interné údaje */}
          <div style={{ display: 'grid', gridTemplateColumns: GRID_LAYOUTS.TWO_COLUMNS, gap: SPACING.STANDARD_GAP, marginBottom: LAYOUT_SIZES.MARGIN_BOTTOM }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  fontWeight: '600',
                  color: theme.text,
                  marginRight: '8px'
                }}>
                  Interné číslo dielu *
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: TYPOGRAPHY.SMALL_FONT_SIZE,
                  color: theme.textMuted,
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={!autoGenerateInternal}
                    onChange={(e) => setAutoGenerateInternal(!e.target.checked)}
                    style={{ marginRight: '4px' }}
                  />
                  Upraviť manuálne
                </label>
              </div>
              <input
                type="text"
                required
                disabled={autoGenerateInternal}
                value={partData.internalPartNumber}
                onChange={(e) => handleInputChange('internalPartNumber', e.target.value)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: autoGenerateInternal ? COLORS.DISABLED_BACKGROUND : theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: autoGenerateInternal ? COLORS.DISABLED_TEXT : theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
                placeholder="Automaticky generované"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: TYPOGRAPHY.LABEL_MARGIN_BOTTOM,
                fontSize: TYPOGRAPHY.LABEL_FONT_SIZE,
                fontWeight: '600',
                color: theme.text
              }}>
                Interný názov dielu *
              </label>
              <input
                type="text"
                required
                value={partData.internalPartName}
                onChange={(e) => handleInputChange('internalPartName', e.target.value)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
                placeholder="Interný názov pre výrobu"
              />
            </div>
          </div>

          {/* Množstvo, jednotka a priorita */}
          <div style={{ display: 'grid', gridTemplateColumns: GRID_LAYOUTS.THREE_COLUMNS_MIXED, gap: SPACING.STANDARD_GAP, marginBottom: LAYOUT_SIZES.MARGIN_BOTTOM }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: TYPOGRAPHY.LABEL_MARGIN_BOTTOM,
                fontSize: TYPOGRAPHY.LABEL_FONT_SIZE,
                fontWeight: '600',
                color: theme.text
              }}>
                Množstvo *
              </label>
              <input
                type="number"
                min="1"
                required
                value={partData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: TYPOGRAPHY.LABEL_MARGIN_BOTTOM,
                fontSize: TYPOGRAPHY.LABEL_FONT_SIZE,
                fontWeight: '600',
                color: theme.text
              }}>
                Jednotka
              </label>
              <select
                value={partData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                style={{
                  width: '100%',
                  padding: LAYOUT_SIZES.INPUT_PADDING,
                  background: theme.inputBackground,
                  border: `2px solid ${theme.inputBorder}`,
                  borderRadius: LAYOUT_SIZES.BORDER_RADIUS,
                  color: theme.text,
                  fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                  boxSizing: 'border-box'
                }}
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            {/* Priorita dielu - Zjednotený komponent */}
            <PrioritySelector
              value={partData.priority}
              onChange={(priority) => handleInputChange('priority', priority)}
              theme={theme}
              size="medium"
              layout="horizontal"
            />
          </div>

          {/* Technológie výroby */}
          <div style={{ marginBottom: LAYOUT_SIZES.MARGIN_BOTTOM }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: LAYOUT_SIZES.GRID_GAP }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Technológie výroby ({partData.technologies.length})
              </label>
              {/* Technológie tlačidlo - Zjednotený komponent */}
              <AddItemButton
                onClick={() => setIsManufacturingTechOpen(true)}
                text="Pridať technológie"
                icon="🏭"
                variant="warning"
                size="small"
                theme={theme}
                count={partData.technologies.length}
                showCount={partData.technologies.length > 0}
              />
            </div>

            {partData.technologies.length > 0 && (
              <div style={{
                maxHeight: '150px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: CONTAINER_SIZES.CONTAINER_PADDING
              }}>
                {partData.technologies.map((tech, index) => (
                  <div key={tech.id} style={{
                    padding: CONTAINER_SIZES.ITEM_PADDING,
                    background: theme.hoverBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: theme.text, fontWeight: '600' }}>
                        {index + 1}. {tech.name}
                      </span>
                      <span style={{ color: theme.textMuted }}>
                        {tech.estimatedTime && `⏱️ ${tech.estimatedTime}`}
                      </span>
                    </div>
                    {tech.notes && (
                      <div style={{ color: theme.textMuted, marginTop: '2px' }}>
                        {tech.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Súbory - výkresy, plány */}
          <div style={{ marginBottom: LAYOUT_SIZES.MARGIN_BOTTOM }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: LAYOUT_SIZES.GRID_GAP }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text
              }}>
                Súbory - výkresy, plány ({selectedFiles.length})
              </label>
              <label style={{
                padding: CONTAINER_SIZES.BUTTON_PADDING,
                background: COLORS.BUTTON_GRADIENT,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: TYPOGRAPHY.SMALL_FONT_SIZE,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                📁 Pridať súbory
                <input
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.step,.stp,.igs,.iges,.jpg,.jpeg,.png,.bmp,.tiff"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div style={{
                maxHeight: '120px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: CONTAINER_SIZES.CONTAINER_PADDING
              }}>
                {selectedFiles.map((file, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: CONTAINER_SIZES.SMALL_ITEM_PADDING,
                    background: theme.hoverBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px'
                  }}>
                    <div>
                      <span style={{ color: theme.text, fontWeight: '600' }}>
                        📄 {file.name}
                      </span>
                      <span style={{ color: theme.textMuted, marginLeft: '8px' }}>
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      style={{
                        padding: '2px 6px',
                        background: COLORS.ERROR_BACKGROUND,
                        color: 'white',
                        border: 'none',
                        borderRadius: LAYOUT_SIZES.MICRO_BORDER_RADIUS,
                        cursor: 'pointer',
                        fontSize: TYPOGRAPHY.TINY_FONT_SIZE
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Poznámky */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.text
            }}>
              Poznámky
            </label>
            <textarea
              value={partData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: theme.inputBackground,
                border: `2px solid ${theme.inputBorder}`,
                borderRadius: '6px',
                color: theme.text,
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              placeholder="Špecifické požiadavky a poznámky k dielu..."
            />
          </div>

        </div>
      </ModalTemplate>

      {/* Manufacturing Technology Modal */}
      <ManufacturingTechnologyModal
        isOpen={isManufacturingTechOpen}
        onClose={() => setIsManufacturingTechOpen(false)}
        onSave={handleTechnologiesSave}
        theme={theme}
        initialTechnologies={partData.technologies}
        partType={partData.type}
      />
    </>
  );
};

export default SinglePartModal;