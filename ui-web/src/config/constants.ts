/*
 * ================================================================
 * SÚBOR: constants.ts
 * CESTA: /ui-web/src/config/constants.ts
 * POPIS: Centrálne konštanty pre celý L-KERN ERP systém - design tokens a konfigurácia
 * VERZIA: v1.0.0
 * UPRAVENÉ: 2024-09-25 15:30:00
 * ================================================================
 */

// === CONSTANTS ===

// Spacing systém (všetky hodnoty v pixeloch)
// Prečo: Konzistentné rozostupy v celej aplikácii podľa 8px grid systému
// Kedy zmeniť: Pri major design system refactore alebo accessibility auditoch
export const SPACING = {
  // Base 8px grid systém
  xs: 4,      // 0.25rem - micro spacing pre tight layouts
  sm: 8,      // 0.5rem - malé rozostupy medzi súvisiacimi elementami
  md: 12,     // 0.75rem - štandardný gap v gridoch a formoch
  lg: 16,     // 1rem - sekčné rozostupy, margin-bottom
  xl: 20,     // 1.25rem - veľké rozostupy medzi sekciami
  xxl: 24,    // 1.5rem - hlavné rozostupy, modal padding
  xxxl: 32,   // 2rem - najväčšie rozostupy, page padding
  huge: 40    // 2.5rem - extra veľké rozostupy pre desktop layout
} as const;

// Brand farby a color system (hex kódy)
// Prečo: Centralizácia brand identity a konzistentné farby
// Kedy zmeniť: Pri rebrandingu, theme aktualizácii alebo accessibility zmenách
export const COLORS = {
  // Primary brand farby
  brand: {
    primary: '#9c27b0',      // Hlavná fialová brand farba - primárne tlačidlá
    secondary: '#3366cc',    // Modrá sekundárna farba - odkazy a akcenty
    accent: '#E91E63',       // Ružová accent farba - call-to-action elementy
    dark: '#5e1065',         // Tmavšia verzia primary pre hover stavy
    light: '#ce93d8'         // Svetlejšia verzia pre backgrounds a borders
  },

  // Status farby pre UI stavy
  status: {
    success: '#4CAF50',      // Zelená pre úspešné akcie a completed stavy
    warning: '#FF9800',      // Oranžová pre upozornenia a pending stavy
    error: '#f44336',        // Červená pre chyby a critical stavy
    info: '#2196F3',         // Modrá pre informácie a neutral stavy
    muted: '#9E9E9E'         // Sivá pre disabled a inactive elementy
  },

  // Priority level farby pre objednávky a úlohy
  priority: {
    nizka: '#9E9E9E',        // Sivá pre nízku prioritu
    normalna: '#2196F3',     // Modrá pre normálnu prioritu
    stredna: '#FF9800',      // Oranžová pre strednú prioritu
    rychla: '#FF5722',       // Červeno-oranžová pre rýchlu prioritu
    extra_rychla: '#f44336'  // Červená pre extra rýchlu prioritu - kritická
  },

  // Neutral farby pre text a pozadia
  neutral: {
    white: '#ffffff',        // Čisto biele pozadie
    gray50: '#fafafa',       // Najsvetlejšia sivá pre page backgrounds
    gray100: '#f5f5f5',      // Svetlá sivá pre card backgrounds
    gray200: '#eeeeee',      // Svetlá sivá pre borders a dividers
    gray300: '#e0e0e0',      // Stredne svetlá sivá pre inactive borders
    gray400: '#bdbdbd',      // Stredná sivá pre placeholder text
    gray500: '#9e9e9e',      // Stredná sivá pre secondary text
    gray600: '#757575',      // Tmavšia sivá pre primary text
    gray700: '#616161',      // Tmavá sivá pre headers
    gray800: '#424242',      // Veľmi tmavá sivá
    gray900: '#212121',      // Najtemnejšia sivá pre high contrast text
    black: '#000000'         // Čisto čierna farba
  }
} as const;

// Typography systém (font sizes, weights, line heights)
// Prečo: Konzistentná typografická hierarchia a čitateľnosť
// Kedy zmeniť: Pri accessibility auditoch alebo typography refactore
export const TYPOGRAPHY = {
  // Font sizes v pixeloch
  fontSize: {
    xs: 10,     // Extra malé - badges, timestamps
    sm: 12,     // Malé - helper text, captions
    md: 14,     // Štandardné - body text, inputs, labels
    lg: 16,     // Väčšie - headings, important text
    xl: 18,     // Extra veľké - section headings
    xxl: 24,    // H2 headings, modal titles
    xxxl: 32,   // H1 headings, page titles
    huge: 40    // Hero text, marketing headers
  },

  // Font weights
  fontWeight: {
    light: 300,     // Svetlý text pre väčšie sizes
    normal: 400,    // Normálny text pre body content
    medium: 500,    // Medium pre emphasis
    semibold: 600,  // Semi-bold pre headings a labels
    bold: 700,      // Bold pre dôležité headings
    extrabold: 800  // Extra bold pre hero text
  },

  // Line heights (unitless values)
  lineHeight: {
    tight: 1.25,    // Tight spacing pre headings
    normal: 1.5,    // Normálny line height pre body text
    relaxed: 1.75   // Relaxed spacing pre čitateľnosť
  }
} as const;

// Layout a responsive design konštanty
// Prečo: Konzistentné layout patterns a responsive breakpoints
// Kedy zmeniť: Pri responsive redesign alebo layout systém zmenách
export const LAYOUT = {
  // Border radius values v pixeloch
  borderRadius: {
    none: 0,        // Žiadne zaoblenie pre sharp design
    sm: 4,          // Malé zaoblenie pre buttons, inputs
    md: 6,          // Stredné zaoblenie pre cards
    lg: 8,          // Väčšie zaoblenie pre modals
    xl: 12,         // Extra veľké zaoblenie pre hero elements
    round: 50,      // Kruhové elementy - avatars, badges
    pill: 9999      // Pill shape - pill buttons, tags
  },

  // Z-index hierarchy pre layering
  zIndex: {
    hide: -1,           // Skryté elementy pod normálny flow
    base: 0,            // Base layer
    dropdown: 100,      // Dropdown menus
    sticky: 200,        // Sticky navigation
    modal: 1000,        // Modal dialogs
    popover: 1100,      // Popovers a tooltips
    notification: 9999  // Highest priority - error messages, alerts
  },

  // Container max widths pre responsive design
  maxWidth: {
    form: '600px',      // Optimálna šírka pre forms a modals
    content: '800px',   // Content areas, articles
    page: '1200px',     // Full page content
    wide: '1400px'      // Extra wide layouts pre dashboards
  },

  // Responsive breakpoints (mobile-first approach)
  breakpoint: {
    mobile: '480px',    // Small phones
    tablet: '768px',    // Tablets, large phones
    desktop: '1024px',  // Desktop, laptops
    wide: '1440px'      // Large desktops, monitors
  }
} as const;

// API a backend konfigurácia
// Prečo: Centralizácia API endpointov a timeout hodnôt
// Kedy zmeniť: Pri API verzia zmenách alebo performance optimalizácii
export const API_CONFIG = {
  // Base URLs pre mikroservices
  baseUrl: {
    orders: '/api/orders',          // lkm001 - Orders service
    customers: '/api/customers',    // lkm002 - Customers service
    parts: '/api/parts',            // lkm003 - Parts service
    packing: '/api/packing',        // lkm004 - Packing service
    delivery: '/api/delivery',      // lkm005 - Delivery service
    invoices: '/api/invoices'       // lkm006 - Invoices service
  },

  // Timeout hodnoty v milisekundách
  timeout: {
    short: 3000,        // 3s - rýchle operations (search, autocomplete)
    default: 5000,      // 5s - štandardné API calls
    long: 10000,        // 10s - upload, heavy operations
    upload: 30000       // 30s - file uploads, bulk operations
  },

  // Retry konfigurácia
  retry: {
    attempts: 3,        // Počet retry pokusov
    delay: 1000        // Delay medzi pokusmi (ms)
  }
} as const;

// UI/UX behavior konštanty
// Prečo: Konzistentné správanie UI komponentov a animácií
// Kedy zmeniť: Pri UX optimalizácii alebo accessibility zmenách
export const UI_BEHAVIOR = {
  // Animation durations v milisekundách
  animation: {
    fast: 150,      // Rýchle animations - hover efekty
    normal: 300,    // Normálne animations - transitions
    slow: 500,      // Pomalé animations - page transitions
    lazy: 1000      // Veľmi pomalé - emphasis animations
  },

  // Notification settings
  notification: {
    autoCloseDuration: 3000,    // 3s auto-close pre success messages
    errorDuration: 5000,        // 5s pre error messages (dlhšie)
    warningDuration: 4000       // 4s pre warning messages
  },

  // Debounce delays pre user input
  debounce: {
    search: 300,        // 300ms pre search input
    api: 500,           // 500ms pre API calls triggered by input
    resize: 100         // 100ms pre window resize handlers
  },

  // Pagination defaults
  pagination: {
    defaultSize: 50,    // Štandardný počet položiek na stránku
    maxSize: 200,       // Maximálny počet položiek
    sizeOptions: [25, 50, 100, 200] // Dostupné options pre page size
  }
} as const;

// Business logic konštanty špecifické pre L-KERN ERP
// Prečo: Centralizácia business rules a doménové konštanty
// Kedy zmeniť: Pri zmene business requirements alebo workflow
export const BUSINESS_RULES = {
  // Priority levels pre objednávky (må match s COLORS.priority)
  priorityLevels: ['nizka', 'normalna', 'stredna', 'rychla', 'extra_rychla'] as const,

  // File upload limits
  fileUpload: {
    maxSizeMB: 10,                          // 10MB maximálna veľkosť súboru
    allowedTypes: ['.pdf', '.jpg', '.png', '.doc', '.docx'], // Povolené typy súborov
    maxFiles: 5                             // Maximum súborov na upload
  },

  // Division codes pre L-KERN organizáciu
  divisions: {
    LCVV: '01',         // LCVV divízia kód
    LIND: '02',         // LIND divízia kód
    LRAG: '00'          // LRAG divízia kód (neaktívna)
  },

  // Order statuses
  orderStatuses: ['nova', 'v_procese', 'hotova', 'dorucena', 'fakturovana'] as const,

  // Part types
  partTypes: ['PRT', 'ASM'] as const,

  // Session management
  session: {
    timeoutMinutes: 120,    // 2 hodiny session timeout
    warningMinutes: 10      // 10 minút pred expiration warning
  }
} as const;

// Export grouped constants pre convenience imports
export const DESIGN_TOKENS = {
  SPACING,
  COLORS,
  TYPOGRAPHY,
  LAYOUT
} as const;

export const APP_CONFIG = {
  API_CONFIG,
  UI_BEHAVIOR,
  BUSINESS_RULES
} as const;

// Type exports pre TypeScript type safety
export type SpacingKey = keyof typeof SPACING;
export type ColorKey = keyof typeof COLORS;
export type TypographyKey = keyof typeof TYPOGRAPHY;
export type LayoutKey = keyof typeof LAYOUT;