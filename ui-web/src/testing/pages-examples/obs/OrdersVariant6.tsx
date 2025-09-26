/**
 * VARIANT 6: L-KERN Professional
 * Inšpirovaný starým systémom a L-KERN logom - technický, profesionálny
 * Farby z theme.css: #9c27b0, #3366cc, #f2f3f7, #222222
 */
import React, { useState } from 'react';
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

const OrdersVariant6: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');

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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f2f3f7',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '2rem 10rem 2rem 2rem'
    }}>
      <DebugBar title="OrdersVariant6 - L-KERN Professional" />

      {/* L-KERN HEADER */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        marginBottom: '2rem',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* L-KERN Logo inspirovaný screenshotom */}
            <div style={{
              width: '48px',
              height: '48px',
              background: '#222222',
              border: '3px solid #222222',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              position: 'relative'
            }}>
              {/* Brain + Circuit pattern */}
              <div style={{
                width: '24px',
                height: '24px',
                background: 'white',
                borderRadius: '4px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '2px',
                  top: '2px',
                  width: '8px',
                  height: '8px',
                  background: '#222222',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  position: 'absolute',
                  right: '2px',
                  top: '2px',
                  width: '4px',
                  height: '4px',
                  background: '#9c27b0'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '6px',
                  background: '#3366cc'
                }}></div>
              </div>
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '600',
                color: '#222222',
                letterSpacing: '0.5px'
              }}>
                📦 L-KERN Orders Management
              </h1>
              <p style={{
                margin: '4px 0 0 0',
                color: '#546e7a',
                fontSize: '14px'
              }}>
                Advanced Manufacturing • Defense Systems • Industrial Solutions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS - inšpirované starým systémom */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '1rem',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Hľadať v stave, dátumoch, zákazníkovi, číslach objednávok..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            flex: '1',
            padding: '0.375rem 0.75rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '0.875rem',
            color: '#222222',
            background: 'white'
          }}
        />
        <button style={{
          padding: '0.375rem 0.75rem',
          backgroundColor: '#9c27b0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.875rem',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Nová objednávka
        </button>
      </div>

      {/* DATA GRID - ako starý systém */}
      <div style={{
        background: 'white',
        border: '1px solid #dee2e6',
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
          <div style={{ width: '50px', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}></div>
          <div style={{ width: '180px', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}>Stav Objednávky</div>
          <div style={{ width: '140px', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}>Dátum Prijatia</div>
          <div style={{ flex: '1', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}>Zákazník</div>
          <div style={{ width: '200px', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}>Interné Číslo Objednávky</div>
          <div style={{ width: '120px', padding: '6px 12px', borderRight: '1px solid #dee2e6' }}>Hodnota</div>
          <div style={{ width: '200px', padding: '6px 12px' }}>Akcie</div>
        </div>

        {/* DATA ROWS */}
        {orders.map((order) => (
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
              <div style={{
                width: '50px',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
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

              <div style={{
                width: '180px',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
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

              <div style={{
                width: '140px',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
                fontSize: '0.85rem',
                color: '#495057'
              }}>
                {order.date}
              </div>

              <div style={{
                flex: '1',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
                fontSize: '0.85rem',
                color: '#495057'
              }}>
                {order.customer}
              </div>

              <div style={{
                width: '200px',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: '#495057'
              }}>
                {order.orderNumber}
              </div>

              <div style={{
                width: '120px',
                padding: '6px 12px',
                borderRight: '1px solid #dee2e6',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                color: '#495057'
              }}>
                ${order.value.toLocaleString()}
              </div>

              <div style={{
                width: '200px',
                padding: '6px 12px',
                display: 'flex',
                gap: '4px'
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
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#9c27b0' }}>Active Orders:</strong> 127
        </div>
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: '1px solid #dee2e6',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3366cc' }}>Completed This Month:</strong> 1,524
        </div>
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: '1px solid #dee2e6',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#f57c00' }}>Total Value:</strong> $26.6M
        </div>
      </div>
    </div>
  );
};

export default OrdersVariant6;