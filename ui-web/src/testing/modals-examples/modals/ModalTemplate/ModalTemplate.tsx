/*
 * ================================================================
 * SÚBOR: ModalTemplate.tsx
 * CESTA: /ui-web/src/testing/modal-components/ModalTemplate/ModalTemplate.tsx
 * POPIS: Univerzálny template pre všetky modaly s analytics, ESC, scroll block + Design System
 * VERZIA: v2.0.0
 * UPRAVENÉ: 2024-09-25 23:30:00
 * ================================================================
 */

import React, { useEffect, useRef, useState } from 'react';
import { useModalAnalytics } from '../AnalyticsTracker';

// Design System - Centralizované design tokens pre všetky modaly
const DESIGN_TOKENS = {
  spacing: {
    xs: '4px',      // tight gaps (button groups)
    sm: '6px',      // label-to-input spacing
    md: '12px',     // STANDARD gap/padding
    lg: '16px',     // STANDARD marginBottom
    xl: '20px',     // section spacing
    xxl: '24px'     // large section spacing
  },
  typography: {
    fontSize: {
      tiny: '10px',     // small buttons
      small: '12px',    // technical details
      compact: '13px',  // compact text
      standard: '14px', // STANDARD labels/inputs
      medium: '16px',   // section headers
      large: '18px'     // main titles
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600'   // STANDARD for labels
    }
  },
  borderRadius: {
    standard: '6px',    // STANDARD inputs/buttons
    card: '8px',        // containers/cards
    large: '12px',      // modal containers
    pill: '16px'        // rounded buttons
  },
  colors: {
    primary: {
      gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)', // Green - primary actions
      hover: 'linear-gradient(135deg, #2E7D32, #1B5E20)'
    },
    secondary: {
      blue: '#3366cc',
      orange: '#f57c00',
      red: '#f44336',
      purple: '#9c27b0'
    },
    feedback: {
      success: '#4CAF50',
      warning: '#f57c00',
      error: '#f44336',
      info: '#3366cc'
    }
  },
  shadows: {
    modal: '0 20px 60px rgba(0, 0, 0, 0.3)',
    button: '0 2px 8px rgba(0, 0, 0, 0.15)',
    card: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
};

// Štandardné styled komponenty pre form elementy
export const createFormStyles = (theme: any) => ({
  // STANDARD Input Style - používaj všade v modaloch
  input: {
    padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
    background: theme.inputBackground,
    border: `2px solid ${theme.inputBorder}`,
    borderRadius: DESIGN_TOKENS.borderRadius.standard,
    color: theme.text,
    fontSize: DESIGN_TOKENS.typography.fontSize.standard,
    fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
    boxSizing: 'border-box' as const,
    width: '100%',
    fontFamily: 'inherit'
  },

  // STANDARD Label Style - používaj všade v modaloch
  label: {
    display: 'block' as const,
    marginBottom: DESIGN_TOKENS.spacing.sm,
    fontSize: DESIGN_TOKENS.typography.fontSize.standard,
    fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
    color: theme.text
  },

  // STANDARD Button Styles
  button: {
    primary: {
      padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.xl}`,
      background: DESIGN_TOKENS.colors.primary.gradient,
      color: 'white',
      border: 'none',
      borderRadius: DESIGN_TOKENS.borderRadius.standard,
      fontSize: DESIGN_TOKENS.typography.fontSize.standard,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: DESIGN_TOKENS.shadows.button
    },
    secondary: {
      padding: `${DESIGN_TOKENS.spacing.sm} ${DESIGN_TOKENS.spacing.md}`,
      background: DESIGN_TOKENS.colors.secondary.blue,
      color: 'white',
      border: 'none',
      borderRadius: DESIGN_TOKENS.borderRadius.standard,
      fontSize: DESIGN_TOKENS.typography.fontSize.standard,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    delete: {
      padding: `${DESIGN_TOKENS.spacing.xs} ${DESIGN_TOKENS.spacing.sm}`,
      background: DESIGN_TOKENS.colors.secondary.red,
      color: 'white',
      border: 'none',
      borderRadius: DESIGN_TOKENS.borderRadius.standard,
      fontSize: DESIGN_TOKENS.typography.fontSize.small,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      cursor: 'pointer'
    }
  },

  // STANDARD Layout Grids
  grid: {
    twoColumn: {
      display: 'grid' as const,
      gridTemplateColumns: '1fr 1fr',
      gap: DESIGN_TOKENS.spacing.md
    },
    threeColumn: {
      display: 'grid' as const,
      gridTemplateColumns: '1fr 100px 100px', // name + quantity + unit
      gap: DESIGN_TOKENS.spacing.md
    },
    nameQuantityUnit: {
      display: 'grid' as const,
      gridTemplateColumns: '1fr 100px 100px',
      gap: DESIGN_TOKENS.spacing.md
    }
  },

  // STANDARD Container Styles
  container: {
    section: {
      marginBottom: DESIGN_TOKENS.spacing.lg
    },
    card: {
      background: theme.hoverBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: DESIGN_TOKENS.borderRadius.card,
      padding: DESIGN_TOKENS.spacing.md,
      marginBottom: DESIGN_TOKENS.spacing.lg
    },
    formGroup: {
      marginBottom: DESIGN_TOKENS.spacing.lg
    },
    inputGroup: {
      marginBottom: DESIGN_TOKENS.spacing.md
    }
  },

  // STANDARD Typography
  heading: {
    h3: {
      margin: `0 0 ${DESIGN_TOKENS.spacing.md} 0`,
      fontSize: DESIGN_TOKENS.typography.fontSize.medium,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      color: theme.text
    },
    sectionTitle: {
      margin: `0 0 ${DESIGN_TOKENS.spacing.md} 0`,
      fontSize: DESIGN_TOKENS.typography.fontSize.medium,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      color: DESIGN_TOKENS.colors.secondary.purple
    }
  }
});

// Helper komponenty pre použitie v modaloch
export const FormLabel: React.FC<{ children: React.ReactNode; theme: any; required?: boolean }> =
  ({ children, theme, required = false }) => (
    <label style={{
      display: 'block',
      marginBottom: DESIGN_TOKENS.spacing.sm,
      fontSize: DESIGN_TOKENS.typography.fontSize.standard,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      color: theme.text
    }}>
      {children} {required && <span style={{ color: DESIGN_TOKENS.colors.secondary.red }}>*</span>}
    </label>
  );

export const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { theme: any }> =
  ({ theme, style, ...props }) => (
    <input
      {...props}
      style={{
        padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
        background: theme.inputBackground,
        border: `2px solid ${theme.inputBorder}`,
        borderRadius: DESIGN_TOKENS.borderRadius.standard,
        color: theme.text,
        fontSize: DESIGN_TOKENS.typography.fontSize.standard,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: 'inherit',
        ...style
      }}
    />
  );

export const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { theme: any }> =
  ({ theme, style, children, ...props }) => (
    <select
      {...props}
      style={{
        padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
        background: theme.inputBackground,
        border: `2px solid ${theme.inputBorder}`,
        borderRadius: DESIGN_TOKENS.borderRadius.standard,
        color: theme.text,
        fontSize: DESIGN_TOKENS.typography.fontSize.standard,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: 'inherit',
        ...style
      }}
    >
      {children}
    </select>
  );

export const FormTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { theme: any }> =
  ({ theme, style, ...props }) => (
    <textarea
      {...props}
      style={{
        padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
        background: theme.inputBackground,
        border: `2px solid ${theme.inputBorder}`,
        borderRadius: DESIGN_TOKENS.borderRadius.standard,
        color: theme.text,
        fontSize: DESIGN_TOKENS.typography.fontSize.standard,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.normal,
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: 'inherit',
        resize: 'vertical',
        ...style
      }}
    />
  );

export const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: any;
  variant?: 'primary' | 'secondary' | 'delete';
}> = ({ theme, variant = 'primary', style, children, ...props }) => {
  const buttonStyles = createFormStyles(theme).button;
  const variantStyle = buttonStyles[variant];

  return (
    <button
      {...props}
      style={{
        ...variantStyle,
        ...style
      }}
    >
      {children}
    </button>
  );
};

export const FormGrid: React.FC<{
  children: React.ReactNode;
  columns: 'two' | 'three' | 'nameQuantityUnit';
  gap?: string;
}> = ({ children, columns, gap = DESIGN_TOKENS.spacing.md }) => {
  const gridTemplateColumns =
    columns === 'two' ? '1fr 1fr' :
    columns === 'three' ? '1fr 1fr 1fr' :
    columns === 'nameQuantityUnit' ? '1fr 100px 100px' : '1fr';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns,
      gap
    }}>
      {children}
    </div>
  );
};

export const FormSection: React.FC<{
  children: React.ReactNode;
  title?: string;
  theme?: any;
}> = ({ children, title, theme }) => (
  <div style={{ marginBottom: DESIGN_TOKENS.spacing.lg }}>
    {title && theme && (
      <h3 style={{
        margin: `0 0 ${DESIGN_TOKENS.spacing.md} 0`,
        fontSize: DESIGN_TOKENS.typography.fontSize.medium,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
        color: DESIGN_TOKENS.colors.secondary.purple
      }}>
        {title}
      </h3>
    )}
    {children}
  </div>
);

// Export design tokens pre priame použitie v modaloch
export { DESIGN_TOKENS };

interface ModalTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  theme: any;
  modalName: string;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  maxHeight?: string;
  showConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
  showNotification?: boolean;
  notificationMessage?: string;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  isOpen,
  onClose,
  onConfirm,
  theme,
  modalName,
  title,
  subtitle,
  maxWidth = '600px',
  maxHeight = '90vh',
  showConfirmButton = true,
  confirmText = 'Uložiť (Ctrl+Enter)',
  cancelText = 'Zrušiť (Escape)',
  isSubmitting = false,
  children,
  showNotification = false,
  notificationMessage = ''
}) => {
  // Create form styles pre tento modal
  // const formStyles = createFormStyles(theme);
  // Analytics tracking
  const analytics = useModalAnalytics(modalName);
  const sessionIdRef = useRef<string | null>(null);
  const [debugStartTime, setDebugStartTime] = useState<number>(0);
  const [debugElapsedTime, setDebugElapsedTime] = useState<string>('0s');

  // Analytics tracking useEffect
  useEffect(() => {
    if (isOpen && !sessionIdRef.current) {
      const startTime = Date.now();
      setDebugStartTime(startTime);
      sessionIdRef.current = analytics.startTracking();
    } else if (!isOpen && sessionIdRef.current) {
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
      setDebugStartTime(0);
      setDebugElapsedTime('0s');
    }
  }, [isOpen, analytics]);

  // Debug timer useEffect
  useEffect(() => {
    if (!isOpen || debugStartTime === 0) return;

    const timer = setInterval(() => {
      const elapsed = Date.now() - debugStartTime;
      const seconds = Math.floor(elapsed / 1000);
      const ms = elapsed % 1000;
      setDebugElapsedTime(`${seconds}.${Math.floor(ms / 100)}s`);
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, debugStartTime]);

  // Block background scrolling
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      } else if ((e.key === 'Enter' && (e.ctrlKey || e.metaKey)) || (e.key === 'Enter' && showConfirmButton && onConfirm)) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSubmitting && onConfirm) {
          handleConfirm();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onConfirm, showConfirmButton]);

  // Copy modal name to clipboard
  const copyModalName = async () => {
    try {
      await navigator.clipboard.writeText(modalName);
    } catch (err) {
      console.log('Copy failed:', err);
    }
  };

  // Handle close
  const handleClose = () => {
    if (sessionIdRef.current) {
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
    }
    onClose();
  };

  // Handle confirm
  const handleConfirm = () => {
    if (sessionIdRef.current) {
      analytics.endTracking('confirmed');
      sessionIdRef.current = null;
    }
    if (onConfirm) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: DESIGN_TOKENS.spacing.xl
      }}
      onClick={(e) => {
        // Only close if clicking directly on the overlay, not on modal content
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div
        style={{
          background: theme.cardBackground,
          borderRadius: DESIGN_TOKENS.borderRadius.large,
          maxWidth,
          width: '100%',
          maxHeight,
          overflowY: 'auto',
          boxShadow: DESIGN_TOKENS.shadows.modal,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          pointerEvents: showNotification ? 'none' : 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* DEBUG HEADER */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '25px',
            background: 'linear-gradient(90deg, rgba(255,152,0,0.9), rgba(255,193,7,0.9))',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#333',
            fontWeight: '600',
            zIndex: 1001,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,152,0,0.5)',
            boxShadow: '0 2px 8px rgba(255,152,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🐛 {modalName}</span>
            <button
              onClick={copyModalName}
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '3px',
                padding: '1px 6px',
                cursor: 'pointer',
                fontSize: '9px',
                color: '#333',
                fontWeight: '500'
              }}
            >
              copy
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⏱️ {debugElapsedTime}</span>
          </div>
        </div>

        {/* HEADER */}
        <div
          style={{
            padding: DESIGN_TOKENS.spacing.xl,
            paddingTop: '45px',
            borderBottom: `2px solid ${theme.border}`,
            background: theme.inputBackground,
            opacity: showNotification ? 0.4 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
                  color: theme.text
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: '14px',
                    color: theme.textMuted
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                color: theme.textMuted,
                padding: '4px',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{
          padding: '20px',
          opacity: showNotification ? 0.4 : 1,
          transition: 'opacity 0.2s ease'
        }}>
          {children}
        </div>

        {/* FOOTER BUTTONS */}
        {showConfirmButton && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '20px',
              paddingTop: '0',
              borderTop: `1px solid ${theme.border}`,
              marginTop: '20px',
              opacity: showNotification ? 0.4 : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                background: theme.inputBackground,
                color: theme.text,
                border: `2px solid ${theme.border}`,
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              {cancelText}
            </button>

            {onConfirm && (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                style={{
                  padding: '10px 24px',
                  background: isSubmitting
                    ? '#999'
                    : 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '120px',
                  justifyContent: 'center'
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        animation: 'spin 1s linear infinite',
                        fontSize: '16px'
                      }}
                    >
                      ⟳
                    </span>
                    Ukladám...
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    {confirmText}
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* BUILT-IN NOTIFICATION */}
        {showNotification && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#e8f5e8',
            border: '2px solid #4CAF50',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 10,
            maxWidth: '400px',
            minWidth: '300px',
            pointerEvents: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{ fontSize: '24px' }}>✅</div>
              <div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#4CAF50'
                }}>
                  Úspech!
                </h3>
                <p style={{
                  margin: '0',
                  fontSize: '14px',
                  color: '#333',
                  lineHeight: '1.5'
                }}>
                  {notificationMessage}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ModalTemplate;