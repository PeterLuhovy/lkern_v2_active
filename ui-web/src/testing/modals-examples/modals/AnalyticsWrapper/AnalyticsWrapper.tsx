/*
 * ================================================================
 * SÚBOR: AnalyticsWrapper.tsx
 * CESTA: /ui-web/src/testing/modal-components/AnalyticsWrapper/AnalyticsWrapper.tsx
 * POPIS: Wrapper komponent pre automatické sledovanie modalov s analytics
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 12:15:00
 * ================================================================
 */

import React, { useEffect, useRef } from 'react';
import { useModalAnalytics } from '../AnalyticsTracker';

interface AnalyticsWrapperProps {
  modalName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({
  modalName,
  isOpen,
  onClose,
  onConfirm,
  children
}) => {
  const analytics = useModalAnalytics(modalName);
  const sessionIdRef = useRef<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Start tracking when modal opens
  useEffect(() => {
    if (isOpen && !sessionIdRef.current) {
      sessionIdRef.current = analytics.startTracking();
    }
  }, [isOpen, analytics]);

  // End tracking when modal closes
  useEffect(() => {
    if (!isOpen && sessionIdRef.current) {
      // Default to cancelled, will be overridden by confirmed if needed
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
    }
  }, [isOpen, analytics]);

  // Global click handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      analytics.trackClick(event);
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        analytics.trackInput(`${target.tagName.toLowerCase()}${(target as HTMLInputElement).type ? `[${(target as HTMLInputElement).type}]` : ''}`);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.tagName === 'BUTTON') {
        analytics.trackFocus(`${target.tagName.toLowerCase()}${(target as HTMLInputElement).type ? `[${(target as HTMLInputElement).type}]` : ''}`);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [isOpen, analytics]);

  // Wrapped close handler
  const handleClose = () => {
    if (sessionIdRef.current) {
      analytics.endTracking('cancelled');
      sessionIdRef.current = null;
    }
    onClose();
  };

  // Wrapped confirm handler
  const handleConfirm = () => {
    if (sessionIdRef.current) {
      analytics.endTracking('confirmed');
      sessionIdRef.current = null;
    }
    if (onConfirm) {
      onConfirm();
    }
  };

  // Clone children with wrapped handlers
  const wrappedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onClose: handleClose,
        onConfirm: handleConfirm,
        // Pass analytics context to children if they accept it
        analyticsContext: modalName
      });
    }
    return child;
  });

  if (!isOpen) return null;

  return (
    <div
      ref={wrapperRef}
      data-analytics-modal={modalName}
      style={{ position: 'relative', zIndex: 1000 }}
    >
      {wrappedChildren}
    </div>
  );
};

export default AnalyticsWrapper;