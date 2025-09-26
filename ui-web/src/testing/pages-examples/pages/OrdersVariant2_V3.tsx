/**
 * ================================================================
 * SÚBOR: OrdersVariant2_V3.tsx
 * CESTA: /ui-web/src/testing/design-examples/OrdersVariant2_V3.tsx
 * POPIS: Orders Management V3 - V2 funkcionalita + Golden Ratio Design System
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2025-01-27 23:45:00
 * ================================================================
 */

/**
 * VARIANT 2 V3: L-KERN Professional s Complete Design System
 * Všetky frontend vylepšenia z V2 + Golden Ratio design principles
 * Unified typography, color system, spacing, a micro-interactions
 */
import React, { useState, useEffect } from 'react';
import lkernLogo from '../../../assets/logos/lkern-logo.png';
import luhovyLogo from '../../../assets/logos/luhovy-logo.png';
import DebugBar from '../components/DebugBar/DebugBar';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'IN_PRODUCTION' | 'COMPLETED' | 'INVOICED_UNPAID' | 'INVOICED_PAID' | 'CANCELLED' | 'COMPLAINT';
  date: string;
  value: number;
  items?: number;
}

// === STATUS BAR KOMPONENTY ===


interface StatusBarProps {
  currentUser: {
    name: string;
    position: string;
    department: string;
    avatar: string;
  };
  theme: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    headerBackground: string;
    shadow: string;
    inputBackground: string;
    inputBorder: string;
    hoverBackground: string;
  };
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentUser, theme, isDarkMode, toggleDarkMode }) => {
  const currentTheme = theme;
  const [isExpanded, setIsExpanded] = useState(false);

  // Backup state
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backupStatus, setBackupStatus] = useState('');
  const [lastBackupInfo, setLastBackupInfo] = useState<any>(null);

  // Simulované service dáta
  const services = {
    orders: { name: 'Orders Service', status: 'healthy' as const, critical: true, response_time: 42 },
    customers: { name: 'Customers Service', status: 'healthy' as const, critical: true, response_time: 38 },
    parts: { name: 'Parts Service', status: 'healthy' as const, critical: false, response_time: 51 }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'unhealthy': return '#FF9800';
      case 'down': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'healthy': return '●';
      case 'unhealthy': return '⚠';
      case 'down': return '●';
      default: return '?';
    }
  };

  // Backup funkcionalita (simulované pre demo)
  const fetchLastBackupInfo = async () => {
    // Demo simulácia - v skutočnosti by volalo API
    setLastBackupInfo({
      completed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hodiny dozadu
      files: 15,
      status: 'completed'
    });
  };

  const handleBackup = async () => {
    try {
      setIsBackupRunning(true);
      setBackupProgress(0);
      setBackupStatus('Spúšťa sa backup...');

      // Simulované backup progress (v skutočnosti by volalo API)
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setIsBackupRunning(false);
          setBackupStatus('✅ Backup dokončený (15 súborov)');

          // Refresh last backup info
          setTimeout(() => {
            fetchLastBackupInfo();
            setBackupStatus('');
          }, 3000);
        }
        setBackupProgress(Math.round(progress));
        setBackupStatus(`Backup: spracováva sa... (${Math.round(progress/10)}/10)`);
      }, 500);

    } catch (error) {
      console.error('Error starting backup:', error);
      setIsBackupRunning(false);
      setBackupStatus('Chyba pri spúšťaní backup');
    }
  };

  // Simulované načítanie last backup info pri starte
  React.useEffect(() => {
    fetchLastBackupInfo();
  }, []);

  // Click outside to close status bar
  const statusBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusBarRef.current && !statusBarRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div
      ref={statusBarRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: currentTheme.cardBackground,
        borderTop: `1px solid ${currentTheme.border}`,
        boxShadow: currentTheme.shadow,
        zIndex: 100,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
      {/* ZÁKLADNÝ STATUS RIADOK */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          minHeight: '32px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentTheme.hoverBackground;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span style={{
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#4CAF50'
          }}>
            ● Všetky služby fungujú
          </span>

          <span style={{ fontSize: '13px', color: currentTheme.textMuted, fontWeight: '500' }}>
            (3/3 služieb)
          </span>

          <span style={{ fontSize: '12px', color: currentTheme.textMuted }}>
            • Aktualizované {new Date().toLocaleTimeString('sk-SK')}
          </span>

          {/* User info separator */}
          <span style={{ fontSize: '12px', color: currentTheme.border, margin: '0 8px' }}>|</span>

          {/* Current user info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: currentTheme.textMuted
          }}>
            <span style={{ fontSize: '16px' }}>{currentUser.avatar}</span>
            <span style={{ fontWeight: '600', color: currentTheme.text }}>{currentUser.name}</span>
            <span style={{ color: currentTheme.textMuted }}>•</span>
            <span style={{ color: '#9c27b0', fontWeight: '500', fontSize: '13px' }}>{currentUser.position}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Dark/Light mode toggle - moved to right side */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '14px' }}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              style={{
                width: '40px',
                height: '20px',
                borderRadius: '10px',
                background: isDarkMode ? '#3366cc' : '#9c27b0',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                border: `1px solid ${isDarkMode ? '#2c5aa0' : '#6a1b9a'}`
              }}
              title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '1px',
                left: isDarkMode ? '21px' : '1px',
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Force refresh logic
            }}
            style={{
              background: 'none',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: currentTheme.textMuted,
              transition: 'all 0.2s ease'
            }}
            title="Manuálna aktualizácia"
          >
            ↻
          </button>
          <span style={{ color: currentTheme.textMuted, fontSize: '12px' }}>
            {isExpanded ? '▼' : '▲'}
          </span>
        </div>
      </div>

      {/* ROZŠÍRENÝ DETAIL */}
      {isExpanded && (
        <div style={{
          borderTop: `1px solid ${currentTheme.border}`,
          background: currentTheme.hoverBackground,
          padding: '16px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {/* Kritické služby */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: `1px solid ${currentTheme.border}`,
              background: currentTheme.headerBackground,
              padding: '8px 12px',
              borderRadius: '4px'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: currentTheme.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Kritické služby</h4>
              <span style={{ fontSize: '11px', color: currentTheme.textMuted, fontWeight: '500' }}>
                (2/2)
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {Object.entries(services).filter(([_, service]) => service.critical).map(([serviceId, service]) => (
                <div
                  key={serviceId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    borderTop: `1px solid ${currentTheme.border}`,
                    borderRight: `1px solid ${currentTheme.border}`,
                    borderBottom: `1px solid ${currentTheme.border}`,
                    borderLeft: '3px solid #f44336',
                    background: currentTheme.cardBackground,
                    fontSize: '12px',
                    minWidth: '120px'
                  }}
                  title={`${service.name}: ${service.status} (${service.response_time}ms)`}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    minWidth: '16px',
                    textAlign: 'center',
                    color: getStatusColor(service.status)
                  }}>
                    {getStatusIcon(service.status)}
                  </span>
                  <span style={{
                    fontWeight: '500',
                    color: currentTheme.text,
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name}</span>
                  <span style={{ fontSize: '10px', color: currentTheme.textMuted, fontWeight: '400' }}>
                    {service.response_time}ms
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ostatné služby */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: `1px solid ${currentTheme.border}`,
              background: currentTheme.headerBackground,
              padding: '8px 12px',
              borderRadius: '4px'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: currentTheme.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Ostatné služby</h4>
              <span style={{ fontSize: '11px', color: currentTheme.textMuted, fontWeight: '500' }}>
                (1/1)
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {Object.entries(services).filter(([_, service]) => !service.critical).map(([serviceId, service]) => (
                <div
                  key={serviceId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    borderTop: `1px solid ${currentTheme.border}`,
                    borderRight: `1px solid ${currentTheme.border}`,
                    borderBottom: `1px solid ${currentTheme.border}`,
                    borderLeft: '3px solid #2196f3',
                    background: currentTheme.cardBackground,
                    fontSize: '12px',
                    minWidth: '120px'
                  }}
                  title={`${service.name}: ${service.status} (${service.response_time}ms)`}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    minWidth: '16px',
                    textAlign: 'center',
                    color: getStatusColor(service.status)
                  }}>
                    {getStatusIcon(service.status)}
                  </span>
                  <span style={{
                    fontWeight: '500',
                    color: currentTheme.text,
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name}</span>
                  <span style={{ fontSize: '10px', color: currentTheme.textMuted, fontWeight: '400' }}>
                    {service.response_time}ms
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Databázy */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: `1px solid ${currentTheme.border}`,
              background: currentTheme.headerBackground,
              padding: '8px 12px',
              borderRadius: '4px'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: currentTheme.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Databázy</h4>
              <span style={{ fontSize: '11px', color: currentTheme.textMuted, fontWeight: '500' }}>
                (3/3)
              </span>

              {/* BACKUP INFO - v databázovom riadku */}
              {lastBackupInfo && !isBackupRunning && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '13px',
                  color: '#28a745',
                  fontWeight: '500'
                }}>
                  Posledný backup: {lastBackupInfo.completed_at ?
                    new Date(lastBackupInfo.completed_at).toLocaleString('sk-SK') :
                    'nikdy'
                  }
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {/* Databázové služby */}
              {Object.entries(services).map(([serviceId, service]) => (
                <div
                  key={`${serviceId}_db`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    borderTop: `1px solid ${currentTheme.border}`,
                    borderRight: `1px solid ${currentTheme.border}`,
                    borderBottom: `1px solid ${currentTheme.border}`,
                    borderLeft: '3px solid #9c27b0',
                    background: currentTheme.inputBackground,
                    fontSize: '12px',
                    minWidth: '120px'
                  }}
                  title={`${service.name} DB: healthy (${service.response_time}ms)`}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    minWidth: '16px',
                    textAlign: 'center',
                    color: getStatusColor('healthy')
                  }}>
                    🗄️
                  </span>
                  <span style={{
                    fontWeight: '500',
                    color: currentTheme.text,
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name} DB</span>
                  <span style={{ fontSize: '10px', color: currentTheme.textMuted, fontWeight: '400' }}>
                    {service.response_time}ms
                  </span>
                </div>
              ))}

              {/* BACKUP TLAČIDLO - rovnaké ako databázové záložky */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isBackupRunning) handleBackup();
                }}
                title={isBackupRunning ? `Backup prebíha... ${backupProgress}%` : "Zálohovať všetky databázy"}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  borderTop: '1px solid #e5e5e5',
                  borderRight: '1px solid #e5e5e5',
                  borderBottom: '1px solid #e5e5e5',
                  borderLeft: isBackupRunning ? '3px solid #2196f3' : '3px solid #ff9800',
                  background: isBackupRunning ?
                    'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' :
                    'linear-gradient(135deg, #fff3e0 0%, #ffecb3 100%)',
                  fontSize: '12px',
                  minWidth: '120px',
                  cursor: isBackupRunning ? 'not-allowed' : 'pointer',
                  opacity: isBackupRunning ? 0.7 : 1,
                  boxShadow: isBackupRunning ?
                    '0 1px 3px rgba(33, 150, 243, 0.2)' :
                    '0 1px 3px rgba(255, 152, 0, 0.2)',
                  transition: 'all 0.2s ease',
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => {
                  if (!isBackupRunning) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)';
                    e.currentTarget.style.borderColor = '#f57c00';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(255, 152, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isBackupRunning) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #fff3e0 0%, #ffecb3 100%)';
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(255, 152, 0, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  minWidth: '16px',
                  textAlign: 'center',
                  color: isBackupRunning ? '#1976d2' : '#007bff',
                  backgroundColor: 'transparent'
                }}>
                  {isBackupRunning ? '🔄' : '💾'}
                </span>

                <span style={{
                  fontWeight: '500',
                  color: currentTheme.text,
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {isBackupRunning ? 'Backup prebíha...' : 'Zálohovať DB'}
                </span>

                <span style={{ fontSize: '10px', color: currentTheme.textMuted, fontWeight: '400' }}>
                  {isBackupRunning ? `${backupProgress}%` : 'OneClick'}
                </span>
              </div>
            </div>

            {/* BACKUP PROGRESS */}
            {isBackupRunning && (
              <div style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                fontSize: '11px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <span>{backupStatus}</span>
                  <span>{backupProgress}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${backupProgress}%`,
                    height: '100%',
                    backgroundColor: '#007bff',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}

            {/* BACKUP STATUS MESSAGE */}
            {backupStatus && !isBackupRunning && (
              <div style={{
                marginTop: '8px',
                padding: '6px 8px',
                backgroundColor: backupStatus.includes('✅') ? '#d4edda' :
                                backupStatus.includes('⚠️') ? '#fff3cd' :
                                backupStatus.includes('❌') ? '#f8d7da' : '#f8f9fa',
                borderRadius: '4px',
                fontSize: '11px',
                color: currentTheme.text
              }}>
                {backupStatus}
              </div>
            )}
          </div>

          {/* Footer info */}
          <div style={{
            marginTop: '12px',
            paddingTop: '8px',
            borderTop: `1px solid ${currentTheme.border}`,
            textAlign: 'center',
            color: currentTheme.textMuted,
            background: 'rgba(108, 117, 125, 0.05)',
            borderRadius: '4px',
            padding: '8px'
          }}>
            <small style={{ fontSize: '10px', lineHeight: '1.4' }}>
              * Systém 100% funkčný • 3/3 služieb • Response times 38-51ms
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

// === REPORT BUTTON KOMPONENTY ===

const ReportButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        title="Report bug or suggest improvement"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #fd7e14, #e8590c)',
          border: 'none',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(253, 126, 20, 0.4)',
          cursor: 'pointer',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(253, 126, 20, 0.5)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #e8590c, #dc5400)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(253, 126, 20, 0.4)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #fd7e14, #e8590c)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
      >
        <span style={{
          fontSize: '20px',
          marginBottom: '2px',
          transition: 'transform 0.2s ease',
          color: 'white'
        }}>!</span>
        <span style={{
          fontSize: '9px',
          fontWeight: '600',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: 1
        }}>Report</span>
      </button>

      {/* Jednoduchý modal pre demo */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setIsModalOpen(false)}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 16px 0', color: '#222' }}>Nahlásiť problém</h3>
            <p style={{ margin: '0 0 16px 0', color: '#888' }}>
              Tento modal by obsahoval formulár pre nahlasovanie chýb a návrhov na vylepšenia.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: '#fd7e14',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Zavrieť
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// === HLAVNÝ KOMPONENT ===

const OrdersVariant2_V3: React.FC = () => {
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('lkern_orders_settings_v2');
      if (saved) {
        const settings = JSON.parse(saved);
        return {
          isDarkMode: settings.isDarkMode || false,
          columnWidths: settings.columnWidths || [60, 180, 140, 300, 200, 120, 200],
          statusFilter: new Set<string>(settings.statusFilter || ['PENDING', 'IN_PRODUCTION', 'COMPLETED', 'INVOICED_UNPAID', 'INVOICED_PAID', 'CANCELLED', 'COMPLAINT']),
          priorityFilter: new Set<string>(settings.priorityFilter || ['LOW', 'NORMAL', 'HIGH', 'CRITICAL']),
          itemsPerPage: settings.itemsPerPage || 20
        };
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage:', e);
    }
    return {
      isDarkMode: false,
      columnWidths: [60, 180, 140, 300, 200, 120, 200],
      statusFilter: new Set(['PENDING', 'IN_PRODUCTION', 'COMPLETED', 'INVOICED_UNPAID', 'INVOICED_PAID', 'CANCELLED', 'COMPLAINT']),
      priorityFilter: new Set(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']),
      itemsPerPage: 20
    };
  };

  const initialSettings = loadSettings();

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilters, setQuickFilters] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<string>>(initialSettings.statusFilter);
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(initialSettings.priorityFilter);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialSettings.isDarkMode);

  // BULK OPERATIONS STATE
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  // MOBILE RESPONSIVE STATE
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Media query hook
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + F: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }

      // Ctrl/Cmd + A: Select all visible orders
      if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.target !== document.querySelector('input[type="text"]')) {
        e.preventDefault();
        handleSelectAll();
      }

      // Escape: Clear selections and search
      if (e.key === 'Escape') {
        if (selectedOrders.size > 0) {
          clearSelection();
        } else if (searchQuery || quickFilters.size > 0) {
          setSearchQuery('');
          setQuickFilters(new Set());
        }
      }

      // Delete: Bulk delete selected orders
      if (e.key === 'Delete' && selectedOrders.size > 0) {
        e.preventDefault();
        if (confirm(`Delete ${selectedOrders.size} selected orders?`)) {
          handleBulkDelete();
        }
      }

      // Ctrl/Cmd + N: Focus New Order button (simulate)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const newOrderBtn = document.querySelector('button[title="Vytvoriť novú objednávku"]') as HTMLElement;
        newOrderBtn?.focus();
      }

      // ?: Show keyboard shortcuts help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setShowShortcuts(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrders, searchQuery, quickFilters]);

  // Column widths and resizing
  const [columnWidths, setColumnWidths] = useState<number[]>(initialSettings.columnWidths);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizingColumn, setResizingColumn] = useState<number>(-1);
  const resizeStartX = React.useRef<number>(0);
  const resizeStartWidth = React.useRef<number>(0);

  // Sorting state
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Items per page state
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialSettings.itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Keyboard shortcuts helper
  const [showShortcuts, setShowShortcuts] = useState(false);

  // THEME CUSTOMIZATION STATE
  const [customThemeSettings, setCustomThemeSettings] = useState({
    compactMode: false,
    highContrast: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    accentColor: '#9c27b0',
    showAnimations: true
  });
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);

  // Current user info
  const currentUser = {
    name: 'Ing. Martin Novák',
    position: 'Vedúci výroby',
    department: 'Manufacturing Operations',
    avatar: '👨‍💼'
  };

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        isDarkMode,
        columnWidths,
        statusFilter: Array.from(statusFilter),
        priorityFilter: Array.from(priorityFilter),
        itemsPerPage,
        customThemeSettings
      };
      localStorage.setItem('lkern_orders_settings_v2', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  };

  // Theme customization handlers
  const handleThemeSettingChange = (setting: string, value: any) => {
    setCustomThemeSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Save settings when they change
  React.useEffect(() => {
    saveSettings();
  }, [isDarkMode, columnWidths, statusFilter, priorityFilter, itemsPerPage, customThemeSettings]);

  // Professional enterprise data - 20 objednávok s rôznymi statusmi
  const orders: Order[] = [
    {
      id: '001',
      orderNumber: 'ORD-LCVV-240924-001-LMT',
      customer: 'Lockheed Martin Corporation',
      priority: 'CRITICAL',
      status: 'PENDING',
      date: '2024-09-24',
      value: 12500000,
      items: 127
    },
    {
      id: '002',
      orderNumber: 'ORD-LIND-240923-002-BAE',
      customer: 'BAE Systems plc',
      priority: 'HIGH',
      status: 'IN_PRODUCTION',
      date: '2024-09-23',
      value: 8900000,
      items: 89
    },
    {
      id: '003',
      orderNumber: 'ORD-LCVV-240922-003-RTN',
      customer: 'Raytheon Technologies',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-22',
      value: 5200000,
      items: 156
    },
    {
      id: '004',
      orderNumber: 'ORD-LCVV-240921-004-GDY',
      customer: 'General Dynamics Corporation',
      priority: 'HIGH',
      status: 'INVOICED_UNPAID',
      date: '2024-09-21',
      value: 7800000,
      items: 98
    },
    {
      id: '005',
      orderNumber: 'ORD-LIND-240920-005-NOC',
      customer: 'Northrop Grumman Corporation',
      priority: 'CRITICAL',
      status: 'INVOICED_PAID',
      date: '2024-09-20',
      value: 14200000,
      items: 203
    },
    {
      id: '006',
      orderNumber: 'ORD-LCVV-240919-006-BOE',
      customer: 'Boeing Defense Systems',
      priority: 'NORMAL',
      status: 'CANCELLED',
      date: '2024-09-19',
      value: 6100000,
      items: 76
    },
    {
      id: '007',
      orderNumber: 'ORD-LIND-240918-007-LHM',
      customer: 'L3Harris Technologies',
      priority: 'LOW',
      status: 'COMPLAINT',
      date: '2024-09-18',
      value: 3400000,
      items: 42
    },
    {
      id: '008',
      orderNumber: 'ORD-LCVV-240917-008-TST',
      customer: 'Textron Systems',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-17',
      value: 4900000,
      items: 68
    },
    {
      id: '009',
      orderNumber: 'ORD-LIND-240916-009-HII',
      customer: 'Huntington Ingalls Industries',
      priority: 'NORMAL',
      status: 'IN_PRODUCTION',
      date: '2024-09-16',
      value: 9300000,
      items: 134
    },
    {
      id: '010',
      orderNumber: 'ORD-LCVV-240915-010-AER',
      customer: 'Aerojet Rocketdyne',
      priority: 'LOW',
      status: 'COMPLETED',
      date: '2024-09-15',
      value: 2700000,
      items: 38
    },
    {
      id: '011',
      orderNumber: 'ORD-LCVV-240914-011-COL',
      customer: 'Collins Aerospace',
      priority: 'HIGH',
      status: 'INVOICED_UNPAID',
      date: '2024-09-14',
      value: 6800000,
      items: 92
    },
    {
      id: '012',
      orderNumber: 'ORD-LIND-240913-012-UTC',
      customer: 'UTC Aerospace Systems',
      priority: 'CRITICAL',
      status: 'INVOICED_PAID',
      date: '2024-09-13',
      value: 11200000,
      items: 178
    },
    {
      id: '013',
      orderNumber: 'ORD-LCVV-240912-013-SAF',
      customer: 'Safran Group',
      priority: 'NORMAL',
      status: 'CANCELLED',
      date: '2024-09-12',
      value: 4100000,
      items: 56
    },
    {
      id: '014',
      orderNumber: 'ORD-LIND-240911-014-THR',
      customer: 'Thales Group',
      priority: 'LOW',
      status: 'COMPLAINT',
      date: '2024-09-11',
      value: 3900000,
      items: 63
    },
    {
      id: '015',
      orderNumber: 'ORD-LCVV-240910-015-LEO',
      customer: 'Leonardo S.p.A.',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-10',
      value: 7300000,
      items: 104
    },
    {
      id: '016',
      orderNumber: 'ORD-LIND-240909-016-AIR',
      customer: 'Airbus Defence and Space',
      priority: 'CRITICAL',
      status: 'IN_PRODUCTION',
      date: '2024-09-09',
      value: 15800000,
      items: 234
    },
    {
      id: '017',
      orderNumber: 'ORD-LCVV-240908-017-EMB',
      customer: 'Embraer Defense',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-08',
      value: 5700000,
      items: 81
    },
    {
      id: '018',
      orderNumber: 'ORD-LIND-240907-018-KAI',
      customer: 'Korea Aerospace Industries',
      priority: 'HIGH',
      status: 'INVOICED_UNPAID',
      date: '2024-09-07',
      value: 8400000,
      items: 119
    },
    {
      id: '019',
      orderNumber: 'ORD-LCVV-240906-019-TAI',
      customer: 'Turkish Aerospace Industries',
      priority: 'LOW',
      status: 'INVOICED_PAID',
      date: '2024-09-06',
      value: 4500000,
      items: 67
    },
    {
      id: '020',
      orderNumber: 'ORD-LIND-240905-020-SAA',
      customer: 'SAAB AB',
      priority: 'NORMAL',
      status: 'COMPLAINT',
      date: '2024-09-05',
      value: 6200000,
      items: 94
    }
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedOrders(newExpanded);
  };

  const handleStatusFilterChange = (status: string) => {
    const newFilter = new Set(statusFilter);
    if (newFilter.has(status)) {
      newFilter.delete(status);
    } else {
      newFilter.add(status);
    }
    setStatusFilter(newFilter);
  };

  const handlePriorityFilterChange = (priority: string) => {
    const newFilter = new Set(priorityFilter);
    if (newFilter.has(priority)) {
      newFilter.delete(priority);
    } else {
      newFilter.add(priority);
    }
    setPriorityFilter(newFilter);
  };

  // BULK OPERATIONS HANDLERS
  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedOrders.size === paginatedOrders.length) {
      setSelectedOrders(new Set());
      setShowBulkActions(false);
    } else {
      const allIds = new Set(paginatedOrders.map(order => order.id));
      setSelectedOrders(allIds);
      setShowBulkActions(true);
    }
  };

  const handleBulkStatusChange = (newStatus: string) => {
    // Simulácia - v production by volalo API
    alert(`Bulk status change to ${newStatus} for ${selectedOrders.size} orders`);
    setSelectedOrders(new Set());
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    // Simulácia - v production by volalo API
    if (confirm(`Delete ${selectedOrders.size} selected orders?`)) {
      alert(`${selectedOrders.size} orders deleted`);
      setSelectedOrders(new Set());
      setShowBulkActions(false);
    }
  };

  const clearSelection = () => {
    setSelectedOrders(new Set());
    setShowBulkActions(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#d32f2f';
      case 'HIGH': return '#f57c00';
      case 'NORMAL': return '#3366cc';
      case 'LOW': return '#388e3c';
      default: return '#616161';
    }
  };

  // Enhanced Theme System with Customization
  const getTheme = () => {
    const baseTheme = {
      light: {
        background: customThemeSettings.highContrast ? '#ffffff' : '#f2f3f7',
        cardBackground: customThemeSettings.highContrast ? '#f8f9fa' : '#ffffff',
        text: customThemeSettings.highContrast ? '#000000' : '#222222',
        textSecondary: customThemeSettings.highContrast ? '#333333' : '#495057',
        textMuted: customThemeSettings.highContrast ? '#555555' : '#666',
        border: customThemeSettings.highContrast ? '#000000' : '#dee2e6',
        headerBackground: customThemeSettings.highContrast ? '#e0e0e0' : '#d5d6dd',
        shadow: customThemeSettings.highContrast
          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        inputBackground: customThemeSettings.highContrast ? '#ffffff' : '#f2f3f7',
        inputBorder: customThemeSettings.highContrast ? '#000000' : '#dee2e6',
        hoverBackground: customThemeSettings.highContrast ? '#f0f0f0' : '#f8f9fa'
      },
      dark: {
        background: customThemeSettings.highContrast ? '#000000' : '#1a1a1a',
        cardBackground: customThemeSettings.highContrast ? '#1a1a1a' : '#2d2d2d',
        text: customThemeSettings.highContrast ? '#ffffff' : '#e0e0e0',
        textSecondary: customThemeSettings.highContrast ? '#cccccc' : '#b0b0b0',
        textMuted: customThemeSettings.highContrast ? '#aaaaaa' : '#888',
        border: customThemeSettings.highContrast ? '#ffffff' : '#404040',
        headerBackground: customThemeSettings.highContrast ? '#333333' : '#383838',
        shadow: customThemeSettings.highContrast
          ? '0 4px 12px rgba(255, 255, 255, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        inputBackground: customThemeSettings.highContrast ? '#000000' : '#4a4a4a',
        inputBorder: customThemeSettings.highContrast ? '#ffffff' : '#666666',
        hoverBackground: customThemeSettings.highContrast ? '#333333' : '#404040'
      }
    };

    return isDarkMode ? baseTheme.dark : baseTheme.light;
  };

  const currentTheme = getTheme();

  // Compact mode spacing
  const getSpacing = (base: string) => {
    if (!customThemeSettings.compactMode) return base;
    const spacing = parseFloat(base.replace(/px|rem|em/, ''));
    const unit = base.replace(/[0-9.]/g, '');
    return `${spacing * 0.75}${unit}`;
  };

  // Animation settings
  const getTransition = (transition: string) => {
    return customThemeSettings.showAnimations ? transition : 'none';
  };

  const getStatusColor = (status: string, forDarkMode: boolean = isDarkMode) => {
    if (forDarkMode) {
      // Dark mode farby - svetlejšie a kontrastnejšie
      switch (status) {
        case 'PENDING': return '#ffc107';           // Žltá - čakajúce
        case 'IN_PRODUCTION': return '#ff9800';     // Oranžová - vo výrobe
        case 'COMPLETED': return '#ddb3e7';         // Slabo fialová - vyrobené
        case 'INVOICED_UNPAID': return '#90caf9';   // Svetlá modrá
        case 'INVOICED_PAID': return '#66bb6a';     // Svetlá zelená
        case 'CANCELLED': return '#757575';         // Tmavá šedá
        case 'COMPLAINT': return '#e57373';         // Výrazná červená pre dark mode
        default: return '#888888';
      }
    } else {
      // Light mode farby
      switch (status) {
        case 'PENDING': return '#ffc107';           // Žltá - čakajúce
        case 'IN_PRODUCTION': return '#f57c00';     // Oranžová - vo výrobe
        case 'COMPLETED': return '#ddb3e7';         // Slabo fialová - vyrobené
        case 'INVOICED_UNPAID': return '#bbdefb';   // Bledá modrá
        case 'INVOICED_PAID': return '#4caf50';     // Silná zelená
        case 'CANCELLED': return '#e0e0e0';         // Bledá šedá
        case 'COMPLAINT': return '#f44336';         // Výrazná červená
        default: return '#616161';
      }
    }
  };

  // Funkcia pre získanie písmena statusu
  const getStatusPrefix = (status: string) => {
    switch (status) {
      case 'PENDING': return 'A -';
      case 'IN_PRODUCTION': return 'B -';
      case 'COMPLETED': return 'C -';
      case 'INVOICED_UNPAID': return 'D -';
      case 'INVOICED_PAID': return 'E -';
      case 'COMPLAINT': return 'F -';
      case 'CANCELLED': return 'H -';
      default: return '';
    }
  };

  // Funkcia pre získanie farby pozadia riadku
  const getRowBackgroundColor = (status: string, isExpanded: boolean) => {
    const baseColor = getStatusColor(status);
    return isExpanded ? baseColor : `${baseColor}80`; // 50% priehľadnosť pre zbalené riadky
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Column headers configuration
  const columns = [
    { title: '☑️', field: '', sortable: false },
    { title: 'Stav Objednávky', field: 'status', sortable: true },
    { title: 'Dátum Prijatia', field: 'date', sortable: true },
    { title: 'Zákazník', field: 'customer', sortable: true },
    { title: 'Interné Číslo Objednávky', field: 'orderNumber', sortable: true },
    { title: 'Hodnota', field: 'value', sortable: true },
    { title: 'Akcie', field: '', sortable: false }
  ];

  // Sorting function
  const handleSort = (field: string) => {
    if (!field) return;

    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Enhanced search function - searches ALL fields
  const searchAllFields = (order: Order, query: string): boolean => {
    if (!query) return true;
    const searchTerm = query.toLowerCase();
    return [
      order.orderNumber,
      order.customer,
      order.status,
      order.priority,
      order.date,
      order.value.toString(),
      order.items?.toString() || ''
    ].some(field => field.toLowerCase().includes(searchTerm));
  };

  // Quick filters
  const handleQuickFilter = (filterName: string) => {
    const newFilters = new Set(quickFilters);
    if (newFilters.has(filterName)) {
      newFilters.delete(filterName);
    } else {
      newFilters.add(filterName);
    }
    setQuickFilters(newFilters);
  };

  const applyQuickFilters = (order: Order): boolean => {
    if (quickFilters.size === 0) return true;

    return Array.from(quickFilters).every(filter => {
      switch (filter) {
        case 'high-value': return order.value >= 5000000;
        case 'this-week': return new Date(order.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        case 'overdue': return order.status === 'PENDING' && new Date(order.date) < new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        case 'critical': return order.priority === 'CRITICAL';
        default: return true;
      }
    });
  };

  // Filter, sort and paginate orders
  const { paginatedOrders, totalPages, totalFilteredItems } = React.useMemo(() => {
    // First filter
    let filtered = orders.filter(order => {
      const matchesSearch = searchAllFields(order, searchQuery);
      const matchesStatus = statusFilter.has(order.status);
      const matchesPriority = priorityFilter.has(order.priority);
      const matchesQuickFilters = applyQuickFilters(order);
      return matchesSearch && matchesStatus && matchesPriority && matchesQuickFilters;
    });

    // Then sort
    if (sortField) {
      filtered = filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof Order];
        let bVal: any = b[sortField as keyof Order];

        // Handle date sorting
        if (sortField === 'date') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        // Handle numeric sorting
        if (sortField === 'value') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }

        // Handle string sorting
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filtered.slice(startIndex, endIndex);

    return {
      paginatedOrders,
      totalPages,
      totalFilteredItems: filtered.length
    };
  }, [orders, searchQuery, statusFilter, priorityFilter, quickFilters, sortField, sortDirection, itemsPerPage, currentPage]);

  // Column resizing functions
  const handleMouseDown = (e: React.MouseEvent, columnIndex: number) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnIndex);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = columnWidths[columnIndex];
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing || resizingColumn === -1) return;

    const deltaX = e.clientX - resizeStartX.current;
    const newWidth = Math.max(50, resizeStartWidth.current + deltaX);

    setColumnWidths(prev => {
      const newWidths = [...prev];
      newWidths[resizingColumn] = newWidth;
      return newWidths;
    });
  }, [isResizing, resizingColumn]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
    setResizingColumn(-1);
  }, []);

  // Event listeners for resizing
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Mobile Card Component
  const MobileOrderCard = ({ order }: { order: Order }) => (
    <div
      key={order.id}
      style={{
        background: selectedOrders.has(order.id)
          ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
          : currentTheme.cardBackground,
        border: `1px solid ${currentTheme.border}`,
        borderLeft: selectedOrders.has(order.id)
          ? '4px solid #2196f3'
          : `4px solid ${getStatusColor(order.status)}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: selectedOrders.has(order.id)
          ? '0 2px 8px rgba(33, 150, 243, 0.2)'
          : currentTheme.shadow,
        transition: 'all 0.2s ease'
      }}
    >
      {/* Mobile Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={selectedOrders.has(order.id)}
            onChange={() => handleSelectOrder(order.id)}
            style={{
              transform: 'scale(1.1)',
              accentColor: '#3366cc'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span style={{
            fontSize: '18px',
            fontWeight: '600',
            color: currentTheme.text
          }}>
            {order.customer}
          </span>
        </div>
        <span style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '12px',
          background: getStatusColor(order.status),
          color: 'white',
          fontWeight: '500'
        }}>
          {order.status.replace('_', ' ')}
        </span>
      </div>

      {/* Mobile Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        fontSize: '14px',
        color: currentTheme.textSecondary
      }}>
        <div>
          <strong>Order:</strong><br />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            {order.orderNumber}
          </span>
        </div>
        <div>
          <strong>Date:</strong><br />
          {order.date}
        </div>
        <div>
          <strong>Priority:</strong><br />
          <span style={{ color: getPriorityColor(order.priority) }}>
            {order.priority}
          </span>
        </div>
        <div>
          <strong>Value:</strong><br />
          <span style={{ fontWeight: '600', color: currentTheme.text }}>
            ${order.value.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Mobile Actions */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: `1px solid ${currentTheme.border}`
      }}>
        <button style={{
          flex: 1,
          padding: '8px 12px',
          backgroundColor: '#3366cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          ✏️ Edit
        </button>
        <button style={{
          flex: 1,
          padding: '8px 12px',
          backgroundColor: '#f57c00',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          🔍 View
        </button>
        <button style={{
          padding: '8px 12px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          🗑️
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: isMobile
        ? `${getSpacing('sm')} ${getSpacing('sm')} ${getSpacing('xxl')} ${getSpacing('sm')}`
        : isTablet
        ? `${getSpacing('md')} ${getSpacing('md')} ${getSpacing('xxl')} ${getSpacing('md')}`
        : `${getSpacing('lg')} ${getSpacing('xxl')} ${getSpacing('xxl')} ${getSpacing('md')}`,
      paddingBottom: getSpacing('xxl'),
      transition: getTransition('medium')
    }}>
      <DebugBar title="OrdersVariant2_V3 - Golden Ratio Design" />

      {/* L-KERN HEADER */}
      <div style={{
        background: currentTheme.cardBackground,
        padding: '20px',
        marginBottom: '2rem',
        border: `1px solid ${currentTheme.border}`,
        borderLeft: `6px solid ${customThemeSettings.accentColor}`,
        borderRadius: getSpacing('xs'),
        boxShadow: currentTheme.shadow,
        transition: getTransition('medium')
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={lkernLogo} alt="L-KERN" style={{ height: '60px' }} />
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                lineHeight: '1.4',
                fontWeight: '600',
                color: currentTheme.text
              }}>
                Orders Management V2
              </h1>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.4',
                fontWeight: '500',
                color: customThemeSettings.accentColor,
                marginTop: getSpacing('xs')
              }}>
                Professional ERP System v2 • Manufacturing Operations
              </div>
            </div>
          </div>
          <img src={luhovyLogo} alt="Luhovy Industries" style={{ height: '50px' }} />
        </div>
      </div>

      {/* BULK ACTIONS BAR */}
      {showBulkActions && (
        <div style={{
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '1px solid #2196f3',
          borderLeft: '6px solid #2196f3',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: '600', color: '#1976d2' }}>
              ✅ {selectedOrders.size} selected orders
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              onChange={(e) => e.target.value && handleBulkStatusChange(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #2196f3',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              <option value="">Change Status...</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PRODUCTION">In Production</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <button
              onClick={handleBulkDelete}
              style={{
                padding: '4px 12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              🗑️ Delete
            </button>
            <button
              onClick={clearSelection}
              style={{
                padding: '4px 12px',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              ❌ Clear
            </button>
          </div>
        </div>
      )}

      {/* FILTER PANEL */}
      <div style={{
        background: currentTheme.cardBackground,
        border: `1px solid ${currentTheme.border}`,
        borderLeft: '6px solid #3366cc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '1.5rem',
        transition: 'all 0.3s ease'
      }}>
        {/* Enhanced Search bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search all fields: orders, customers, status, priority, value..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: 'calc(100% - 32px)',
                padding: '10px 16px 10px 40px',
                background: currentTheme.inputBackground,
                border: `2px solid ${currentTheme.inputBorder}`,
                borderRadius: '6px',
                color: currentTheme.text,
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#9c27b0';
                e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0 3px rgba(156, 39, 176, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = currentTheme.inputBorder;
                e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px',
              color: currentTheme.textMuted,
              pointerEvents: 'none'
            }}>
              🔍
            </span>
          </div>

          {/* Quick Filters */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'high-value', label: '💰 High Value (>$5M)', color: '#ff9800' },
              { id: 'this-week', label: '📅 This Week', color: '#4caf50' },
              { id: 'overdue', label: '⏰ Overdue', color: '#f44336' },
              { id: 'critical', label: '🔴 Critical Priority', color: '#e91e63' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => handleQuickFilter(filter.id)}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: quickFilters.has(filter.id)
                    ? filter.color
                    : currentTheme.inputBackground,
                  color: quickFilters.has(filter.id)
                    ? 'white'
                    : currentTheme.text,
                  boxShadow: quickFilters.has(filter.id)
                    ? `0 2px 4px ${filter.color}40`
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!quickFilters.has(filter.id)) {
                    e.currentTarget.style.background = `${filter.color}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!quickFilters.has(filter.id)) {
                    e.currentTarget.style.background = currentTheme.inputBackground;
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
            {(quickFilters.size > 0 || searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setQuickFilters(new Set());
                }}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: currentTheme.cardBackground,
                  color: currentTheme.textMuted,
                  transition: 'all 0.2s'
                }}
              >
                ❌ Clear All
              </button>
            )}
          </div>
        </div>

        {/* Quick filters */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', position: 'relative', minHeight: '120px' }}>
          {/* Status filter */}
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#9c27b0',
              marginBottom: '12px'
            }}>
              STATUS FILTER
            </div>
            <div>
              {/* First row - 3 items */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                {['PENDING', 'IN_PRODUCTION', 'COMPLETED'].map(status => (
                  <label key={status} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: currentTheme.text,
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    <input
                      type="checkbox"
                      checked={statusFilter.has(status)}
                      onChange={() => handleStatusFilterChange(status)}
                      style={{
                        accentColor: '#9c27b0',
                        transform: 'scale(1.1)'
                      }}
                    />
                    {status.replace('_', ' ')}
                  </label>
                ))}
              </div>

              {/* Second row - 4 items */}
              <div style={{ display: 'flex', gap: '16px' }}>
                {['INVOICED_UNPAID', 'INVOICED_PAID', 'CANCELLED', 'COMPLAINT'].map(status => (
                  <label key={status} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: currentTheme.text,
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    <input
                      type="checkbox"
                      checked={statusFilter.has(status)}
                      onChange={() => handleStatusFilterChange(status)}
                      style={{
                        accentColor: '#9c27b0',
                        transform: 'scale(1.1)'
                      }}
                    />
                    {status.replace('_', ' ')}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Priority filter */}
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#9c27b0',
              marginBottom: '12px'
            }}>
              PRIORITY FILTER
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', maxWidth: '300px' }}>
              {['LOW', 'NORMAL', 'HIGH', 'CRITICAL'].map(priority => (
                <label key={priority} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: currentTheme.text,
                  fontWeight: '600'
                }}>
                  <input
                    type="checkbox"
                    checked={priorityFilter.has(priority)}
                    onChange={() => handlePriorityFilterChange(priority)}
                    style={{
                      accentColor: '#9c27b0',
                      transform: 'scale(1.1)'
                    }}
                  />
                  {priority}
                </label>
              ))}
            </div>
          </div>

          {/* Pravá časť - všetky prvky v jednom riadku - PRAVÝ DOLNÝ ROH */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Orders count - úplne vľavo */}
            <div style={{
              color: '#3366cc',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              📊 <span style={{ color: currentTheme.text }}>{totalFilteredItems}/{orders.length} orders</span>
            </div>

            {/* Items per page selector - v strede */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '13px',
                color: currentTheme.text,
                fontWeight: '600'
              }}>
                Na stránku:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset na prvú stránku
                }}
                style={{
                  padding: '4px 8px',
                  background: currentTheme.inputBackground,
                  border: `1px solid ${currentTheme.inputBorder}`,
                  borderRadius: '4px',
                  color: currentTheme.text,
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* New Order button - úplne vpravo */}
            <button
              style={{
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(156, 39, 176, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6a1b9a, #4a148c)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(156, 39, 176, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #9c27b0, #6a1b9a)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(156, 39, 176, 0.3)';
              }}
              title="Vytvoriť novú objednávku"
            >
              <span style={{ fontSize: '14px' }}>➕</span>
              <span>New Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* DATA DISPLAY - Table or Cards based on screen size */}
      {isMobile ? (
        <div>
          <div style={{
            background: currentTheme.cardBackground,
            border: `1px solid ${currentTheme.border}`,
            borderLeft: '6px solid #9c27b0',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: currentTheme.text
            }}>
              📋 {totalFilteredItems} Orders
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: '4px 8px',
                background: currentTheme.inputBackground,
                border: `1px solid ${currentTheme.inputBorder}`,
                borderRadius: '4px',
                color: currentTheme.text,
                fontSize: '13px'
              }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
          {paginatedOrders.map(order => (
            <MobileOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div style={{
          background: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          borderLeft: '6px solid #9c27b0',
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>

        {/* GRID HEADER */}
        <div style={{
          display: 'flex',
          background: currentTheme.headerBackground,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '8px 8px 0 0',
          fontWeight: 'bold',
          fontSize: '14px',
          color: currentTheme.textSecondary,
          textTransform: 'capitalize',
          letterSpacing: '0.5px'
        }}>
          {columns.map((column, index) => (
            <div
              key={index}
              onClick={() => {
                if (index === 0) {
                  handleSelectAll();
                } else if (column.sortable) {
                  handleSort(column.field);
                }
              }}
              style={{
                width: `${columnWidths[index]}px`,
                flex: index === 3 ? '1' : '0 0 auto',
                padding: '6px 12px',
                cursor: (index === 0 || column.sortable) ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: index === 0 ? 'center' : 'space-between',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (index === 0 || column.sortable) {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#4a4a4a' : '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? '0 2px 8px rgba(255, 255, 255, 0.1)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (index === 0 || column.sortable) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {index === 0 ? (
                <input
                  type="checkbox"
                  checked={selectedOrders.size === paginatedOrders.length && paginatedOrders.length > 0}
                  onChange={() => {}} // Handled by parent onClick
                  style={{
                    transform: 'scale(1.2)',
                    accentColor: '#3366cc',
                    cursor: 'pointer'
                  }}
                />
              ) : (
                <span>{column.title}</span>
              )}

              {/* Sort indicator */}
              {column.sortable && (
                <span style={{
                  marginLeft: '4px',
                  fontSize: '12px',
                  color: sortField === column.field ? '#9c27b0' : '#999'
                }}>
                  {sortField === column.field ? (sortDirection === 'asc' ? '▲' : '▼') : '▲▼'}
                </span>
              )}

              {/* Resize handle */}
              {index < columns.length - 1 && (
                <div
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    width: '4px',
                    cursor: 'col-resize',
                    backgroundColor: 'transparent',
                    zIndex: 1
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9c27b0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* DATA ROWS */}
        {paginatedOrders.map((order) => (
          <div key={order.id}>
            {/* MAIN ROW */}
            <div
              onClick={() => toggleExpand(order.id)}
              style={{
                display: 'flex',
                borderBottom: `1px solid ${currentTheme.border}`,
                cursor: 'pointer',
                background: selectedOrders.has(order.id)
                  ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                  : getRowBackgroundColor(order.status, expandedOrders.has(order.id)),
                borderLeft: selectedOrders.has(order.id)
                  ? '4px solid #2196f3'
                  : expandedOrders.has(order.id) ? '4px solid #3366cc' : '4px solid transparent',
                transition: 'all 0.2s ease',
                boxShadow: selectedOrders.has(order.id)
                  ? '0 2px 8px rgba(33, 150, 243, 0.2)'
                  : expandedOrders.has(order.id) ? '0 2px 8px rgba(51, 102, 204, 0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                const currentBg = getRowBackgroundColor(order.status, expandedOrders.has(order.id));
                e.currentTarget.style.background = currentBg;
                e.currentTarget.style.filter = isDarkMode ? 'brightness(1.4)' : 'brightness(0.7)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = isDarkMode
                  ? '0 8px 24px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(255, 255, 255, 0.1)'
                  : '0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.borderRadius = '4px';
              }}
              onMouseLeave={(e) => {
                const currentBg = getRowBackgroundColor(order.status, expandedOrders.has(order.id));
                e.currentTarget.style.background = currentBg;
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = expandedOrders.has(order.id)
                  ? '0 2px 8px rgba(51, 102, 204, 0.1)'
                  : 'none';
                e.currentTarget.style.zIndex = '1';
                e.currentTarget.style.borderRadius = '0';
              }}
            >
              {/* Checkbox column */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectOrder(order.id);
                }}
                style={{
                  width: `${columnWidths[0]}px`,
                  flex: '0 0 auto',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOrders.has(order.id)}
                  onChange={() => {}} // Handled by parent onClick
                  style={{
                    transform: 'scale(1.1)',
                    accentColor: '#3366cc',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Expand arrow - moved to status column */}
              <div
                style={{
                  width: `${columnWidths[1]}px`,
                  flex: '0 0 auto',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  const arrow = e.currentTarget.querySelector('.expand-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = '#3366cc';
                    arrow.style.transform = expandedOrders.has(order.id) ? 'rotate(90deg) scale(1.2)' : 'rotate(0deg) scale(1.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  const arrow = e.currentTarget.querySelector('.expand-arrow') as HTMLElement;
                  if (arrow) {
                    arrow.style.color = expandedOrders.has(order.id) ? '#3366cc' : '#666';
                    arrow.style.transform = expandedOrders.has(order.id) ? 'rotate(90deg) scale(1)' : 'rotate(0deg) scale(1)';
                  }
                }}
              >
                <span
                  className="expand-arrow"
                  style={{
                    fontSize: '12px',
                    color: expandedOrders.has(order.id) ? '#3366cc' : currentTheme.textMuted,
                    transform: expandedOrders.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'all 0.2s ease',
                    fontWeight: 'bold',
                    userSelect: 'none'
                  }}
                >
                  ▶
                </span>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  color: currentTheme.textSecondary
                }}>
                  {getStatusPrefix(order.status)} {order.status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>

              {/* Date - moved up */}

              {/* Date */}
              <div style={{
                width: `${columnWidths[2]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                fontSize: '0.85rem',
                color: currentTheme.textSecondary,
                display: 'flex',
                alignItems: 'center'
              }}>
                {order.date}
              </div>

              {/* Customer */}
              <div style={{
                flex: '1',
                padding: '6px 12px',
                fontSize: '0.85rem',
                color: currentTheme.textSecondary,
                display: 'flex',
                alignItems: 'center'
              }}>
                {order.customer}
              </div>

              {/* Order Number */}
              <div style={{
                width: `${columnWidths[4]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: currentTheme.textSecondary,
                display: 'flex',
                alignItems: 'center'
              }}>
                {order.orderNumber}
              </div>

              {/* Value */}
              <div style={{
                width: `${columnWidths[5]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                color: currentTheme.textSecondary,
                display: 'flex',
                alignItems: 'center'
              }}>
                ${order.value.toLocaleString()}
              </div>

              {/* Actions */}
              <div style={{
                width: `${columnWidths[6]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                display: 'flex',
                gap: '4px',
                alignItems: 'center'
              }} onClick={(e) => e.stopPropagation()}>
                <button style={{
                  padding: '2px 6px',
                  backgroundColor: '#3366cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}>
                  Upraviť
                </button>
                <button style={{
                  padding: '2px 6px',
                  backgroundColor: '#f57c00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}>
                  Cesta
                </button>
                <button style={{
                  padding: '2px 6px',
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}>
                  Zmazať
                </button>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            {expandedOrders.has(order.id) && (
              <div style={{
                padding: '20px',
                background: currentTheme.hoverBackground,
                borderBottom: `1px solid ${currentTheme.border}`,
                borderTop: `1px solid ${currentTheme.border}`,
                transition: 'all 0.3s ease'
              }}>
                {/* Tabuľka s položkami - jednoduchá ako starý systém */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    margin: '0 0 12px 0',
                    color: currentTheme.text,
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Položky objednávky
                  </h4>
                  <div style={{
                    background: currentTheme.cardBackground,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '4px'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 100px 100px 120px 100px',
                      gap: '12px',
                      padding: '8px 12px',
                      background: currentTheme.headerBackground,
                      borderBottom: `1px solid ${currentTheme.border}`,
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: currentTheme.textSecondary
                    }}>
                      <div>Názov súčiastky/služby</div>
                      <div>Množstvo</div>
                      <div>Jednotka</div>
                      <div>Jednotková cena</div>
                      <div>Celkom</div>
                    </div>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 100px 100px 120px 100px',
                        gap: '12px',
                        padding: '8px 12px',
                        borderBottom: i < 3 ? `1px solid ${currentTheme.border}` : 'none',
                        fontSize: '13px',
                        color: currentTheme.textSecondary
                      }}>
                        <div>Titanium Alloy Component #{i}</div>
                        <div>{10 * i}</div>
                        <div>pcs</div>
                        <div>${(1000 * i).toLocaleString()}</div>
                        <div>${(10000 * i).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order metadata - jednoduchý layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <div>
                    <h5 style={{
                      margin: '0 0 8px 0',
                      color: '#9c27b0',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Order Information
                    </h5>
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: currentTheme.textSecondary }}>
                      <div><strong>Order ID:</strong> {order.id}</div>
                      <div><strong>Items:</strong> {order.items} components</div>
                      <div><strong>Created:</strong> {order.date}</div>
                      <div><strong>Priority:</strong> <span style={{ color: getPriorityColor(order.priority) }}>{order.priority}</span></div>
                    </div>
                  </div>

                  <div>
                    <h5 style={{
                      margin: '0 0 8px 0',
                      color: '#3366cc',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Customer Details
                    </h5>
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: currentTheme.textSecondary }}>
                      <div><strong>Company:</strong> {order.customer}</div>
                      <div><strong>Account Type:</strong> Enterprise</div>
                      <div><strong>Payment Terms:</strong> Net 30</div>
                      <div><strong>Delivery:</strong> Express</div>
                    </div>
                  </div>

                  <div>
                    <h5 style={{
                      margin: '0 0 8px 0',
                      color: '#f57c00',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      File Information
                    </h5>
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: currentTheme.textSecondary }}>
                      <div><strong>Directory:</strong> /L/divisions/01/operations/sales/orders/2024/09/</div>
                      <div><strong>Files:</strong> 5 attachments</div>
                      <div><strong>Total Size:</strong> 12.4 MB</div>
                      <div><strong>Last Modified:</strong> 2 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{
          background: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '8px',
          padding: '16px',
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            fontSize: '14px',
            color: currentTheme.textSecondary,
            fontWeight: '500'
          }}>
            Stránka {currentPage} z {totalPages} • Zobrazujem {paginatedOrders.length} z {totalFilteredItems} záznamov
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{
                padding: '6px 12px',
                background: currentPage === 1 ? currentTheme.border : '#3366cc',
                color: currentPage === 1 ? currentTheme.textMuted : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              ← Predchádzajúca
            </button>

            {/* Page numbers */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  if (pageNum > totalPages) pageNum = totalPages - (5 - 1 - i);
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      padding: '6px 10px',
                      background: pageNum === currentPage ? '#9c27b0' : currentTheme.inputBackground,
                      color: pageNum === currentPage ? 'white' : currentTheme.text,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      minWidth: '32px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{
                padding: '6px 12px',
                background: currentPage === totalPages ? currentTheme.border : '#3366cc',
                color: currentPage === totalPages ? currentTheme.textMuted : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Ďalšia →
            </button>
          </div>
        </div>
      )}

      {/* ENHANCED FOOTER STATS WITH ANALYTICS */}
      <div style={{
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '12px' : '20px',
        fontSize: '14px'
      }}>
        {/* Real-time calculated stats */}
        <div style={{
          background: currentTheme.cardBackground,
          padding: '12px 16px',
          border: `1px solid ${currentTheme.border}`,
          borderLeft: '6px solid #3366cc',
          borderRadius: '4px',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ color: '#3366cc', fontWeight: 'bold' }}>Active Orders:</span> <span style={{ color: currentTheme.text, fontWeight: 'bold' }}>127</span>
        </div>
        <div style={{
          background: currentTheme.cardBackground,
          padding: '12px 16px',
          border: `1px solid ${currentTheme.border}`,
          borderLeft: '6px solid #9c27b0',
          borderRadius: '4px',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ color: '#9c27b0', fontWeight: 'bold' }}>Completed This Month:</span> <span style={{ color: currentTheme.text, fontWeight: 'bold' }}>1,524</span>
        </div>
        <div style={{
          background: currentTheme.cardBackground,
          padding: '12px 16px',
          border: `1px solid ${currentTheme.border}`,
          borderLeft: '6px solid #3366cc',
          borderRadius: '4px',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ color: '#3366cc', fontWeight: 'bold' }}>Total Value:</span> <span style={{ color: currentTheme.text, fontWeight: 'bold' }}>$26.6M</span>
        </div>
      </div>


      {/* STATUS BAR - fixed na dole */}
      <StatusBar
        currentUser={currentUser}
        theme={currentTheme}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* KEYBOARD SHORTCUTS HELP */}
      {showShortcuts && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowShortcuts(false)}
        >
          <div
            style={{
              background: currentTheme.cardBackground,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: currentTheme.shadow
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              margin: '0 0 16px 0',
              color: currentTheme.text,
              fontSize: '20px',
              fontWeight: '600'
            }}>
              ⌨️ Keyboard Shortcuts
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '12px',
              fontSize: '14px',
              color: currentTheme.textSecondary
            }}>
              <strong>Ctrl/Cmd + F</strong><span>Focus search bar</span>
              <strong>Ctrl/Cmd + A</strong><span>Select all orders</span>
              <strong>Escape</strong><span>Clear selections/search</span>
              <strong>Delete</strong><span>Delete selected orders</span>
              <strong>Ctrl/Cmd + N</strong><span>Focus New Order button</span>
              <strong>?</strong><span>Show this help</span>
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                background: '#3366cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HELP SHORTCUT TRIGGER */}
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '40px',
          height: '40px',
          background: '#757575',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 998,
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onClick={() => setShowShortcuts(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#616161';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#757575';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Show keyboard shortcuts (?)"
      >
        <span style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>?</span>
      </div>

      {/* THEME CUSTOMIZER */}
      {showThemeCustomizer && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowThemeCustomizer(false)}
        >
          <div
            style={{
              background: currentTheme.cardBackground,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: currentTheme.shadow
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              margin: '0 0 20px 0',
              color: currentTheme.text,
              fontSize: '20px',
              fontWeight: '600'
            }}>
              🎨 Theme Customizer
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: currentTheme.text,
                marginBottom: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={customThemeSettings.compactMode}
                  onChange={(e) => handleThemeSettingChange('compactMode', e.target.checked)}
                  style={{ accentColor: customThemeSettings.accentColor }}
                />
                📦 Compact Mode (Smaller spacing)
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: currentTheme.text,
                marginBottom: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={customThemeSettings.highContrast}
                  onChange={(e) => handleThemeSettingChange('highContrast', e.target.checked)}
                  style={{ accentColor: customThemeSettings.accentColor }}
                />
                🔆 High Contrast (Better accessibility)
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: currentTheme.text,
                marginBottom: '16px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={customThemeSettings.showAnimations}
                  onChange={(e) => handleThemeSettingChange('showAnimations', e.target.checked)}
                  style={{ accentColor: customThemeSettings.accentColor }}
                />
                ✨ Show Animations
              </label>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: currentTheme.text,
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  📏 Font Size
                </label>
                <select
                  value={customThemeSettings.fontSize}
                  onChange={(e) => handleThemeSettingChange('fontSize', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: currentTheme.inputBackground,
                    border: `1px solid ${currentTheme.inputBorder}`,
                    borderRadius: '4px',
                    color: currentTheme.text,
                    fontSize: '14px'
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium (Default)</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: currentTheme.text,
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  🎨 Accent Color
                </label>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {[
                    { color: '#9c27b0', name: 'L-KERN Purple' },
                    { color: '#3366cc', name: 'Blue' },
                    { color: '#4caf50', name: 'Green' },
                    { color: '#ff9800', name: 'Orange' },
                    { color: '#e91e63', name: 'Pink' },
                    { color: '#607d8b', name: 'Blue Grey' }
                  ].map(({ color, name }) => (
                    <button
                      key={color}
                      onClick={() => handleThemeSettingChange('accentColor', color)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: color,
                        border: customThemeSettings.accentColor === color
                          ? '3px solid white'
                          : '1px solid #ccc',
                        cursor: 'pointer',
                        boxShadow: customThemeSettings.accentColor === color
                          ? `0 0 0 2px ${color}`
                          : 'none'
                      }}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setCustomThemeSettings({
                    compactMode: false,
                    highContrast: false,
                    fontSize: 'medium',
                    accentColor: '#9c27b0',
                    showAnimations: true
                  });
                }}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  color: currentTheme.textMuted,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Reset
              </button>
              <button
                onClick={() => setShowThemeCustomizer(false)}
                style={{
                  padding: '8px 16px',
                  background: customThemeSettings.accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* THEME CUSTOMIZER BUTTON */}
      <div
        style={{
          position: 'fixed',
          bottom: '150px',
          right: '24px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 998,
          transition: getTransition('all 0.3s ease'),
          boxShadow: '0 2px 8px rgba(156, 39, 176, 0.3)'
        }}
        onClick={() => setShowThemeCustomizer(true)}
        onMouseEnter={(e) => {
          if (customThemeSettings.showAnimations) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #6a1b9a, #4a148c)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (customThemeSettings.showAnimations) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #9c27b0, #6a1b9a)';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        title="Customize theme"
      >
        <span style={{
          color: 'white',
          fontSize: '18px'
        }}>🎨</span>
      </div>

      {/* REPORT BUTTON - fixed vpravo hore */}
      <ReportButton />
    </div>
  );
};

export default OrdersVariant2_V3;