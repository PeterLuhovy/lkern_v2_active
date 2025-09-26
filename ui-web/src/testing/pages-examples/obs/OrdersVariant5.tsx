/**
 * VARIANT 5: Corporate Premium
 * Luxusný korporátny dizajn s brand farbami zo screenshotu
 * Farby: fialová (#9c27b0), tmavomodrá (#3366cc), biela, šedá
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
  industry?: string;
}

const OrdersVariant5: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');

  // Mock corporate/enterprise data
  const orders: Order[] = [
    {
      id: '001',
      orderNumber: 'LKRN-2024-001',
      customer: 'Lockheed Martin Aerospace',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      date: '2024-09-24',
      value: 8500000,
      industry: 'Aerospace & Defense'
    },
    {
      id: '002',
      orderNumber: 'LKRN-2024-002',
      customer: 'Tesla Energy Division',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-23',
      value: 4200000,
      industry: 'Clean Energy'
    },
    {
      id: '003',
      orderNumber: 'LKRN-2024-003',
      customer: 'Johnson & Johnson Medical',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-22',
      value: 2750000,
      industry: 'Healthcare'
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
      background: 'linear-gradient(135deg, #f2f3f7 0%, #e8eaf6 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '32px'
    }}>
      <DebugBar title="OrdersVariant5 - Corporate Premium" />

      {/* PREMIUM CORPORATE HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 20px 60px rgba(156, 39, 176, 0.15)',
        border: '1px solid rgba(156, 39, 176, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.03) 0%, rgba(51, 102, 204, 0.03) 100%)',
          borderRadius: '24px'
        }}></div>

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            marginRight: '24px',
            boxShadow: '0 12px 30px rgba(156, 39, 176, 0.3)',
            color: 'white'
          }}>
            🧠
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #9c27b0 0%, #3366cc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '8px'
            }}>
              L-KERN Enterprise Orders
            </h1>
            <p style={{
              margin: 0,
              color: '#546e7a',
              fontSize: '18px',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              Advanced Manufacturing Solutions • Global Industry Leadership
            </p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
              color: 'white',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 8px 20px rgba(156, 39, 176, 0.3)',
              marginBottom: '8px'
            }}>
              ✨ PREMIUM TIER
            </div>
            <div style={{ fontSize: '12px', color: '#9e9e9e' }}>
              Global Delivery Network
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM SEARCH & CONTROLS */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '28px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '400px' }}>
            <label style={{
              display: 'block',
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#263238',
              letterSpacing: '0.3px'
            }}>
              Advanced Order Search
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by order number, customer, industry sector, or value range..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 24px 16px 56px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  color: '#263238',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  background: '#fafafa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#9c27b0';
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = '0 0 0 4px rgba(156, 39, 176, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.background = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: '#9c27b0'
              }}>
                🔍
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(156, 39, 176, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(156, 39, 176, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(156, 39, 176, 0.3)';
            }}
            >
              ➕ Create New Order
            </button>

            <button style={{
              padding: '16px 24px',
              background: 'white',
              border: '2px solid #3366cc',
              borderRadius: '16px',
              color: '#3366cc',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3366cc';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#3366cc';
            }}
            >
              📊 Analytics
            </button>
          </div>
        </div>
      </div>

      {/* PREMIUM ORDERS TABLE */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 12px 50px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0'
      }}>

        {/* ELEGANT TABLE HEADER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 200px 160px 160px 180px 150px',
          gap: '24px',
          padding: '24px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 100%)',
          borderBottom: '2px solid rgba(156, 39, 176, 0.1)',
          fontSize: '14px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#263238'
        }}>
          <div></div>
          <div>Order Details</div>
          <div>Industry Sector</div>
          <div>Priority Level</div>
          <div>Status</div>
          <div>Contract Value</div>
          <div>Actions</div>
        </div>

        {/* PREMIUM TABLE ROWS */}
        {orders.map((order, index) => (
          <div key={order.id}>
            {/* MAIN ROW */}
            <div
              onClick={() => toggleExpand(order.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 200px 160px 160px 180px 150px',
                gap: '24px',
                padding: '24px',
                borderBottom: index < orders.length - 1 ? '1px solid #f5f5f5' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: expandedOrders.has(order.id) ? 'rgba(156, 39, 176, 0.02)' : 'white'
              }}
              onMouseEnter={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = '#fafafa';
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedOrders.has(order.id)) {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${expandedOrders.has(order.id) ? '#9c27b0' : '#f5f5f5'} 0%, ${expandedOrders.has(order.id) ? '#6a1b9a' : '#e0e0e0'} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: expandedOrders.has(order.id) ? 'white' : '#9c27b0',
                transition: 'all 0.3s ease',
                transform: expandedOrders.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                boxShadow: expandedOrders.has(order.id) ? '0 6px 20px rgba(156, 39, 176, 0.3)' : 'none'
              }}>
                ▶
              </div>

              <div>
                <div style={{
                  fontWeight: '800',
                  marginBottom: '8px',
                  color: '#263238',
                  fontSize: '18px'
                }}>
                  {order.orderNumber}
                </div>
                <div style={{
                  fontSize: '15px',
                  color: '#546e7a',
                  fontWeight: '500'
                }}>
                  {order.customer}
                </div>
              </div>

              <div style={{
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(51, 102, 204, 0.1) 0%, rgba(51, 102, 204, 0.05) 100%)',
                color: '#3366cc',
                border: '1px solid rgba(51, 102, 204, 0.2)'
              }}>
                {order.industry}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: `linear-gradient(135deg, ${getPriorityColor(order.priority)}15 0%, ${getPriorityColor(order.priority)}08 100%)`,
                color: getPriorityColor(order.priority),
                border: `1.5px solid ${getPriorityColor(order.priority)}30`
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: getPriorityColor(order.priority),
                  marginRight: '10px'
                }}></div>
                {order.priority}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: `linear-gradient(135deg, ${getStatusColor(order.status)}15 0%, ${getStatusColor(order.status)}08 100%)`,
                color: getStatusColor(order.status),
                border: `1.5px solid ${getStatusColor(order.status)}30`
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: getStatusColor(order.status),
                  marginRight: '10px'
                }}></div>
                {order.status.replace('_', ' ')}
              </div>

              <div style={{
                fontWeight: '800',
                color: '#263238',
                fontSize: '20px'
              }}>
                ${order.value.toLocaleString()}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '10px 12px',
                  background: 'linear-gradient(135deg, #3366cc 0%, #1e40af 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  ✏️
                </button>
                <button style={{
                  padding: '10px 12px',
                  background: 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  📧
                </button>
              </div>
            </div>

            {/* PREMIUM EXPANDED CONTENT */}
            {expandedOrders.has(order.id) && (
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.02) 0%, rgba(51, 102, 204, 0.02) 100%)',
                borderTop: '2px solid rgba(156, 39, 176, 0.1)',
                borderBottom: index < orders.length - 1 ? '1px solid #f5f5f5' : 'none'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '32px'
                }}>

                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(156, 39, 176, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                  }}>
                    <h4 style={{
                      color: '#9c27b0',
                      marginBottom: '20px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      📋 Contract Details
                    </h4>
                    <div style={{ fontSize: '15px', lineHeight: '2', color: '#546e7a' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Contract ID:</strong> {order.id}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Created:</strong> {order.date}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Last Updated:</strong> 4 hours ago
                      </div>
                      <div>
                        <strong style={{ color: '#263238' }}>Delivery:</strong> 45 days
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(51, 102, 204, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                  }}>
                    <h4 style={{
                      color: '#3366cc',
                      marginBottom: '20px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      🏢 Business Intelligence
                    </h4>
                    <div style={{ fontSize: '15px', lineHeight: '2', color: '#546e7a' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Account Tier:</strong> <span style={{ color: '#9c27b0' }}>Premium</span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Relationship:</strong> 8 years
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Credit Rating:</strong> <span style={{ color: '#388e3c' }}>AAA</span>
                      </div>
                      <div>
                        <strong style={{ color: '#263238' }}>Annual Volume:</strong> $25M+
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(56, 142, 60, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                  }}>
                    <h4 style={{
                      color: '#388e3c',
                      marginBottom: '20px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      🚚 Logistics & Delivery
                    </h4>
                    <div style={{ fontSize: '15px', lineHeight: '2', color: '#546e7a' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Components:</strong> 42 items
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Packaging:</strong> Premium
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#263238' }}>Shipping:</strong> Express
                      </div>
                      <div>
                        <strong style={{ color: '#263238' }}>Insurance:</strong> Full Coverage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PREMIUM DASHBOARD FOOTER */}
      <div style={{
        marginTop: '32px',
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{
            margin: 0,
            color: '#263238',
            fontSize: '24px',
            fontWeight: '800'
          }}>
            Executive Dashboard
          </h3>
          <div style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
            color: 'white',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Live Updates
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {[
            { label: 'Active Contracts', value: '156', trend: '+12%', icon: '📊', color: '#9c27b0' },
            { label: 'Monthly Revenue', value: '$15.4M', trend: '+8%', icon: '💰', color: '#388e3c' },
            { label: 'Customer Satisfaction', value: '98.7%', trend: '+2%', icon: '⭐', color: '#f57c00' },
            { label: 'Global Reach', value: '47 Countries', trend: '+3', icon: '🌍', color: '#3366cc' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}04 100%)`,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${stat.color}20`,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: `${stat.color}10`,
                borderRadius: '50%'
              }}></div>

              <div style={{ fontSize: '32px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: stat.color,
                marginBottom: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#546e7a',
                fontWeight: '600',
                marginBottom: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#388e3c',
                fontWeight: '700',
                padding: '4px 8px',
                background: '#e8f5e8',
                borderRadius: '12px',
                display: 'inline-block',
                position: 'relative',
                zIndex: 1
              }}>
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersVariant5;