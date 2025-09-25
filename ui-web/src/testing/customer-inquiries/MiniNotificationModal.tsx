/*
 * ================================================================
 * SÚBOR: MiniNotificationModal.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/MiniNotificationModal.tsx
 * POPIS: Malý modal pre notifikácie namiesto alert() okien
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 10:15:00
 * ================================================================
 */

import React, { useEffect } from 'react';

interface MiniNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  autoCloseMs?: number;
  theme: any;
}

const MiniNotificationModal: React.FC<MiniNotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoCloseMs = 3000,
  theme
}) => {
  useEffect(() => {
    if (isOpen && autoCloseMs > 0) {
      const timer = setTimeout(onClose, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseMs, onClose]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: '✅',
      color: '#4CAF50',
      bgColor: '#e8f5e8',
      borderColor: '#4CAF50'
    },
    info: {
      icon: 'ℹ️',
      color: '#2196F3',
      bgColor: '#e3f2fd',
      borderColor: '#2196F3'
    },
    warning: {
      icon: '⚠️',
      color: '#FF9800',
      bgColor: '#fff8e1',
      borderColor: '#FF9800'
    },
    error: {
      icon: '❌',
      color: '#f44336',
      bgColor: '#ffebee',
      borderColor: '#f44336'
    }
  };

  const config = typeConfig[type];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>    {/* Removed onClick={onClose} - no click outside to close */}

      <div style={{
        background: config.bgColor,
        border: `2px solid ${config.borderColor}`,
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        minWidth: '300px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        animation: 'slideInScale 0.3s ease-out'
      }} onClick={(e) => e.stopPropagation()}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            fontSize: '24px',
            lineHeight: '1'
          }}>
            {config.icon}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: config.color
            }}>
              {title}
            </h3>

            <p style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.5'
            }}>
              {message}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px'
            }}>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  background: config.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                OK (Enter/Escape)
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#666',
              padding: '0',
              lineHeight: '1'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MiniNotificationModal;