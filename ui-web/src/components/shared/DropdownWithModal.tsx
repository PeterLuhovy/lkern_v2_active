/*
 * ================================================================
 * SÚBOR: DropdownWithModal.tsx
 * CESTA: /ui-web/src/components/shared/DropdownWithModal.tsx
 * POPIS: Zjednotený dropdown komponent s možnosťou otvoriť modal pre pridanie novej položky
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-12-25 14:35:00
 * ================================================================
 */

// === IMPORTS ===
import React, { useState, useRef, useEffect } from 'react';
import './DropdownWithModal.css';

// === INTERFACES ===
interface DropdownItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface DropdownWithModalProps {
  // Základné props
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  theme?: any;

  // Data a selection
  items: DropdownItem[];
  selectedItem: DropdownItem | null;
  onSelect: (item: DropdownItem | null) => void;

  // Modal handling
  onAddNew: () => void;
  addNewText?: string;
  addNewIcon?: string;

  // Filtering
  searchable?: boolean;
  filterText?: string;
  onFilterChange?: (text: string) => void;

  // Customization
  renderItem?: (item: DropdownItem) => React.ReactNode;
  renderSelected?: (item: DropdownItem) => React.ReactNode;

  // Callback props
  onOpen?: () => void;
  onClose?: () => void;
}

// === HLAVNÝ KOMPONENT ===
const DropdownWithModal: React.FC<DropdownWithModalProps> = ({
  label,
  placeholder = "Vyberte položku...",
  required = false,
  disabled = false,
  theme,

  items,
  selectedItem,
  onSelect,

  onAddNew,
  addNewText = "Pridať novú položku",
  addNewIcon = "➕",

  searchable = false,
  filterText = "",
  onFilterChange,

  renderItem,
  renderSelected,

  onOpen,
  onClose
}) => {

  // === STATE ===
  const [isOpen, setIsOpen] = useState(false);
  const [internalFilter, setInternalFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // === FILTER LOGIKA ===
  const currentFilter = searchable && onFilterChange ? filterText : internalFilter;
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(currentFilter.toLowerCase())
  );

  // === HELPER FUNKCIE ===
  const handleToggleOpen = () => {
    if (disabled) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleItemSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsOpen(false);
    setInternalFilter("");
    if (!searchable) {
      onFilterChange?.("");
    }
    onClose?.();
  };

  const handleAddNew = () => {
    onAddNew();
    setIsOpen(false);
    onClose?.();
  };

  const handleFilterChange = (value: string) => {
    if (searchable && onFilterChange) {
      onFilterChange(value);
    } else {
      setInternalFilter(value);
    }
  };

  // === CLICK OUTSIDE HANDLER ===
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // === KEYBOARD HANDLER ===
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // === RENDER ===
  return (
    <div
      ref={dropdownRef}
      className={`dropdown-with-modal ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
      style={{
        '--theme-input-background': theme?.inputBackground || '#ffffff',
        '--theme-input-border': theme?.inputBorder || '#ddd',
        '--theme-text': theme?.text || '#333333',
        '--theme-text-secondary': theme?.textSecondary || '#666666',
        '--theme-hover-background': theme?.hoverBackground || '#f5f5f5'
      } as React.CSSProperties}
    >
      {/* Label */}
      <label className="dropdown-with-modal__label">
        {label} {required && <span className="required">*</span>}
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        className="dropdown-with-modal__button"
        onClick={handleToggleOpen}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="dropdown-with-modal__selected">
          {selectedItem ? (
            renderSelected ? renderSelected(selectedItem) : selectedItem.name
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </span>
        <span className={`dropdown-with-modal__arrow ${isOpen ? 'expanded' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-with-modal__menu">
          {/* Search Input */}
          {searchable && (
            <div className="dropdown-with-modal__search">
              <input
                type="text"
                placeholder="Hľadať..."
                value={currentFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="dropdown-with-modal__search-input"
                autoFocus
              />
            </div>
          )}

          {/* Items List */}
          <div className="dropdown-with-modal__items">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="dropdown-with-modal__item"
                  onClick={() => handleItemSelect(item)}
                >
                  {renderItem ? renderItem(item) : item.name}
                </button>
              ))
            ) : (
              <div className="dropdown-with-modal__no-results">
                {currentFilter ? "Žiadne výsledky" : "Žiadne položky"}
              </div>
            )}

            {/* Add New Button */}
            <button
              type="button"
              className="dropdown-with-modal__add-new"
              onClick={handleAddNew}
            >
              <span className="dropdown-with-modal__add-icon">{addNewIcon}</span>
              <span className="dropdown-with-modal__add-text">{addNewText}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// === EXPORT ===
export default DropdownWithModal;