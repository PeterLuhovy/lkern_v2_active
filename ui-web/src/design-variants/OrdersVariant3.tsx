/**
 * VARIANT 3: Military Grade
 * Robustný vojenský dizajn s dôrazom na operačnú spoľahlivosť
 * Farby: olivová zelená, šedá, čierna, žltá (warning)
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
  classification?: string;
  securityLevel?: string;
}

const OrdersVariant3: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');

  // Mock military/defense data
  const orders: Order[] = [
    {
      id: '001',
      orderNumber: 'MIL-2024-001',
      customer: 'U.S. Department of Defense',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      date: '2024-09-24',
      value: 2500000,
      classification: 'CLASSIFIED',
      securityLevel: 'SECRET'
    },
    {
      id: '002',
      orderNumber: 'MIL-2024-002',
      customer: 'NATO Defense Systems',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-23',
      value: 1800000,
      classification: 'RESTRICTED',
      securityLevel: 'CONFIDENTIAL'
    },
    {
      id: '003',
      orderNumber: 'MIL-2024-003',
      customer: 'Raytheon Technologies',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-22',
      value: 950000,
      classification: 'UNCLASSIFIED',
      securityLevel: 'PUBLIC'
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
      case 'HIGH': return '#f59e0b';
      case 'NORMAL': return '#10b981';
      case 'LOW': return '#6b7280';
      default: return '#9ca3af';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#10b981';
      case 'IN_PROGRESS': return '#3b82f6';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'CLASSIFIED': return '#dc2626';
      case 'RESTRICTED': return '#f59e0b';
      case 'UNCLASSIFIED': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1f2937',
      color: '#f9fafb',
      fontFamily: "'Courier New', 'Roboto Mono', monospace",
      padding: '24px'
    }}>

      {/* MILITARY HEADER */}
      <div style={{
        background: 'linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%)',
        border: '2px solid #6b7280',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Corner decorations */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '16px',
          height: '16px',
          border: '2px solid #10b981',
          borderRight: 'none',
          borderBottom: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '16px',
          height: '16px',
          border: '2px solid #10b981',
          borderLeft: 'none',
          borderBottom: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          width: '16px',
          height: '16px',
          border: '2px solid #10b981',
          borderRight: 'none',
          borderTop: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          width: '16px',
          height: '16px',
          border: '2px solid #10b981',
          borderLeft: 'none',
          borderTop: 'none'
        }}></div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              marginRight: '20px',
              transform: 'rotate(45deg)',
              border: '2px solid #065f46'
            }}>
              <span style={{ transform: 'rotate(-45deg)' }}>⭐</span>
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#10b981',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: '2px 2px 0px #065f46'
              }}>
                L-KERN TACTICAL ORDERS
              </h1>
              <p style={{
                margin: '4px 0 0 0',
                color: '#d1d5db',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                DEFENSE MANUFACTURING • CLEARANCE LEVEL: ALPHA
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            <div style={{
              padding: '4px 12px',
              background: '#dc2626',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🔒 CLASSIFIED
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              OPER ID: {new Date().toISOString().slice(0, 10).replace(/-/g, '')}
            </div>
          </div>
        </div>
      </div>

      {/* TACTICAL CONTROLS */}
      <div style={{
        background: '#374151',
        border: '1px solid #6b7280',
        padding: '16px',
        marginBottom: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1' }}>
          <div style={{
            fontSize: '12px',
            color: '#10b981',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '4px'
          }}>
            [ SEARCH ORDERS ]
          </div>
          <input
            type="text"
            placeholder="ENTER SEARCH PARAMETERS..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value.toUpperCase())}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#1f2937',
              border: '2px solid #4b5563',
              color: '#f9fafb',
              fontSize: '14px',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#4b5563'}
          />
        </div>

        <button style={{
          padding: '10px 20px',
          background: '#10b981',
          border: '2px solid #065f46',
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          cursor: 'pointer',
          fontSize: '12px',
          fontFamily: 'inherit',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#059669';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#10b981';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          [+] NEW TACTICAL ORDER
        </button>
      </div>

      {/* MISSION BRIEFING TABLE */}
      <div style={{
        background: '#374151',
        border: '2px solid #6b7280'
      }}>

        {/* TABLE HEADER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr 150px 120px 120px 120px 100px',
          gap: '16px',
          padding: '12px 16px',
          background: '#4b5563',
          borderBottom: '2px solid #10b981',
          fontSize: '11px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#10b981'
        }}>
          <div>STAT</div>
          <div>MISSION / CONTRACTOR</div>
          <div>CLASSIFICATION</div>
          <div>PRIORITY</div>
          <div>STATUS</div>
          <div>VALUE ($)</div>
          <div>OPS</div>
        </div>

        {/* TABLE ROWS */}
        {orders.map((order, index) => (
          <div key={order.id}>
            {/* MAIN ROW */}
            <div
              onClick={() => toggleExpand(order.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 150px 120px 120px 120px 100px',
                gap: '16px',
                padding: '12px 16px',
                borderBottom: index < orders.length - 1 ? '1px solid #4b5563' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                background: expandedOrders.has(order.id) ? '#4b5563' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = '#3f3f3f';
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{
                fontSize: '14px',
                color: '#10b981',
                transform: expandedOrders.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ►
              </div>

              <div>
                <div style={{
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#f9fafb',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {order.orderNumber}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#d1d5db'
                }}>
                  {order.customer}
                </div>
              </div>

              <div style={{
                padding: '4px 8px',
                background: `${getClassificationColor(order.classification!)}22`,
                color: getClassificationColor(order.classification!),
                border: `1px solid ${getClassificationColor(order.classification!)}`,
                fontSize: '10px',
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {order.classification}
              </div>

              <div style={{
                padding: '4px 8px',
                background: `${getPriorityColor(order.priority)}22`,
                color: getPriorityColor(order.priority),
                border: `1px solid ${getPriorityColor(order.priority)}`,
                fontSize: '10px',
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {order.priority}
              </div>

              <div style={{
                padding: '4px 8px',
                background: `${getStatusColor(order.status)}22`,
                color: getStatusColor(order.status),
                border: `1px solid ${getStatusColor(order.status)}`,
                fontSize: '10px',
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {order.status.replace('_', ' ')}
              </div>

              <div style={{
                fontWeight: 'bold',
                color: '#10b981',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}>
                {order.value.toLocaleString()}
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{
                  padding: '4px 6px',
                  background: '#3b82f6',
                  border: '1px solid #1e40af',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  MOD
                </button>
                <button style={{
                  padding: '4px 6px',
                  background: '#dc2626',
                  border: '1px solid #991b1b',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  DEL
                </button>
              </div>
            </div>

            {/* EXPANDED INTEL */}
            {expandedOrders.has(order.id) && (
              <div style={{
                padding: '20px',
                background: '#2d3748',
                borderTop: '2px solid #10b981',
                borderBottom: index < orders.length - 1 ? '1px solid #4b5563' : 'none'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>

                  <div style={{
                    background: '#374151',
                    border: '1px solid #6b7280',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      color: '#10b981',
                      marginBottom: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderBottom: '1px solid #10b981',
                      paddingBottom: '4px'
                    }}>
                      [ MISSION INTEL ]
                    </h4>
                    <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#d1d5db' }}>
                      <div>MISSION ID: <span style={{ color: '#f9fafb' }}>{order.id}</span></div>
                      <div>START DATE: <span style={{ color: '#f9fafb' }}>{order.date}</span></div>
                      <div>UPDATED: <span style={{ color: '#f9fafb' }}>0200 HRS</span></div>
                      <div>ETA: <span style={{ color: '#f9fafb' }}>14 DAYS</span></div>
                    </div>
                  </div>

                  <div style={{
                    background: '#374151',
                    border: '1px solid #6b7280',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      color: '#10b981',
                      marginBottom: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderBottom: '1px solid #10b981',
                      paddingBottom: '4px'
                    }}>
                      [ SECURITY CLEARANCE ]
                    </h4>
                    <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#d1d5db' }}>
                      <div>LEVEL: <span style={{ color: '#f9fafb' }}>{order.securityLevel}</span></div>
                      <div>ACCESS: <span style={{ color: '#f9fafb' }}>AUTHORIZED</span></div>
                      <div>CRYPTO: <span style={{ color: '#f9fafb' }}>AES-256</span></div>
                      <div>VERIFIED: <span style={{ color: '#10b981' }}>✓ VALID</span></div>
                    </div>
                  </div>

                  <div style={{
                    background: '#374151',
                    border: '1px solid #6b7280',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      color: '#10b981',
                      marginBottom: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderBottom: '1px solid #10b981',
                      paddingBottom: '4px'
                    }}>
                      [ LOGISTICS ]
                    </h4>
                    <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#d1d5db' }}>
                      <div>UNITS: <span style={{ color: '#f9fafb' }}>15 ITEMS</span></div>
                      <div>WEIGHT: <span style={{ color: '#f9fafb' }}>8.5 TONS</span></div>
                      <div>TRANSPORT: <span style={{ color: '#f9fafb' }}>SECURED</span></div>
                      <div>CHAIN: <span style={{ color: '#10b981' }}>✓ CUSTODY</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TACTICAL STATUS BOARD */}
      <div style={{
        marginTop: '24px',
        background: '#374151',
        border: '2px solid #6b7280',
        padding: '16px'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          color: '#10b981',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          borderBottom: '1px solid #10b981',
          paddingBottom: '8px'
        }}>
          [ TACTICAL STATUS BOARD ]
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { label: 'ACTIVE MISSIONS', value: '12', icon: '🎯', color: '#10b981' },
            { label: 'CLASSIFIED ORDERS', value: '8', icon: '🔒', color: '#dc2626' },
            { label: 'TOTAL FUNDING', value: '$5.3M', icon: '💰', color: '#f59e0b' },
            { label: 'SUCCESS RATE', value: '98.7%', icon: '🏆', color: '#3b82f6' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: '#4b5563',
              border: `1px solid ${stat.color}`,
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '4px',
                fontFamily: 'monospace'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#d1d5db',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersVariant3;