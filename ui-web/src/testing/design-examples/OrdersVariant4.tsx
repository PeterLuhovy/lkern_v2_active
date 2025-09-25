/**
 * VARIANT 4: Nuclear Energy
 * Bezpečnostný dizajn pre jadrovú energetiku s výstraznými farbami
 * Farby: oranžová, žltá, tmavo šedá, červená (warning)
 */
import React, { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string;
  value: number;
  radiationLevel?: string;
  safetyClass?: string;
}

const OrdersVariant4: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');

  // Mock nuclear energy data
  const orders: Order[] = [
    {
      id: '001',
      orderNumber: 'NUC-2024-001',
      customer: 'International Atomic Energy Agency',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      date: '2024-09-24',
      value: 5200000,
      radiationLevel: 'HIGH',
      safetyClass: 'Class 1 Nuclear'
    },
    {
      id: '002',
      orderNumber: 'NUC-2024-002',
      customer: 'Westinghouse Electric',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-23',
      value: 3800000,
      radiationLevel: 'MEDIUM',
      safetyClass: 'Class 2 Nuclear'
    },
    {
      id: '003',
      orderNumber: 'NUC-2024-003',
      customer: 'General Electric Nuclear',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-22',
      value: 1950000,
      radiationLevel: 'LOW',
      safetyClass: 'Class 3 Nuclear'
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'NORMAL': return '#f59e0b';
      case 'LOW': return '#84cc16';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#16a34a';
      case 'IN_PROGRESS': return '#2563eb';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getRadiationColor = (level: string) => {
    switch (level) {
      case 'HIGH': return '#dc2626';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #292524 0%, #1c1917 50%, #0c0a09 100%)',
      color: '#fbbf24',
      fontFamily: "'Orbitron', 'Roboto', sans-serif",
      padding: '24px'
    }}>

      {/* NUCLEAR WARNING HEADER */}
      <div style={{
        background: 'linear-gradient(45deg, #dc2626, #ea580c, #f59e0b)',
        padding: '4px',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: '#1c1917',
          borderRadius: '8px',
          padding: '20px',
          border: '2px solid #f59e0b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              marginRight: '20px',
              animation: 'pulse 2s infinite',
              border: '4px solid #dc2626',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
            }}>
              ☢️
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '36px',
                fontWeight: '900',
                color: '#fbbf24',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
              }}>
                NUCLEAR ORDERS CONTROL
              </h1>
              <p style={{
                margin: '8px 0 0 0',
                color: '#f59e0b',
                fontSize: '16px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                ⚠️ RADIATION CONTROLLED AREA • AUTHORIZED PERSONNEL ONLY
              </p>
            </div>
          </div>

          {/* Warning strip */}
          <div style={{
            background: 'repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #dc2626 10px, #dc2626 20px)',
            height: '8px',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>

      {/* RADIATION SAFETY CONTROLS */}
      <div style={{
        background: '#292524',
        border: '3px solid #f59e0b',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#f59e0b'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: '#dc2626',
                borderRadius: '50%',
                marginRight: '8px',
                animation: 'blink 1s infinite'
              }}></div>
              SEARCH NUCLEAR ORDERS
            </div>
            <input
              type="text"
              placeholder="ENTER ORDER ID, FACILITY, OR RADIATION LEVEL..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#1c1917',
                border: '3px solid #f59e0b',
                borderRadius: '8px',
                color: '#fbbf24',
                fontSize: '16px',
                fontFamily: 'inherit',
                fontWeight: '600',
                outline: 'none',
                textTransform: 'uppercase',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626';
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#f59e0b';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.5)';
              }}
            />
          </div>

          <button style={{
            padding: '14px 28px',
            background: 'linear-gradient(45deg, #dc2626, #ea580c)',
            border: '3px solid #f59e0b',
            borderRadius: '8px',
            color: '#fbbf24',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            textShadow: '1px 1px 0px #000',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          }}
          >
            ⚡ NEW NUCLEAR ORDER
          </button>
        </div>

        {/* Live monitoring strip */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#1c1917',
          borderRadius: '4px',
          border: '2px solid #f59e0b',
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase'
        }}>
          <div style={{ color: '#16a34a' }}>🟢 GEIGER COUNTER: NORMAL</div>
          <div style={{ color: '#f59e0b' }}>🔶 CONTAINMENT: SECURE</div>
          <div style={{ color: '#dc2626' }}>🔴 ALERT LEVEL: YELLOW</div>
        </div>
      </div>

      {/* NUCLEAR ORDERS TABLE */}
      <div style={{
        background: '#1c1917',
        border: '3px solid #f59e0b',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
      }}>

        {/* TABLE HEADER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 180px 150px 150px 150px 120px',
          gap: '16px',
          padding: '16px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          color: '#1c1917',
          fontSize: '12px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <div>STATUS</div>
          <div>NUCLEAR ORDER / FACILITY</div>
          <div>RADIATION LEVEL</div>
          <div>PRIORITY</div>
          <div>STATUS</div>
          <div>VALUE ($)</div>
          <div>ACTIONS</div>
        </div>

        {/* TABLE ROWS */}
        {orders.map((order, index) => (
          <div key={order.id}>
            {/* MAIN ROW */}
            <div
              onClick={() => toggleExpand(order.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 180px 150px 150px 150px 120px',
                gap: '16px',
                padding: '16px',
                borderBottom: index < orders.length - 1 ? '2px solid #f59e0b' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: expandedOrders.has(order.id) ? '#292524' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = '#292524';
                  e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(245, 158, 11, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{
                fontSize: '20px',
                color: '#f59e0b',
                transform: expandedOrders.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ⚡
              </div>

              <div>
                <div style={{
                  fontWeight: '900',
                  marginBottom: '6px',
                  color: '#fbbf24',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textShadow: '1px 1px 0px #000'
                }}>
                  {order.orderNumber}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#f59e0b',
                  fontWeight: '600'
                }}>
                  {order.customer}
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                background: `${getRadiationColor(order.radiationLevel!)}22`,
                color: getRadiationColor(order.radiationLevel!),
                border: `2px solid ${getRadiationColor(order.radiationLevel!)}`,
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: getRadiationColor(order.radiationLevel!),
                  borderRadius: '50%',
                  marginRight: '8px',
                  animation: order.radiationLevel === 'HIGH' ? 'pulse 1s infinite' : 'none'
                }}></div>
                {order.radiationLevel}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                background: `${getPriorityColor(order.priority)}22`,
                color: getPriorityColor(order.priority),
                border: `2px solid ${getPriorityColor(order.priority)}`,
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {order.priority}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                background: `${getStatusColor(order.status)}22`,
                color: getStatusColor(order.status),
                border: `2px solid ${getStatusColor(order.status)}`,
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {order.status.replace('_', ' ')}
              </div>

              <div style={{
                fontWeight: '900',
                color: '#fbbf24',
                fontSize: '16px',
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #000'
              }}>
                ${order.value.toLocaleString()}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{
                  padding: '8px 10px',
                  background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                  border: '2px solid #1e40af',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '900'
                }}>
                  ⚙️
                </button>
                <button style={{
                  padding: '8px 10px',
                  background: 'linear-gradient(45deg, #dc2626, #ef4444)',
                  border: '2px solid #991b1b',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '900'
                }}>
                  ☢️
                </button>
              </div>
            </div>

            {/* EXPANDED RADIATION DATA */}
            {expandedOrders.has(order.id) && (
              <div style={{
                padding: '24px',
                background: '#0c0a09',
                borderTop: '3px solid #dc2626',
                borderBottom: index < orders.length - 1 ? '2px solid #f59e0b' : 'none'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '24px'
                }}>

                  <div style={{
                    background: '#1c1917',
                    border: '2px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <h4 style={{
                      color: '#fbbf24',
                      marginBottom: '16px',
                      fontSize: '14px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      ☢️ NUCLEAR SPECS
                    </h4>
                    <div style={{ fontSize: '13px', lineHeight: '2.2', color: '#f59e0b' }}>
                      <div><strong>ORDER ID:</strong> <span style={{ color: '#fbbf24' }}>{order.id}</span></div>
                      <div><strong>CREATED:</strong> <span style={{ color: '#fbbf24' }}>{order.date}</span></div>
                      <div><strong>UPDATED:</strong> <span style={{ color: '#fbbf24' }}>1 hour ago</span></div>
                      <div><strong>DELIVERY:</strong> <span style={{ color: '#fbbf24' }}>30 days</span></div>
                    </div>
                  </div>

                  <div style={{
                    background: '#1c1917',
                    border: '2px solid #dc2626',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <h4 style={{
                      color: '#dc2626',
                      marginBottom: '16px',
                      fontSize: '14px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      ⚠️ SAFETY PROTOCOL
                    </h4>
                    <div style={{ fontSize: '13px', lineHeight: '2.2', color: '#f59e0b' }}>
                      <div><strong>CLASS:</strong> <span style={{ color: '#fbbf24' }}>{order.safetyClass}</span></div>
                      <div><strong>CONTAINMENT:</strong> <span style={{ color: '#16a34a' }}>SECURE</span></div>
                      <div><strong>PERSONNEL:</strong> <span style={{ color: '#fbbf24' }}>LEVEL 4</span></div>
                      <div><strong>MONITORING:</strong> <span style={{ color: '#16a34a' }}>ACTIVE</span></div>
                    </div>
                  </div>

                  <div style={{
                    background: '#1c1917',
                    border: '2px solid #16a34a',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <h4 style={{
                      color: '#16a34a',
                      marginBottom: '16px',
                      fontSize: '14px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      📦 TRANSPORT DATA
                    </h4>
                    <div style={{ fontSize: '13px', lineHeight: '2.2', color: '#f59e0b' }}>
                      <div><strong>UNITS:</strong> <span style={{ color: '#fbbf24' }}>25 containers</span></div>
                      <div><strong>WEIGHT:</strong> <span style={{ color: '#fbbf24' }}>150 tons</span></div>
                      <div><strong>SHIELDING:</strong> <span style={{ color: '#16a34a' }}>LEAD-LINED</span></div>
                      <div><strong>ESCORT:</strong> <span style={{ color: '#dc2626' }}>REQUIRED</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RADIATION MONITORING FOOTER */}
      <div style={{
        marginTop: '24px',
        background: '#1c1917',
        border: '3px solid #f59e0b',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: 0,
            color: '#fbbf24',
            fontSize: '18px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '2px 2px 0px #000'
          }}>
            ☢️ NUCLEAR FACILITY STATUS BOARD
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {[
            { label: 'ACTIVE NUCLEAR ORDERS', value: '7', icon: '⚡', color: '#f59e0b' },
            { label: 'HIGH RADIATION ORDERS', value: '3', icon: '☢️', color: '#dc2626' },
            { label: 'TOTAL CONTRACT VALUE', value: '$11M', icon: '💰', color: '#16a34a' },
            { label: 'SAFETY COMPLIANCE', value: '100%', icon: '🛡️', color: '#2563eb' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: '#292524',
              border: `3px solid ${stat.color}`,
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: `0 0 10px ${stat.color}33`
            }}>
              <div style={{
                fontSize: '28px',
                marginBottom: '8px',
                filter: 'drop-shadow(0 0 5px currentColor)'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '900',
                color: stat.color,
                marginBottom: '6px',
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #000'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#f59e0b',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default OrdersVariant4;