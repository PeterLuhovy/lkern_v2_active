/**
 * VARIANT 1: L-KERN Professional s StatusBar a ReportButton
 * Inšpirovaný OrdersVariant9 - kompletná funkcionálna verzia
 * Farby z theme.css: #9c27b0, #3366cc, #f2f3f7, #222222
 */
import React, { useState } from 'react';
import lkernLogo from '../../../assets/logos/lkern-logo.png';
import luhovyLogo from '../../../assets/logos/luhovy-logo.png';
import DebugBar from '../components/DebugBar/DebugBar';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string;
  value: number;
  items?: number;
}

// === STATUS BAR KOMPONENTY ===

// interface ServiceStatus {
//   name: string;
//   status: 'healthy' | 'unhealthy' | 'down' | 'unknown';
//   critical: boolean;
//   response_time: number;
// }

const StatusBar: React.FC = () => {
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

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
      borderTop: '1px solid #e5e5e5',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
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
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
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

          <span style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
            (3/3 služieb)
          </span>

          <span style={{ fontSize: '12px', color: '#999' }}>
            • Aktualizované {new Date().toLocaleTimeString('sk-SK')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Force refresh logic
            }}
            style={{
              background: 'none',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666',
              marginRight: '8px',
              transition: 'all 0.2s ease'
            }}
            title="Manuálna aktualizácia"
          >
            ↻
          </button>
          <span style={{ color: '#666', fontSize: '12px' }}>
            {isExpanded ? '▼' : '▲'}
          </span>
        </div>
      </div>

      {/* ROZŠÍRENÝ DETAIL */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid #e9ecef',
          background: '#fafbfc',
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
              borderBottom: '1px solid #e9ecef'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: '#333',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Kritické služby</h4>
              <span style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>
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
                    border: '1px solid #e5e5e5',
                    background: 'white',
                    fontSize: '12px',
                    minWidth: '120px',
                    borderLeft: '3px solid #f44336'
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
                    color: '#333',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name}</span>
                  <span style={{ fontSize: '10px', color: '#999', fontWeight: '400' }}>
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
              borderBottom: '1px solid #e9ecef'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: '#333',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Ostatné služby</h4>
              <span style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>
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
                    border: '1px solid #e5e5e5',
                    background: 'white',
                    fontSize: '12px',
                    minWidth: '120px',
                    borderLeft: '3px solid #2196f3'
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
                    color: '#333',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name}</span>
                  <span style={{ fontSize: '10px', color: '#999', fontWeight: '400' }}>
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
              borderBottom: '1px solid #e9ecef'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: '#333',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Databázy</h4>
              <span style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>
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
                    border: '1px solid #e5e5e5',
                    background: '#f8f9fa',
                    fontSize: '12px',
                    minWidth: '120px',
                    borderLeft: '3px solid #9c27b0'
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
                    color: '#333',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{service.name} DB</span>
                  <span style={{ fontSize: '10px', color: '#999', fontWeight: '400' }}>
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
                  border: '1px solid #e5e5e5',
                  background: isBackupRunning ?
                    'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' :
                    'linear-gradient(135deg, #fff3e0 0%, #ffecb3 100%)',
                  fontSize: '12px',
                  minWidth: '120px',
                  borderLeft: isBackupRunning ? '3px solid #2196f3' : '3px solid #ff9800',
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
                  color: '#333',
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {isBackupRunning ? 'Backup prebíha...' : 'Zálohovať DB'}
                </span>

                <span style={{ fontSize: '10px', color: '#999', fontWeight: '400' }}>
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
                color: '#333'
              }}>
                {backupStatus}
              </div>
            )}
          </div>

          {/* Footer info */}
          <div style={{
            marginTop: '12px',
            paddingTop: '8px',
            borderTop: '1px solid #e9ecef',
            textAlign: 'center',
            color: '#6c757d',
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
            <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Nahlásiť problém</h3>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
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

const OrdersVariant1: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']));
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(new Set(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']));

  // Column widths and resizing
  const [columnWidths, setColumnWidths] = useState<number[]>([50, 180, 140, 300, 200, 120, 200]);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizingColumn, setResizingColumn] = useState<number>(-1);
  const resizeStartX = React.useRef<number>(0);
  const resizeStartWidth = React.useRef<number>(0);

  // Sorting state
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Professional enterprise data
  const orders: Order[] = [
    {
      id: '001',
      orderNumber: 'ORD-LCVV-240924-001-LMT',
      customer: 'Lockheed Martin Corporation',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      date: '2024-09-24',
      value: 12500000,
      items: 127
    },
    {
      id: '002',
      orderNumber: 'ORD-LIND-240923-002-BAE',
      customer: 'BAE Systems plc',
      priority: 'HIGH',
      status: 'PENDING',
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#d32f2f';
      case 'HIGH': return '#f57c00';
      case 'NORMAL': return '#3366cc';
      case 'LOW': return '#388e3c';
      default: return '#616161';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#388e3c';
      case 'IN_PROGRESS': return '#3366cc';
      case 'PENDING': return '#f57c00';
      case 'CANCELLED': return '#d32f2f';
      default: return '#616161';
    }
  };

  // Column headers configuration
  const columns = [
    { title: '', field: '', sortable: false },
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

  // Filter and sort orders
  const filteredAndSortedOrders = React.useMemo(() => {
    // First filter
    let filtered = orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter.has(order.status);
      const matchesPriority = priorityFilter.has(order.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Then sort
    if (!sortField) return filtered;

    return filtered.sort((a, b) => {
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
  }, [orders, searchQuery, statusFilter, priorityFilter, sortField, sortDirection]);

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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f2f3f7',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '4rem 10rem 5rem 2rem',
      paddingBottom: '80px'
    }}>
      <DebugBar title="OrdersVariant1 (obs)" />

      {/* L-KERN HEADER */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        marginBottom: '2rem',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #9c27b0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={lkernLogo} alt="L-KERN" style={{ height: '60px' }} />
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: '700',
                color: '#222222'
              }}>
                Orders Management
              </h1>
              <div style={{
                fontSize: '14px',
                color: '#9c27b0',
                fontWeight: '600',
                marginTop: '4px'
              }}>
                Professional ERP System v1 • Manufacturing Operations
              </div>
            </div>
          </div>
          <img src={luhovyLogo} alt="Luhovy Industries" style={{ height: '50px' }} />
        </div>
      </div>

      {/* FILTER PANEL - štýl ako stránka 7 */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #3366cc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '1.5rem'
      }}>
        {/* Search bar */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search orders, customers, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: 'calc(100% - 32px)',
              padding: '12px 16px',
              background: '#f2f3f7',
              border: '2px solid #dee2e6',
              borderRadius: '4px',
              color: '#222222',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9c27b0'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>

        {/* Quick filters */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Status filter */}
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#9c27b0',
              marginBottom: '8px'
            }}>
              STATUS FILTER
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(status => (
                <label key={status} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#222222',
                  fontWeight: '600'
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
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Priority filter */}
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#9c27b0',
              marginBottom: '8px'
            }}>
              PRIORITY FILTER
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['LOW', 'NORMAL', 'HIGH', 'CRITICAL'].map(priority => (
                <label key={priority} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#222222',
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

          {/* Results count a New Order button */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              color: '#3366cc',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              📊 {filteredAndSortedOrders.length} orders
            </div>
            <button
              style={{
                padding: '8px 16px',
                background: '#9c27b0',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a1b9a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9c27b0'}
            >
              ➕ New Order
            </button>
          </div>
        </div>
      </div>

      {/* DATA GRID - ako starý systém */}
      <div style={{
        background: 'white',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #9c27b0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>

        {/* GRID HEADER */}
        <div style={{
          display: 'flex',
          background: '#f2f2f2',
          border: '1px solid #dee2e6',
          borderRadius: '8px 8px 0 0',
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#495057',
          textTransform: 'capitalize',
          letterSpacing: '0.5px'
        }}>
          {columns.map((column, index) => (
            <div
              key={index}
              onClick={() => column.sortable && handleSort(column.field)}
              style={{
                width: `${columnWidths[index]}px`,
                flex: index === 3 ? '1' : '0 0 auto',
                padding: '6px 12px',
                cursor: column.sortable ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (column.sortable) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                if (column.sortable) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{column.title}</span>

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
        {filteredAndSortedOrders.map((order) => (
          <div key={order.id}>
            {/* MAIN ROW */}
            <div
              onClick={() => toggleExpand(order.id)}
              style={{
                display: 'flex',
                borderBottom: '1px solid #dee2e6',
                cursor: 'pointer',
                background: expandedOrders.has(order.id) ? '#f8f9fa' : 'white',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              {/* Expand arrow */}
              <div style={{
                width: `${columnWidths[0]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#666',
                  transform: expandedOrders.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ▶
                </span>
              </div>

              {/* Status */}
              <div style={{
                width: `${columnWidths[1]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  background: `${getStatusColor(order.status)}15`,
                  color: getStatusColor(order.status),
                  border: `1px solid ${getStatusColor(order.status)}30`
                }}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>

              {/* Date */}
              <div style={{
                width: `${columnWidths[2]}px`,
                flex: '0 0 auto',
                padding: '6px 12px',
                fontSize: '0.85rem',
                color: '#495057',
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
                color: '#495057',
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
                color: '#495057',
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
                color: '#495057',
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

            {/* EXPANDED CONTENT - ako starý systém */}
            {expandedOrders.has(order.id) && (
              <div style={{
                padding: '20px',
                background: '#f8f9fa',
                borderBottom: '1px solid #dee2e6',
                borderTop: '1px solid #dee2e6'
              }}>
                {/* Tabuľka s položkami - jednoduchá ako starý systém */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    margin: '0 0 12px 0',
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Položky objednávky
                  </h4>
                  <div style={{
                    background: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 100px 100px 120px 100px',
                      gap: '12px',
                      padding: '8px 12px',
                      background: '#f2f2f2',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#495057'
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
                        borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none',
                        fontSize: '13px',
                        color: '#495057'
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
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#495057' }}>
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
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#495057' }}>
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
                    <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#495057' }}>
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

      {/* FOOTER STATS - jednoduché ako starý systém */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        gap: '20px',
        fontSize: '14px'
      }}>
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: '1px solid #dee2e6',
          borderLeft: '6px solid #3366cc',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3366cc' }}>Active Orders:</strong> 127
        </div>
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: '1px solid #dee2e6',
          borderLeft: '6px solid #9c27b0',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#9c27b0' }}>Completed This Month:</strong> 1,524
        </div>
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: '1px solid #dee2e6',
          borderLeft: '6px solid #3366cc',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3366cc' }}>Total Value:</strong> $26.6M
        </div>
      </div>

      {/* STATUS BAR - fixed na dole */}
      <StatusBar />

      {/* REPORT BUTTON - fixed vpravo hore */}
      <ReportButton />
    </div>
  );
};

export default OrdersVariant1;