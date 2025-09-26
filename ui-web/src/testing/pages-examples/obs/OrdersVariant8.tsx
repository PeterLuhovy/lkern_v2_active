/*
 * ================================================================
 * SÚBOR: OrdersVariant8.tsx
 * CESTA: /ui-web/src/testing/design-examples/OrdersVariant8.tsx
 * POPIS: Funkcionalita v7 (sortovanie, resizable, filter) s kompletným dizajnom a farbami v6 - refaktorované s centralizovanými konštantami
 * VERZIA: v2.0.0
 * UPRAVENÉ: 2024-09-25 16:15:00
 * ================================================================
 */
import React, { useState, useRef } from 'react';
import { COLORS, SPACING, LAYOUT, TYPOGRAPHY, UI_BEHAVIOR } from '../../../config/constants';
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

// === COMPONENT CONSTANTS ===
// Centralizované konštanty pre OrdersVariant8 komponent
// Používa centrálne constants.ts pre design tokens a business pravidlá

// Column configuration pre resizable table
const COLUMN_CONFIG = {
  defaultWidths: [50, 240, 200, 100, 120, 100, 140, 80], // px values pre štartovné šírky stĺpcov
  minWidth: 50, // minimálna šírka stĺpca pri resize
  resizeHandleWidth: 4 // šírka resize handle v px
};

// Status colors pre order status badges
const STATUS_COLORS = {
  COMPLETED: COLORS.status.success,     // #4CAF50
  IN_PROGRESS: COLORS.brand.secondary,  // #3366cc
  PENDING: COLORS.status.warning,       // #FF9800
  CANCELLED: COLORS.status.error,       // #f44336
  default: COLORS.status.muted          // #9E9E9E
};

// Priority colors pre priority badges
const PRIORITY_COLORS = {
  CRITICAL: '#d32f2f',    // Tmavo červená pre kritické
  HIGH: '#f57c00',        // Oranžová pre vysokú
  NORMAL: COLORS.brand.secondary, // #3366cc
  LOW: COLORS.status.success,     // #4CAF50
  default: COLORS.neutral.gray600 // #757575
};

// Layout styles pre spacing, padding, margins
const LAYOUT_STYLES = {
  pageBackground: COLORS.neutral.gray100, // #f2f3f7
  cardBackground: COLORS.neutral.white,   // #ffffff
  borderColor: COLORS.neutral.gray200,    // #dee2e6
  pagePadding: {
    top: SPACING.xxxl,        // 32px
    right: '10rem',           // Špeciálne right padding pre sidebar
    bottom: SPACING.xxxl,     // 32px
    left: SPACING.xxxl        // 32px
  },
  cardPadding: SPACING.xl,    // 20px
  cardMargin: SPACING.xxxl,   // 32px
  filterPanelPadding: SPACING.xxl, // 24px
  inputPadding: {
    vertical: SPACING.md,     // 12px
    horizontal: SPACING.lg    // 16px
  },
  sectionSpacing: SPACING.xl, // 20px
  itemSpacing: SPACING.md,    // 12px
  gapSmall: SPACING.xs,       // 4px
  gapMedium: SPACING.md,      // 12px
  gapLarge: SPACING.lg,       // 16px
  gapXLarge: SPACING.xxxl     // 32px
};

// Typography styles pre font sizes a weights
const TYPOGRAPHY_STYLES = {
  headerTitle: {
    size: 28,                           // px
    weight: TYPOGRAPHY.fontWeight.bold  // 700
  },
  headerSubtitle: {
    size: TYPOGRAPHY.fontSize.md,             // 14px
    weight: TYPOGRAPHY.fontWeight.semibold    // 600
  },
  bodyText: {
    size: TYPOGRAPHY.fontSize.md,       // 14px
    weight: TYPOGRAPHY.fontWeight.normal // 400
  },
  buttonText: {
    size: TYPOGRAPHY.fontSize.sm,             // 12px (13px adjusted to match old)
    weight: TYPOGRAPHY.fontWeight.semibold    // 600
  },
  badgeText: {
    size: TYPOGRAPHY.fontSize.sm,             // 12px
    weight: TYPOGRAPHY.fontWeight.semibold    // 600
  },
  tableHeader: {
    size: TYPOGRAPHY.fontSize.sm,             // 12px (13px adjusted)
    weight: TYPOGRAPHY.fontWeight.bold        // 700
  },
  valueText: {
    size: TYPOGRAPHY.fontSize.md,       // 14px
    weight: TYPOGRAPHY.fontWeight.bold  // 700
  }
};

// UI colors pre rozličné elementy
const UI_COLORS = {
  primary: COLORS.brand.primary,        // #9c27b0
  secondary: COLORS.brand.secondary,    // #3366cc
  accent: COLORS.brand.accent,          // #E91E63
  primaryDark: COLORS.brand.dark,       // #5e1065
  text: COLORS.neutral.gray900,         // #212121 (#222222 adjusted)
  textMuted: COLORS.neutral.gray600,    // #757575 (#666 adjusted)
  success: COLORS.status.success,       // #4CAF50 (#388e3c adjusted)
  hover: '#e3f2fd',                     // Light blue hover effect
  alternateRow: COLORS.neutral.gray50,  // #fafafa (#f8f9fa adjusted)
  inputBackground: COLORS.neutral.gray100, // #f5f5f5 (#f2f3f7 adjusted)
  detailBackground: COLORS.neutral.gray100 // #f5f5f5 (#f2f3f7 adjusted)
};

// Gradient definitions
const GRADIENTS = {
  headerGradient: `linear-gradient(90deg, ${COLORS.brand.primary} 0%, ${COLORS.brand.dark} 100%)`,
  borderAccent: `6px solid ${COLORS.brand.primary}`
};

const OrdersVariant8: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']));
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(new Set(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']));
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [columnWidths, setColumnWidths] = useState<number[]>(COLUMN_CONFIG.defaultWidths);
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
        const newWidth = Math.max(COLUMN_CONFIG.minWidth, startWidth.current + diff);
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

  // Colors using centralized constants
  const getPriorityColor = (priority: string) => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.default;
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
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
      background: LAYOUT_STYLES.pageBackground,
      fontFamily: "'Segoe UI', sans-serif",
      padding: `${LAYOUT_STYLES.pagePadding.top}px ${LAYOUT_STYLES.pagePadding.right} ${LAYOUT_STYLES.pagePadding.bottom}px ${LAYOUT_STYLES.pagePadding.left}px`
    }}>
      <DebugBar title="OrdersVariant8 - Full Refactored" />

      {/* L-KERN HEADER - refaktorovaný s konštantami */}
      <div style={{
        background: LAYOUT_STYLES.cardBackground,
        padding: `${LAYOUT_STYLES.cardPadding}px`,
        marginBottom: `${LAYOUT_STYLES.cardMargin}px`,
        border: `1px solid ${LAYOUT_STYLES.borderColor}`,
        borderLeft: GRADIENTS.borderAccent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: `${LAYOUT_STYLES.sectionSpacing}px` }}>
          <img src={lkernLogo} alt="L-KERN" style={{ height: '42px' }} />
          <div>
            <h1 style={{
              margin: 0,
              fontSize: `${TYPOGRAPHY_STYLES.headerTitle.size}px`,
              fontWeight: TYPOGRAPHY_STYLES.headerTitle.weight,
              color: UI_COLORS.text
            }}>
              L-KERN Orders Management
            </h1>
            <div style={{
              fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
              color: UI_COLORS.primary,
              fontWeight: TYPOGRAPHY_STYLES.headerSubtitle.weight,
              marginTop: `${LAYOUT_STYLES.gapSmall}px`
            }}>
              Professional ERP System v8 • Advanced Manufacturing Operations
            </div>
          </div>
        </div>
        <img src={luhovyLogo} alt="Luhovy Industries" style={{ height: '36px' }} />
      </div>

      {/* Filter panel - refaktorovaný s konštantami */}
      <div style={{
        background: LAYOUT_STYLES.cardBackground,
        border: `1px solid ${LAYOUT_STYLES.borderColor}`,
        borderLeft: `6px solid ${UI_COLORS.secondary}`,
        padding: `${LAYOUT_STYLES.filterPanelPadding}px`,
        marginBottom: `${LAYOUT_STYLES.cardMargin}px`
      }}>
        {/* Search bar - refaktorovaný s konštantami */}
        <div style={{ marginBottom: `${LAYOUT_STYLES.sectionSpacing}px` }}>
          <input
            type="text"
            placeholder="Search orders, customers, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: `${LAYOUT_STYLES.inputPadding.vertical}px ${LAYOUT_STYLES.inputPadding.horizontal}px`,
              background: UI_COLORS.inputBackground,
              border: `2px solid ${LAYOUT_STYLES.borderColor}`,
              borderRadius: `${LAYOUT.borderRadius.sm}px`,
              color: UI_COLORS.text,
              fontSize: `${TYPOGRAPHY_STYLES.bodyText.size + 2}px`, // 16px
              outline: 'none',
              transition: `border-color ${UI_BEHAVIOR.animation.fast}ms`
            }}
            onFocus={(e) => e.target.style.borderColor = UI_COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = LAYOUT_STYLES.borderColor}
          />
        </div>

        {/* Fast filters - refaktorovaný s konštantami */}
        <div style={{ display: 'flex', gap: `${LAYOUT_STYLES.gapXLarge}px`, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Status filter */}
          <div>
            <div style={{
              fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
              fontWeight: TYPOGRAPHY_STYLES.tableHeader.weight,
              color: UI_COLORS.primary,
              marginBottom: `${LAYOUT_STYLES.gapMedium - 4}px` // 8px
            }}>
              STATUS FILTER
            </div>
            <div style={{ display: 'flex', gap: `${LAYOUT_STYLES.itemSpacing}px`, flexWrap: 'wrap' }}>
              {['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(status => (
                <label key={status} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${LAYOUT_STYLES.gapSmall + 2}px`, // 6px
                  cursor: 'pointer',
                  fontSize: `${TYPOGRAPHY_STYLES.buttonText.size + 1}px`, // 13px
                  color: UI_COLORS.text,
                  fontWeight: TYPOGRAPHY_STYLES.buttonText.weight
                }}>
                  <input
                    type="checkbox"
                    checked={statusFilter.has(status)}
                    onChange={() => handleStatusFilterChange(status)}
                    style={{
                      accentColor: UI_COLORS.primary,
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
              fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
              fontWeight: TYPOGRAPHY_STYLES.tableHeader.weight,
              color: UI_COLORS.primary,
              marginBottom: `${LAYOUT_STYLES.gapMedium - 4}px` // 8px
            }}>
              PRIORITY FILTER
            </div>
            <div style={{ display: 'flex', gap: `${LAYOUT_STYLES.itemSpacing}px`, flexWrap: 'wrap' }}>
              {['LOW', 'NORMAL', 'HIGH', 'CRITICAL'].map(priority => (
                <label key={priority} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${LAYOUT_STYLES.gapSmall + 2}px`, // 6px
                  cursor: 'pointer',
                  fontSize: `${TYPOGRAPHY_STYLES.buttonText.size + 1}px`, // 13px
                  color: UI_COLORS.text,
                  fontWeight: TYPOGRAPHY_STYLES.buttonText.weight
                }}>
                  <input
                    type="checkbox"
                    checked={priorityFilter.has(priority)}
                    onChange={() => handlePriorityFilterChange(priority)}
                    style={{
                      accentColor: UI_COLORS.primary,
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
            gap: `${LAYOUT_STYLES.gapLarge}px`
          }}>
            <div style={{
              color: UI_COLORS.secondary,
              fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
              fontWeight: TYPOGRAPHY_STYLES.valueText.weight
            }}>
              📊 {filteredAndSortedOrders.length} orders
            </div>
            <button
              onClick={handleReportBug}
              style={{
                padding: `${LAYOUT_STYLES.gapMedium - 4}px ${LAYOUT_STYLES.gapLarge}px`, // 8px 16px
                background: UI_COLORS.primary,
                border: 'none',
                borderRadius: `${LAYOUT.borderRadius.sm}px`,
                color: 'white',
                fontSize: `${TYPOGRAPHY_STYLES.buttonText.size + 1}px`, // 13px
                fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                cursor: 'pointer',
                transition: `background-color ${UI_BEHAVIOR.animation.normal}ms`
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = UI_COLORS.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = UI_COLORS.primary}
            >
              🐛 Report Bug
            </button>
          </div>
        </div>
      </div>

      {/* Main table - refaktorovaný s konštantami */}
      <div style={{
        background: LAYOUT_STYLES.cardBackground,
        border: `1px solid ${LAYOUT_STYLES.borderColor}`,
        borderLeft: GRADIENTS.borderAccent,
        overflow: 'hidden'
      }}>
        {/* Sortable Header - refaktorovaný s konštantami */}
        <div style={{
          display: 'flex',
          background: GRADIENTS.headerGradient,
          color: 'white',
          fontWeight: TYPOGRAPHY_STYLES.tableHeader.weight,
          fontSize: `${TYPOGRAPHY_STYLES.tableHeader.size + 1}px`, // 13px
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
                padding: `${LAYOUT_STYLES.gapLarge}px ${LAYOUT_STYLES.itemSpacing}px`,
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
                <span style={{ marginLeft: `${LAYOUT_STYLES.gapSmall + 2}px`, fontSize: `${TYPOGRAPHY.fontSize.xs}px` }}>
                  {getSortIcon(col.field as SortField)}
                </span>
              )}
              {/* Resizable handle - refaktorovaný s konštantami */}
              {index < columnWidths.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    width: `${COLUMN_CONFIG.resizeHandleWidth}px`,
                    cursor: 'col-resize',
                    background: 'rgba(255,255,255,0.2)'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Rows - refaktorovaný s konštantami */}
        {filteredAndSortedOrders.map((order, index) => (
          <div key={order.id}>
            {/* Main row */}
            <div
              onClick={() => toggleRow(order.id)}
              style={{
                display: 'flex',
                background: index % 2 === 0 ? LAYOUT_STYLES.cardBackground : UI_COLORS.alternateRow,
                borderTop: index > 0 ? `1px solid ${LAYOUT_STYLES.borderColor}` : 'none',
                cursor: 'pointer',
                transition: `background-color ${UI_BEHAVIOR.animation.normal}ms`,
                fontSize: `${TYPOGRAPHY_STYLES.bodyText.size}px`,
                minHeight: '54px',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = UI_COLORS.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? LAYOUT_STYLES.cardBackground : UI_COLORS.alternateRow;
              }}
            >
              <div style={{
                width: `${columnWidths[0]}px`,
                minWidth: `${columnWidths[0]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <span style={{
                  transform: expandedRows.has(order.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: `transform ${UI_BEHAVIOR.animation.normal}ms`,
                  fontSize: `${TYPOGRAPHY_STYLES.bodyText.size + 2}px`, // 16px
                  color: UI_COLORS.primary
                }}>
                  ▶
                </span>
              </div>
              <div style={{
                width: `${columnWidths[1]}px`,
                minWidth: `${columnWidths[1]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                fontFamily: 'monospace',
                fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                color: UI_COLORS.secondary
              }}>
                {order.orderNumber}
              </div>
              <div style={{
                width: `${columnWidths[2]}px`,
                minWidth: `${columnWidths[2]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                color: UI_COLORS.text
              }}>
                {order.customer}
              </div>
              <div style={{
                width: `${columnWidths[3]}px`,
                minWidth: `${columnWidths[3]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`
              }}>
                <span style={{
                  padding: `${LAYOUT_STYLES.gapSmall}px ${LAYOUT_STYLES.gapMedium - 4}px`, // 4px 8px
                  borderRadius: `${LAYOUT.borderRadius.sm - 1}px`, // 3px
                  fontSize: `${TYPOGRAPHY_STYLES.badgeText.size}px`,
                  fontWeight: TYPOGRAPHY_STYLES.badgeText.weight,
                  background: getPriorityColor(order.priority),
                  color: 'white'
                }}>
                  {order.priority}
                </span>
              </div>
              <div style={{
                width: `${columnWidths[4]}px`,
                minWidth: `${columnWidths[4]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`
              }}>
                <span style={{
                  padding: `${LAYOUT_STYLES.gapSmall}px ${LAYOUT_STYLES.gapMedium - 4}px`, // 4px 8px
                  borderRadius: `${LAYOUT.borderRadius.sm - 1}px`, // 3px
                  fontSize: `${TYPOGRAPHY_STYLES.badgeText.size}px`,
                  fontWeight: TYPOGRAPHY_STYLES.badgeText.weight,
                  background: getStatusColor(order.status),
                  color: 'white'
                }}>
                  {order.status}
                </span>
              </div>
              <div style={{
                width: `${columnWidths[5]}px`,
                minWidth: `${columnWidths[5]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                fontFamily: 'monospace',
                color: UI_COLORS.textMuted
              }}>
                {order.date}
              </div>
              <div style={{
                width: `${columnWidths[6]}px`,
                minWidth: `${columnWidths[6]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                textAlign: 'right',
                fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
                color: UI_COLORS.success
              }}>
                ${order.value.toLocaleString()}
              </div>
              <div style={{
                width: `${columnWidths[7]}px`,
                minWidth: `${columnWidths[7]}px`,
                padding: `0 ${LAYOUT_STYLES.itemSpacing}px`,
                textAlign: 'center',
                fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                color: UI_COLORS.text
              }}>
                {order.items}
              </div>
            </div>

            {/* Expanded details - refaktorovaný s konštantami */}
            {expandedRows.has(order.id) && (
              <div style={{
                background: UI_COLORS.detailBackground,
                border: `2px solid ${UI_COLORS.primary}`,
                borderTop: 'none',
                padding: `${LAYOUT_STYLES.filterPanelPadding}px`,
                fontSize: `${TYPOGRAPHY_STYLES.buttonText.size + 1}px` // 13px
              }}>
                <div style={{
                  marginBottom: `${LAYOUT_STYLES.gapLarge}px`,
                  fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
                  fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
                  color: UI_COLORS.primary
                }}>
                  📋 ORDER DETAILS: {order.description}
                </div>

                {order.details && (
                  <div style={{
                    background: LAYOUT_STYLES.cardBackground,
                    borderRadius: `${LAYOUT.borderRadius.sm}px`,
                    overflow: 'hidden',
                    border: `1px solid ${LAYOUT_STYLES.borderColor}`
                  }}>
                    {/* Detail header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '150px 80px 120px 1fr',
                      background: UI_COLORS.alternateRow,
                      padding: `${LAYOUT_STYLES.itemSpacing}px`,
                      fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
                      fontSize: `${TYPOGRAPHY_STYLES.badgeText.size}px`,
                      color: UI_COLORS.text,
                      borderBottom: `1px solid ${LAYOUT_STYLES.borderColor}`
                    }}>
                      <div>PART NUMBER</div>
                      <div style={{ textAlign: 'center' }}>QTY</div>
                      <div style={{ textAlign: 'right' }}>UNIT PRICE</div>
                      <div style={{ paddingLeft: `${LAYOUT_STYLES.gapLarge}px` }}>SPECIFICATIONS</div>
                    </div>

                    {/* Detail rows */}
                    {order.details.map((detail, idx) => (
                      <div key={idx} style={{
                        display: 'grid',
                        gridTemplateColumns: '150px 80px 120px 1fr',
                        padding: `${LAYOUT_STYLES.itemSpacing}px`,
                        background: idx % 2 === 0 ? LAYOUT_STYLES.cardBackground : UI_COLORS.alternateRow,
                        borderTop: idx > 0 ? `1px solid ${LAYOUT_STYLES.borderColor}` : 'none'
                      }}>
                        <div style={{
                          fontFamily: 'monospace',
                          fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                          color: UI_COLORS.secondary
                        }}>
                          {detail.partNumber}
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: TYPOGRAPHY_STYLES.buttonText.weight, color: UI_COLORS.text }}>
                          {detail.quantity}
                        </div>
                        <div style={{
                          textAlign: 'right',
                          fontWeight: TYPOGRAPHY_STYLES.buttonText.weight,
                          color: UI_COLORS.success
                        }}>
                          ${detail.unitPrice.toLocaleString()}
                        </div>
                        <div style={{
                          paddingLeft: `${LAYOUT_STYLES.gapLarge}px`,
                          color: UI_COLORS.textMuted
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

      {/* Status bar - refaktorovaný s konštantami */}
      <div style={{
        marginTop: `${LAYOUT_STYLES.cardMargin}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${LAYOUT_STYLES.gapLarge}px ${LAYOUT_STYLES.filterPanelPadding}px`,
        background: LAYOUT_STYLES.cardBackground,
        border: `1px solid ${LAYOUT_STYLES.borderColor}`,
        borderLeft: `6px solid ${UI_COLORS.success}`
      }}>
        <div style={{ display: 'flex', gap: `${LAYOUT_STYLES.filterPanelPadding}px`, alignItems: 'center' }}>
          <div style={{
            fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
            fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
            color: UI_COLORS.text
          }}>
            <strong>Orders:</strong> {filteredAndSortedOrders.length}
          </div>
          <div style={{
            fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
            fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
            color: UI_COLORS.text
          }}>
            <strong>Total Items:</strong> {totalItems.toLocaleString()}
          </div>
          <div style={{
            fontSize: `${TYPOGRAPHY_STYLES.headerSubtitle.size}px`,
            fontWeight: TYPOGRAPHY_STYLES.valueText.weight,
            color: UI_COLORS.success
          }}>
            <strong>Total Value:</strong> ${totalValue.toLocaleString()}
          </div>
        </div>

        <div style={{
          fontSize: `${TYPOGRAPHY_STYLES.badgeText.size}px`,
          color: UI_COLORS.textMuted,
          fontWeight: TYPOGRAPHY_STYLES.buttonText.weight
        }}>
          L-KERN Professional ERP v8 • Luhovy Industries Manufacturing Solutions
        </div>
      </div>
    </div>
  );
};

export default OrdersVariant8;