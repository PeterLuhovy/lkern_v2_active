/*
 * ================================================================
 * SÚBOR: AnalyticsTracker.tsx
 * CESTA: /ui-web/src/testing/customer-inquiries/AnalyticsTracker.tsx
 * POPIS: Centrálny systém pre sledovanie user interactions a workflow analytics
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 12:00:00
 * ================================================================
 */

export interface ModalTimeData {
  modalName: string;
  openTime: number;
  closeTime?: number;
  duration?: number;
  outcome: 'confirmed' | 'cancelled' | 'timeout';
  interactions: ClickInteraction[];
}

export interface ClickInteraction {
  timestamp: number;
  x: number;
  y: number;
  element: string;
  elementId?: string;
  elementClass?: string;
  action: 'click' | 'focus' | 'input' | 'scroll';
  timeSinceLastClick?: number;
  modalContext: string;
}

export interface WorkflowStep {
  stepName: string;
  duration: number;
  interactions: number;
  success: boolean;
  timestamp: number;
}

class AnalyticsTracker {
  private modalSessions: Map<string, ModalTimeData> = new Map();
  private lastClickTime: number = 0;
  private workflowSteps: WorkflowStep[] = [];

  // Modal time tracking
  startModalSession(modalName: string): string {
    const sessionId = `${modalName}_${Date.now()}`;
    const startTime = Date.now();

    this.modalSessions.set(sessionId, {
      modalName,
      openTime: startTime,
      outcome: 'cancelled', // default
      interactions: []
    });

    console.log(`📊 [ANALYTICS] Modal opened: ${modalName} at ${new Date(startTime).toLocaleTimeString()}`);
    return sessionId;
  }

  endModalSession(sessionId: string, outcome: 'confirmed' | 'cancelled' | 'timeout'): ModalTimeData | null {
    const session = this.modalSessions.get(sessionId);
    if (!session) return null;

    const closeTime = Date.now();
    const duration = closeTime - session.openTime;

    session.closeTime = closeTime;
    session.duration = duration;
    session.outcome = outcome;

    console.log(`📊 [ANALYTICS] Modal closed: ${session.modalName}`);
    console.log(`⏱️  Duration: ${(duration / 1000).toFixed(2)}s`);
    console.log(`🎯 Outcome: ${outcome}`);
    console.log(`🖱️  Interactions: ${session.interactions.length}`);

    // Add to workflow steps
    this.workflowSteps.push({
      stepName: session.modalName,
      duration,
      interactions: session.interactions.length,
      success: outcome === 'confirmed',
      timestamp: session.openTime
    });

    this.modalSessions.delete(sessionId);
    return { ...session };
  }

  // Click tracking
  trackClick(event: MouseEvent, modalContext: string): void {
    const currentTime = Date.now();
    const timeSinceLastClick = this.lastClickTime > 0 ? currentTime - this.lastClickTime : 0;

    const target = event.target as HTMLElement;
    const interaction: ClickInteraction = {
      timestamp: currentTime,
      x: event.clientX,
      y: event.clientY,
      element: target.tagName.toLowerCase(),
      elementId: target.id || undefined,
      elementClass: target.className || undefined,
      action: 'click',
      timeSinceLastClick: timeSinceLastClick > 0 ? timeSinceLastClick : undefined,
      modalContext
    };

    // Add to current modal sessions
    for (const [sessionId, session] of this.modalSessions.entries()) {
      if (session.modalName === modalContext) {
        session.interactions.push(interaction);
      }
    }

    console.log(`🖱️ [CLICK] ${interaction.element}${interaction.elementId ? '#' + interaction.elementId : ''} in ${modalContext}`);
    console.log(`📍 Position: (${interaction.x}, ${interaction.y})`);
    if (timeSinceLastClick > 0) {
      console.log(`⏰ Time since last click: ${(timeSinceLastClick / 1000).toFixed(2)}s`);
    }

    this.lastClickTime = currentTime;
  }

  // Track other interactions
  trackInput(element: string, modalContext: string): void {
    const currentTime = Date.now();
    const interaction: ClickInteraction = {
      timestamp: currentTime,
      x: 0,
      y: 0,
      element,
      action: 'input',
      modalContext
    };

    // Add to current modal sessions
    for (const [sessionId, session] of this.modalSessions.entries()) {
      if (session.modalName === modalContext) {
        session.interactions.push(interaction);
      }
    }

    console.log(`⌨️ [INPUT] ${element} in ${modalContext}`);
  }

  trackFocus(element: string, modalContext: string): void {
    const currentTime = Date.now();
    const interaction: ClickInteraction = {
      timestamp: currentTime,
      x: 0,
      y: 0,
      element,
      action: 'focus',
      modalContext
    };

    // Add to current modal sessions
    for (const [sessionId, session] of this.modalSessions.entries()) {
      if (session.modalName === modalContext) {
        session.interactions.push(interaction);
      }
    }

    console.log(`🎯 [FOCUS] ${element} in ${modalContext}`);
  }

  // Analytics reports
  getModalStats(): { [modalName: string]: { avgDuration: number, successRate: number, totalSessions: number } } {
    const stats: { [modalName: string]: { durations: number[], successes: number, total: number } } = {};

    this.workflowSteps.forEach(step => {
      if (!stats[step.stepName]) {
        stats[step.stepName] = { durations: [], successes: 0, total: 0 };
      }
      stats[step.stepName].durations.push(step.duration);
      if (step.success) stats[step.stepName].successes++;
      stats[step.stepName].total++;
    });

    const result: { [modalName: string]: { avgDuration: number, successRate: number, totalSessions: number } } = {};

    Object.keys(stats).forEach(modalName => {
      const modalStats = stats[modalName];
      const avgDuration = modalStats.durations.reduce((a, b) => a + b, 0) / modalStats.durations.length;
      const successRate = (modalStats.successes / modalStats.total) * 100;

      result[modalName] = {
        avgDuration: Math.round(avgDuration),
        successRate: Math.round(successRate * 100) / 100,
        totalSessions: modalStats.total
      };
    });

    return result;
  }

  getWorkflowSummary(): WorkflowStep[] {
    return [...this.workflowSteps].sort((a, b) => a.timestamp - b.timestamp);
  }

  // Generate automatic workflow suggestions
  generateWorkflowOptimizations(): string[] {
    const stats = this.getModalStats();
    const suggestions: string[] = [];

    Object.entries(stats).forEach(([modalName, stat]) => {
      if (stat.avgDuration > 60000) { // Over 1 minute
        suggestions.push(`⚠️ ${modalName}: Príliš dlhá doba vyplňania (${(stat.avgDuration / 1000).toFixed(1)}s). Zvážte zjednodušenie.`);
      }

      if (stat.successRate < 70) {
        suggestions.push(`❌ ${modalName}: Nízka úspešnosť (${stat.successRate}%). Možný problém s UX.`);
      }

      if (stat.successRate > 95 && stat.avgDuration < 30000) {
        suggestions.push(`✅ ${modalName}: Optimálny workflow (${stat.successRate}% úspešnosť, ${(stat.avgDuration / 1000).toFixed(1)}s).`);
      }
    });

    return suggestions;
  }

  // Export data for analysis
  exportAnalytics(): string {
    const data = {
      modalStats: this.getModalStats(),
      workflowSteps: this.getWorkflowSummary(),
      optimizations: this.generateWorkflowOptimizations(),
      exportTime: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }

  // Clear data
  clearAnalytics(): void {
    this.workflowSteps = [];
    this.modalSessions.clear();
    console.log('📊 [ANALYTICS] Data cleared');
  }
}

// Singleton instance
export const analyticsTracker = new AnalyticsTracker();

// React hook for easy integration
export const useModalAnalytics = (modalName: string) => {
  let sessionId: string | null = null;

  const startTracking = () => {
    sessionId = analyticsTracker.startModalSession(modalName);
    return sessionId;
  };

  const endTracking = (outcome: 'confirmed' | 'cancelled' | 'timeout') => {
    if (sessionId) {
      return analyticsTracker.endModalSession(sessionId, outcome);
    }
    return null;
  };

  const trackClick = (event: MouseEvent) => {
    analyticsTracker.trackClick(event, modalName);
  };

  const trackInput = (element: string) => {
    analyticsTracker.trackInput(element, modalName);
  };

  const trackFocus = (element: string) => {
    analyticsTracker.trackFocus(element, modalName);
  };

  return {
    startTracking,
    endTracking,
    trackClick,
    trackInput,
    trackFocus
  };
};

export default analyticsTracker;