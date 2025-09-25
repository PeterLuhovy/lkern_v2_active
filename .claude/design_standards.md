# L-KERN Design Standards
**VERZIA: v2.0.0 | UPRAVENÉ: 2025-01-29 00:10:00**

**Kompletný dizajn systém založený na analýze OrdersVariant2.tsx - Professional ERP Design System**

---

## 🎨 Typography System

### Font Families
```css
/* Primary System Font */
fontFamily: "'Segoe UI', sans-serif"

/* Apple System Font (StatusBar) */
fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

/* Monospace (Order numbers, codes) */
fontFamily: "monospace"
```

### Font Size Scale
```javascript
const FONT_SIZES = {
  xs: '9px',      // Small labels, micro text
  sm: '10px',     // Footer text, timestamps, service response times
  base: '11px',   // Action buttons, pagination text
  md: '12px',     // Status bar elements, table metadata
  lg: '13px',     // Filter labels, expanded content details
  xl: '14px',     // Main headers, filter section headers, icons
  '2xl': '16px',  // Search inputs, table expand elements
  '3xl': '20px',  // Report button icons
  '4xl': '28px'   // Main page titles
}
```

### Font Weight Scale
```javascript
const FONT_WEIGHTS = {
  normal: 400,    // Regular text (default)
  medium: 500,    // Service counts, status text, user position
  semibold: 600,  // Section headers, user names, priority text
  bold: 700,      // Main titles, filter headers
  heavy: 'bold'   // CSS bold for emphasis
}
```

### Text Patterns
- **Section Headers**: `uppercase` + `letterSpacing: '0.5px'` + `fontWeight: 700`
- **Column Headers**: `capitalize` transform
- **Line Heights**: `1` (compact), `1.4` (readable), `1.6` (relaxed)

---

## 🌈 Color System

### Brand Colors
```javascript
const BRAND_COLORS = {
  primary: '#9c27b0',      // L-KERN Primary Purple
  secondary: '#3366cc',    // L-KERN Secondary Blue
  accent: '#fd7e14',       // Orange accent (gradients)
  accentHover: '#e8590c'   // Orange hover state
}
```

### Theme Colors

#### Light Theme
```javascript
const LIGHT_THEME = {
  background: '#f2f3f7',
  cardBackground: '#ffffff',
  text: '#222222',
  textSecondary: '#495057',
  textMuted: '#666',
  border: '#dee2e6',
  headerBackground: '#d5d6dd',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  inputBackground: '#f2f3f7',
  inputBorder: '#dee2e6',
  hoverBackground: '#f8f9fa'
}
```

#### Dark Theme
```javascript
const DARK_THEME = {
  background: '#1a1a1a',
  cardBackground: '#2d2d2d',
  text: '#e0e0e0',
  textSecondary: '#b0b0b0',
  textMuted: '#888',
  border: '#404040',
  headerBackground: '#383838',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  inputBackground: '#4a4a4a',
  inputBorder: '#666666',
  hoverBackground: '#404040'
}
```

### Status Colors

#### Light Mode Status
```javascript
const STATUS_COLORS_LIGHT = {
  pending: '#ffc107',      // Yellow - waiting
  inProgress: '#f57c00',   // Orange - in production
  completed: '#ddb3e7',    // Light purple - finished
  unpaid: '#bbdefb',       // Light blue - invoiced unpaid
  paid: '#4caf50',         // Green - paid
  cancelled: '#e0e0e0',    // Light gray - cancelled
  complaint: '#f44336'     // Red - complaint
}
```

#### Dark Mode Status
```javascript
const STATUS_COLORS_DARK = {
  pending: '#ffc107',      // Yellow - waiting
  inProgress: '#ff9800',   // Bright orange - in production
  completed: '#ddb3e7',    // Light purple - finished
  unpaid: '#90caf9',       // Light blue - invoiced unpaid
  paid: '#66bb6a',         // Light green - paid
  cancelled: '#757575',    // Gray - cancelled
  complaint: '#e57373'     // Light red - complaint
}
```

### Priority Colors
```javascript
const PRIORITY_COLORS = {
  critical: '#d32f2f',     // Dark red
  high: '#f57c00',         // Orange
  normal: '#3366cc',       // Blue
  low: '#388e3c'           // Green
}
```

### Service Status Colors
```javascript
const SERVICE_COLORS = {
  healthy: '#4CAF50',      // Green
  unhealthy: '#FF9800',    // Orange
  down: '#F44336',         // Red
  default: '#757575'       // Gray
}
```

---

## 📏 Spacing System

### Spacing Scale
```javascript
const SPACING = {
  xs: '2px',      // Micro padding (icons, buttons)
  sm: '4px',      // Small padding, margins
  md: '6px',      // Small component padding
  lg: '8px',      // Standard small padding
  xl: '10px',     // Medium buttons, cards
  '2xl': '12px',  // Standard padding (table cells)
  '3xl': '16px',  // Large padding (panels, cards)
  '4xl': '18px',  // Button padding
  '5xl': '20px',  // Header sections, major padding
  '6xl': '48px'   // Very large gaps
}
```

### Gap Values (Flex/Grid)
- **Tight**: `4px` - Pagination buttons, action buttons
- **Small**: `6px` - Icons and text, user info
- **Standard**: `8px` - Service cards, standard gaps
- **Medium**: `12px` - Filter elements, expanded content grid
- **Large**: `16px` - Filter sections, footer stats
- **XL**: `20px` - Expanded content sections
- **XXL**: `48px` - Between major sections

---

## 🎯 Layout & Components

### Border Radius Scale
```javascript
const BORDER_RADIUS = {
  xs: '2px',      // Small elements (action buttons)
  sm: '3px',      // Icons and small badges
  md: '4px',      // Standard elements (inputs, buttons)
  lg: '6px',      // Medium elements (service cards)
  xl: '8px',      // Large elements (main cards, panels)
  '2xl': '10px',  // Toggle switches
  round: '50%'    // Circular elements
}
```

### Shadow System
```javascript
const SHADOWS = {
  // Light theme shadows
  light: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lightHover: '0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)',

  // Dark theme shadows
  dark: '0 4px 12px rgba(0, 0, 0, 0.3)',

  // Special shadows
  button: '0 2px 8px rgba(156, 39, 176, 0.3)',
  report: '0 4px 20px rgba(253, 126, 20, 0.4)',
  toggle: '0 1px 3px rgba(0,0,0,0.3)'
}
```

### Border Patterns
- **Standard**: `1px solid ${theme.border}`
- **Input Focus**: `2px solid ${accent.color}`
- **Left Accent**: `6px solid ${brand.primary}` (main cards)
- **Service Accent**: `3px solid ${service.color}` (service cards)
- **Expanded Accent**: `4px solid ${status.color}` (expanded rows)

---

## ⚡ Interactive Elements

### Transitions
```javascript
const TRANSITIONS = {
  fast: '0.2s ease',       // Quick interactions (hover, buttons)
  standard: '0.3s ease',   // Medium transitions (theme, toggles)
  slow: '0.5s ease',       // Progress animations

  // Specific transitions
  background: 'background-color 0.3s ease',
  transform: 'transform 0.2s ease',
  all: 'all 0.3s ease'
}
```

### Transform Effects
```javascript
const TRANSFORMS = {
  // Hover effects
  lift: 'translateY(-1px)',
  liftLarge: 'translateY(-3px) scale(1.02)',
  scale: 'scale(1.1)',
  scaleDown: 'scale(0.95)',

  // Rotation
  rotate90: 'rotate(90deg)',
  rotate180: 'rotate(180deg)'
}
```

### Cursor States
- **Interactive**: `cursor: 'pointer'` (buttons, clickable elements)
- **Resize**: `cursor: 'col-resize'` (column handles)
- **Disabled**: `cursor: 'not-allowed'` (disabled states)
- **Default**: `cursor: 'default'` (non-interactive)

---

## 🏗️ Component Patterns

### Card Components

#### Main Card Pattern
```javascript
const mainCardStyle = {
  background: theme.cardBackground,
  border: `1px solid ${theme.border}`,
  borderLeft: `6px solid ${BRAND_COLORS.primary}`,
  borderRadius: BORDER_RADIUS.xl,
  boxShadow: theme.shadow,
  padding: SPACING['5xl'],
  transition: TRANSITIONS.all
}
```

#### Service Card Pattern
```javascript
const serviceCardStyle = {
  background: theme.cardBackground,
  border: `1px solid ${theme.border}`,
  borderLeft: `3px solid ${serviceColor}`,
  borderRadius: BORDER_RADIUS.lg,
  padding: SPACING.xl,
  transition: TRANSITIONS.all
}
```

### Button Patterns

#### Primary Button
```javascript
const primaryButton = {
  background: BRAND_COLORS.primary,
  color: '#ffffff',
  border: 'none',
  borderRadius: BORDER_RADIUS.lg,
  padding: `${SPACING.lg} ${SPACING['3xl']}`,
  fontSize: FONT_SIZES.xl,
  fontWeight: FONT_WEIGHTS.semibold,
  cursor: 'pointer',
  transition: TRANSITIONS.fast,

  '&:hover': {
    transform: TRANSFORMS.lift,
    boxShadow: SHADOWS.button
  }
}
```

#### Action Button
```javascript
const actionButton = {
  background: 'transparent',
  border: `1px solid ${color}`,
  borderRadius: BORDER_RADIUS.xs,
  padding: `${SPACING.xs} ${SPACING.sm}`,
  fontSize: FONT_SIZES.base,
  fontWeight: FONT_WEIGHTS.semibold,
  cursor: 'pointer',
  transition: TRANSITIONS.fast
}
```

### Header Patterns

#### Page Header
```javascript
const pageHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: SPACING['5xl'],

  title: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    color: theme.text,
    margin: 0
  },

  subtitle: {
    fontSize: FONT_SIZES.xl,
    color: BRAND_COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
    marginTop: SPACING.sm
  }
}
```

#### Section Header
```javascript
const sectionHeader = {
  fontSize: FONT_SIZES.xl,
  fontWeight: FONT_WEIGHTS.bold,
  color: BRAND_COLORS.primary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: SPACING['2xl']
}
```

### Input Patterns

#### Search Input
```javascript
const searchInput = {
  width: '100%',
  padding: SPACING['3xl'],
  fontSize: FONT_SIZES['2xl'],
  border: `1px solid ${theme.inputBorder}`,
  borderRadius: BORDER_RADIUS.md,
  background: theme.inputBackground,
  color: theme.text,

  '&:focus': {
    border: `2px solid ${BRAND_COLORS.primary}`,
    outline: 'none'
  }
}
```

### Status Indicators

#### Status Badge
```javascript
const statusBadge = {
  display: 'inline-block',
  padding: `${SPACING.sm} ${SPACING.lg}`,
  fontSize: FONT_SIZES.sm,
  fontWeight: FONT_WEIGHTS.semibold,
  borderRadius: BORDER_RADIUS.sm,
  backgroundColor: statusColor,
  color: '#ffffff',
  textTransform: 'uppercase'
}
```

### Table Patterns

#### Table Row
```javascript
const tableRow = {
  borderBottom: `1px solid ${theme.border}`,
  transition: TRANSITIONS.all,

  '&:hover': {
    backgroundColor: theme.hoverBackground,
    transform: TRANSFORMS.liftLarge,
    boxShadow: SHADOWS.lightHover
  }
}
```

---

## 🔧 Implementation Guidelines

### Theme Implementation
1. **Always use theme-aware colors** - never hardcode colors
2. **Implement dark mode support** from the start
3. **Use consistent spacing scale** throughout components
4. **Apply standard transitions** to all interactive elements

### Component Development
1. **Follow card patterns** for consistent container styling
2. **Use standard button patterns** for all interactive elements
3. **Implement hover effects** with standard transforms and shadows
4. **Apply typography scale** consistently across text elements

### Layout Standards
1. **Use CSS Grid/Flexbox** with standard gap values
2. **Apply consistent border radius** based on component size
3. **Use accent borders** for visual hierarchy (6px left borders)
4. **Implement responsive spacing** with theme-aware values

### Color Usage
1. **Primary Purple** (`#9c27b0`) for main brand elements
2. **Secondary Blue** (`#3366cc`) for secondary actions and accents
3. **Status colors** must support both light and dark themes
4. **Service indicators** use semantic color coding
5. **Text colors** must meet accessibility contrast requirements

---

## 📱 Responsive Considerations

### Breakpoint System
```javascript
const BREAKPOINTS = {
  mobile: '320px - 767px',
  tablet: '768px - 1023px',
  desktop: '1024px+'
}
```

### Responsive Patterns
- **Padding adjustments**: Reduce padding on mobile devices
- **Font size scaling**: Maintain readability across devices
- **Layout changes**: Stack elements vertically on smaller screens
- **Touch targets**: Ensure minimum 44px touch targets on mobile

---

## ✅ Design Checklist

### Before implementing new components:
- [ ] Uses theme-aware colors (light/dark support)
- [ ] Follows typography scale and font weights
- [ ] Implements standard spacing system
- [ ] Uses consistent border radius patterns
- [ ] Includes hover/focus states with standard transitions
- [ ] Supports keyboard navigation
- [ ] Meets WCAG accessibility standards
- [ ] Responsive on all device sizes

### Component patterns to follow:
- [ ] Cards have left accent borders (6px brand colors)
- [ ] Buttons use standard patterns (primary/secondary/action)
- [ ] Status indicators use semantic color coding
- [ ] Interactive elements have hover effects
- [ ] Text follows hierarchy (headers, body, metadata)
- [ ] Spacing uses consistent scale values

---

**💡 Key Principle: "Every pixel should serve a purpose, and every color should tell a story."**

This design system ensures consistency, accessibility, and professional appearance across the entire L-KERN ERP application while maintaining the sophisticated business-grade aesthetic established in OrdersVariant2.tsx.