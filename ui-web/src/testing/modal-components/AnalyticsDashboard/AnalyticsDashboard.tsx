/*
 * ================================================================
 * SÚBOR: AnalyticsDashboard.tsx
 * CESTA: /ui-web/src/testing/modal-components/AnalyticsDashboard/AnalyticsDashboard.tsx
 * POPIS: Dashboard pre zobrazenie analytics a workflow optimalizácií
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 12:30:00
 * ================================================================
 */

import React, { useState, useEffect } from 'react';
import { analyticsTracker } from '../AnalyticsTracker';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  theme: any;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ isOpen, onClose, theme }) => {
  const [stats, setStats] = useState<any>({});
  const [workflowSteps, setWorkflowSteps] = useState<any[]>([]);
  const [optimizations, setOptimizations] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const modalStats = analyticsTracker.getModalStats();
      const workflow = analyticsTracker.getWorkflowSummary();
      const opts = analyticsTracker.generateWorkflowOptimizations();

      setStats(modalStats);
      setWorkflowSteps(workflow);
      setOptimizations(opts);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const exportData = () => {
    const data = analyticsTracker.exportAnalytics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (confirm('Vymazať všetky analytics data?')) {
      analyticsTracker.clearAnalytics();
      setStats({});
      setWorkflowSteps([]);
      setOptimizations([]);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: theme.cardBackground,
        borderRadius: '12px',
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        border: `1px solid ${theme.border}`
      }} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={{
          padding: '20px',
          borderBottom: `2px solid ${theme.border}`,
          background: theme.inputBackground
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '700',
                color: theme.text
              }}>
                📊 Analytics Dashboard
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: theme.textMuted
              }}>
                Workflow analytics a optimalizácie používateľského rozhrania
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={exportData}
                style={{
                  padding: '8px 12px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                💾 Export
              </button>
              <button
                onClick={clearData}
                style={{
                  padding: '8px 12px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                🗑️ Vymazať
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textMuted,
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: '20px' }}>

          {/* Modal Statistics */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#4CAF50',
              fontWeight: '600'
            }}>
              📈 Štatistiky modalov
            </h3>

            {Object.keys(stats).length === 0 ? (
              <p style={{ color: theme.textMuted }}>Zatiaľ nie sú k dispozícii žiadne dáta...</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                {Object.entries(stats).map(([modalName, stat]: [string, any]) => (
                  <div key={modalName} style={{
                    background: theme.hoverBackground,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 8px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: theme.text
                    }}>
                      {modalName}
                    </h4>
                    <div style={{ fontSize: '14px', color: theme.textMuted }}>
                      <div>⏱️ Priemerný čas: <strong>{(stat.avgDuration / 1000).toFixed(1)}s</strong></div>
                      <div>🎯 Úspešnosť: <strong>{stat.successRate}%</strong></div>
                      <div>📊 Celkom sedení: <strong>{stat.totalSessions}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optimizations */}
          {optimizations.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                color: '#FF9800',
                fontWeight: '600'
              }}>
                💡 Odporúčania na optimalizáciu
              </h3>

              {optimizations.map((opt, index) => (
                <div key={index} style={{
                  background: theme.hoverBackground,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: theme.text
                }}>
                  {opt}
                </div>
              ))}
            </div>
          )}

          {/* Workflow Steps */}
          {workflowSteps.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                color: '#9C27B0',
                fontWeight: '600'
              }}>
                🔄 Workflow kroky
              </h3>

              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px'
              }}>
                {workflowSteps.map((step, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: index < workflowSteps.length - 1 ? `1px solid ${theme.border}` : 'none',
                    background: step.success ? '#e8f5e8' : '#ffebee'
                  }}>
                    <div>
                      <span style={{
                        fontWeight: '600',
                        color: step.success ? '#4CAF50' : '#f44336'
                      }}>
                        {step.success ? '✅' : '❌'} {step.stepName}
                      </span>
                      <div style={{ fontSize: '12px', color: theme.textMuted }}>
                        {new Date(step.timestamp).toLocaleTimeString()} | {step.interactions} interakcií
                      </div>
                    </div>
                    <div style={{
                      fontWeight: '600',
                      color: theme.text
                    }}>
                      {(step.duration / 1000).toFixed(1)}s
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Stats */}
          <div style={{
            background: theme.inputBackground,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '16px',
            fontSize: '12px',
            color: theme.textMuted
          }}>
            <div><strong>📊 Real-time tracking je aktívny</strong></div>
            <div>• Každý modal sa automaticky sleduje</div>
            <div>• Kliknutia sa zaznamenávajú s koordinátmi a časom</div>
            <div>• Workflow sa automaticky generuje</div>
            <div>• Optimalizácie sa navrhujú na základe údajov</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;