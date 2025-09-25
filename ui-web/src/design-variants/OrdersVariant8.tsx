/*
 * ================================================================
 * SÚBOR: OrdersVariant8.tsx
 * CESTA: /ui-web/src/design-variants/OrdersVariant8.tsx
 * POPIS: Funkcionalita v7 (sortovanie, resizable, filter) s kompletným dizajnom a farbami v6
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-24 21:45:00
 * ================================================================
 */
import React, { useState, useRef } from 'react';
import lkernLogo from '../assets/logos/lkern-logo.png';
import luhovyLogo from '../assets/logos/luhovy-logo.png';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string;
  value: number;
  items?: number;
  description?: string;
  details?: {
    partNumber: string;
    quantity: number;
    unitPrice: number;
    specifications: string;
  }[];
}

type SortField = 'orderNumber' | 'customer' | 'priority' | 'status' | 'date' | 'value' | 'items';
type SortDirection = 'asc' | 'desc';

const OrdersVariant8: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']));
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(new Set(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']));
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [columnWidths, setColumnWidths] = useState<number[]>([50, 240, 200, 100, 120, 100, 140, 80]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number>(-1);
  const dragStartX = useRef(0);
  const startWidth = useRef(0);

  // Professional enterprise data - same as v7
  const baseOrders: Order[] = [
    {
      id: '001',
      orderNumber: 'ORD-LCVV-240924-001-LMT',
      customer: 'Lockheed Martin Corporation',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      date: '2024-09-24',
      value: 12500000,
      items: 127,
      description: 'F-35 Lightning II fighter jet advanced components',
      details: [
        { partNumber: 'LMT-F35-001', quantity: 45, unitPrice: 185000, specifications: 'Stealth coating titanium panels' },
        { partNumber: 'LMT-F35-002', quantity: 82, unitPrice: 95000, specifications: 'Avionics housing assemblies' }
      ]
    },
    {
      id: '002',
      orderNumber: 'ORD-LIND-240923-002-BAE',
      customer: 'BAE Systems plc',
      priority: 'HIGH',
      status: 'PENDING',
      date: '2024-09-23',
      value: 8900000,
      items: 89,
      description: 'Eurofighter Typhoon upgrade components',
      details: [
        { partNumber: 'BAE-EF-301', quantity: 34, unitPrice: 145000, specifications: 'Radar system components' },
        { partNumber: 'BAE-EF-302', quantity: 55, unitPrice: 115000, specifications: 'Engine intake assemblies' }
      ]
    },
    {
      id: '003',
      orderNumber: 'ORD-LCVV-240922-003-RTN',
      customer: 'Raytheon Technologies',
      priority: 'NORMAL',
      status: 'COMPLETED',
      date: '2024-09-22',
      value: 5200000,
      items: 156,
      description: 'Missile guidance system precision parts',
      details: [
        { partNumber: 'RTN-MSG-501', quantity: 89, unitPrice: 35000, specifications: 'Gyroscope housing units' },
        { partNumber: 'RTN-MSG-502', quantity: 67, unitPrice: 42000, specifications: 'Ceramic guidance fins' }
      ]
    },
    {
      id: '004',
      orderNumber: 'ORD-LIND-240921-004-NGR',
      customer: 'Northrop Grumman',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      date: '2024-09-21',
      value: 15200000,
      items: 203,
      description: 'B-21 Raider stealth bomber components',
      details: [
        { partNumber: 'NGR-B21-701', quantity: 125, unitPrice: 78000, specifications: 'Stealth surface panels' },
        { partNumber: 'NGR-B21-702', quantity: 78, unitPrice: 125000, specifications: 'Engine mount assemblies' }
      ]
    },
    {
      id: '005',
      orderNumber: 'ORD-LCVV-240920-005-BOE',
      customer: 'Boeing Defense',
      priority: 'LOW',
      status: 'CANCELLED',
      date: '2024-09-20',
      value: 3400000,
      items: 67,
      description: 'Apache helicopter maintenance parts',
      details: [
        { partNumber: 'BOE-AH-901', quantity: 34, unitPrice: 65000, specifications: 'Rotor blade assemblies' },
        { partNumber: 'BOE-AH-902', quantity: 33, unitPrice: 38000, specifications: 'Hydraulic system components' }
      ]
    }
  ];

  // Sorting logic - same as v7
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Column resizing logic - same as v7
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsDragging(true);
    setDragIndex(index);
    dragStartX.current = e.clientX;
    startWidth.current = columnWidths[index];

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragIndex >= 0) {
        const diff = e.clientX - dragStartX.current;
        const newWidth = Math.max(50, startWidth.current + diff);
        const newWidths = [...columnWidths];
        newWidths[dragIndex] = newWidth;
        setColumnWidths(newWidths);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragIndex(-1);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
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

  // Sort and filter orders - same as v7
  const filteredAndSortedOrders = baseOrders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter.has(order.status);
      const matchesPriority = priorityFilter.has(order.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (sortField === 'value' || sortField === 'items') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  // Colors exactly like v6
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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '⇅';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const handleReportBug = () => {
    alert('Bug report feature - would open bug report dialog in real system');
  };

  const totalValue = filteredAndSortedOrders.reduce((sum, order) => sum + order.value, 0);
  const totalItems = filteredAndSortedOrders.reduce((sum, order) => sum + (order.items || 0), 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f2f3f7', // v6 background
      fontFamily: "'Segoe UI', sans-serif",
      padding: '2rem 10rem 2rem 2rem' // v6 padding
    }}>

      {/* L-KERN HEADER - EXACTLY like v6 */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        marginBottom: '2rem',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #9c27b0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src={lkernLogo} alt="L-KERN" style={{ height: '42px' }} />
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              color: '#222222' // v6 text color
            }}>
              L-KERN Orders Management
            </h1>
            <div style={{
              fontSize: '14px',
              color: '#9c27b0',
              fontWeight: '600',
              marginTop: '4px'
            }}>
              Professional ERP System v8 • Advanced Manufacturing Operations
            </div>
          </div>
        </div>
        <img src={luhovyLogo} alt="Luhovy Industries" style={{ height: '36px' }} />
      </div>

      {/* Filter panel - v7 functionality with v6 design */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #3366cc',
        padding: '24px',
        marginBottom: '2rem'
      }}>
        {/* Search bar - v6 styling */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search orders, customers, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#f2f3f7', // v6 input background
              border: '2px solid #dee2e6', // v6 border
              borderRadius: '4px', // v6 border radius
              color: '#222222', // v6 text color
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9c27b0'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>

        {/* Fast filters - v7 functionality, v6 styling */}
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
                  color: '#222222', // v6 text color
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
                  color: '#222222', // v6 text color
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

          {/* Results count and Report button */}
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
              onClick={handleReportBug}
              style={{
                padding: '8px 16px',
                background: '#9c27b0',
                border: 'none',
                borderRadius: '4px', // v6 border radius
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a1b9a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9c27b0'}
            >
              🐛 Report Bug
            </button>
          </div>
        </div>
      </div>

      {/* Main table - EXACTLY v6 design with v7 functionality */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #9c27b0',
        overflow: 'hidden'
      }}>
        {/* Sortable Header - v7 functionality, v6 styling */}
        <div style={{
          display: 'flex',
          background: 'linear-gradient(90deg, #9c27b0 0%, #6a1b9a 100%)', // v6 header
          color: 'white',
          fontWeight: '700',
          fontSize: '13px',
          position: 'relative'
        }}>
          {[
            { field: null, title: '', width: columnWidths[0] },
            { field: 'orderNumber', title: 'ORDER NUMBER', width: columnWidths[1] },
            { field: 'customer', title: 'CUSTOMER', width: columnWidths[2] },
            { field: 'priority', title: 'PRIORITY', width: columnWidths[3] },
            { field: 'status', title: 'STATUS', width: columnWidths[4] },
            { field: 'date', title: 'DATE', width: columnWidths[5] },
            { field: 'value', title: 'VALUE', width: columnWidths[6] },
            { field: 'items', title: 'ITEMS', width: columnWidths[7] }
          ].map((col, index) => (
            <div
              key={index}
              style={{
                width: `${col.width}px`,
                minWidth: `${col.width}px`,
                padding: '16px 12px',
                cursor: col.field ? 'pointer' : 'default',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: col.field === 'value' ? 'flex-end' : col.field === 'items' ? 'center' : 'flex-start'
              }}
              onClick={() => col.field && handleSort(col.field as SortField)}
            >
              {col.title}
              {col.field && (
                <span style={{ marginLeft: '6px', fontSize: '10px' }}>
                  {getSortIcon(col.field as SortField)}
                </span>
              )}
              {/* Resizable handle - v7 functionality */}
              {index < columnWidths.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    width: '4px',
                    cursor: 'col-resize',
                    background: 'rgba(255,255,255,0.2)'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Rows - EXACTLY v6 styling */}
        {filteredAndSortedOrders.map((order, index) => (
          <div key={order.id}>
            {/* Main row */}
            <div
              onClick={() => toggleRow(order.id)}
              style={{
                display: 'flex',
                background: index % 2 === 0 ? '#ffffff' : '#f8f9fa', // v6 alternating colors
                borderTop: index > 0 ? '1px solid #dee2e6' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '14px',
                minHeight: '54px',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e3f2fd'; // v6 hover color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : '#f8f9fa';
              }}
            >
              <div style={{
                width: `${columnWidths[0]}px`,
                minWidth: `${columnWidths[0]}px`,
                padding: '0 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <span style={{
                  transform: expandedRows.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '16px',
                  color: '#9c27b0'
                }}>
                  ▶
                </span>
              </div>
              <div style={{
                width: `${columnWidths[1]}px`,
                minWidth: `${columnWidths[1]}px`,
                padding: '0 12px',
                fontFamily: 'monospace',
                fontWeight: '600',
                color: '#3366cc' // v6 accent color
              }}>
                {order.orderNumber}
              </div>
              <div style={{
                width: `${columnWidths[2]}px`,
                minWidth: `${columnWidths[2]}px`,
                padding: '0 12px',
                fontWeight: '600',
                color: '#222222' // v6 text color
              }}>
                {order.customer}
              </div>
              <div style={{
                width: `${columnWidths[3]}px`,
                minWidth: `${columnWidths[3]}px`,
                padding: '0 12px'
              }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '3px', // v6 border radius
                  fontSize: '12px',
                  fontWeight: '600',
                  background: getPriorityColor(order.priority),
                  color: 'white'
                }}>
                  {order.priority}
                </span>
              </div>
              <div style={{
                width: `${columnWidths[4]}px`,
                minWidth: `${columnWidths[4]}px`,
                padding: '0 12px'
              }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '3px', // v6 border radius
                  fontSize: '12px',
                  fontWeight: '600',
                  background: getStatusColor(order.status),
                  color: 'white'
                }}>
                  {order.status}
                </span>
              </div>
              <div style={{
                width: `${columnWidths[5]}px`,
                minWidth: `${columnWidths[5]}px`,
                padding: '0 12px',
                fontFamily: 'monospace',
                color: '#666' // v6 muted color
              }}>
                {order.date}
              </div>
              <div style={{
                width: `${columnWidths[6]}px`,
                minWidth: `${columnWidths[6]}px`,
                padding: '0 12px',
                textAlign: 'right',
                fontWeight: '700',
                color: '#388e3c' // v6 success color
              }}>
                ${order.value.toLocaleString()}
              </div>
              <div style={{
                width: `${columnWidths[7]}px`,
                minWidth: `${columnWidths[7]}px`,
                padding: '0 12px',
                textAlign: 'center',
                fontWeight: '600',
                color: '#222222' // v6 text color
              }}>
                {order.items}
              </div>
            </div>

            {/* Expanded details - EXACTLY v6 styling */}
            {expandedRows.has(order.id) && (
              <div style={{
                background: '#f2f3f7', // v6 detail background
                border: '2px solid #9c27b0',
                borderTop: 'none',
                padding: '24px',
                fontSize: '13px'
              }}>
                <div style={{
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#9c27b0'
                }}>
                  📋 ORDER DETAILS: {order.description}
                </div>

                {order.details && (
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '4px', // v6 border radius
                    overflow: 'hidden',
                    border: '1px solid #dee2e6'
                  }}>
                    {/* Detail header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '150px 80px 120px 1fr',
                      background: '#f8f9fa', // v6 header background
                      padding: '12px',
                      fontWeight: '700',
                      fontSize: '12px',
                      color: '#222222', // v6 text color
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <div>PART NUMBER</div>
                      <div style={{ textAlign: 'center' }}>QTY</div>
                      <div style={{ textAlign: 'right' }}>UNIT PRICE</div>
                      <div style={{ paddingLeft: '16px' }}>SPECIFICATIONS</div>
                    </div>

                    {/* Detail rows */}
                    {order.details.map((detail, idx) => (
                      <div key={idx} style={{
                        display: 'grid',
                        gridTemplateColumns: '150px 80px 120px 1fr',
                        padding: '12px',
                        background: idx % 2 === 0 ? '#ffffff' : '#f8f9fa', // v6 alternating
                        borderTop: idx > 0 ? '1px solid #dee2e6' : 'none'
                      }}>
                        <div style={{
                          fontFamily: 'monospace',
                          fontWeight: '600',
                          color: '#3366cc' // v6 accent
                        }}>
                          {detail.partNumber}
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: '600', color: '#222222' }}>
                          {detail.quantity}
                        </div>
                        <div style={{
                          textAlign: 'right',
                          fontWeight: '600',
                          color: '#388e3c' // v6 success
                        }}>
                          ${detail.unitPrice.toLocaleString()}
                        </div>
                        <div style={{
                          paddingLeft: '16px',
                          color: '#666' // v6 muted
                        }}>
                          {detail.specifications}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status bar - EXACTLY v6 style */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: '#ffffff',
        border: '1px solid #dee2e6',
        borderLeft: '6px solid #388e3c'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#222222' // v6 text color
          }}>
            <strong>Orders:</strong> {filteredAndSortedOrders.length}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#222222' // v6 text color
          }}>
            <strong>Total Items:</strong> {totalItems.toLocaleString()}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#388e3c' // v6 success color
          }}>
            <strong>Total Value:</strong> ${totalValue.toLocaleString()}
          </div>
        </div>

        <div style={{
          fontSize: '12px',
          color: '#666', // v6 muted
          fontWeight: '600'
        }}>
          L-KERN Professional ERP v8 • Luhovy Industries Manufacturing Solutions
        </div>
      </div>
    </div>
  );
};

export default OrdersVariant8;