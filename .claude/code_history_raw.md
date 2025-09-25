# Code History Raw - L-KERN System

### [2025-01-27 17:45] - Dark Theme Text Fixes & UI Layout Improvements
**Súbory zmenené:**
- ui-web/src/design-variants/OrdersVariant2.tsx - kompletné dark theme farby fixes + layout repositioning

**Dark theme color fixes:**
- Service names: #333 → currentTheme.text
- Response times: #999 → currentTheme.textMuted
- Database info: #333/#666 → theme-aware colors
- Footer stats: hardcoded čierne čísla → currentTheme.text
- Backup status messages: #333 → currentTheme.text

**Search bar visibility:**
- inputBackground: #333333 → #4a4a4a (svetlejšia šedá)
- inputBorder: #404040 → #666666 (kontrastnejší border)

**Layout improvements:**
- New Order button: presunutý z floating do filter panelu pravý dolný roh
- Position: absolute bottom-right positioning
- Element order: Orders count → Items per page → New Order (zľava doprava)
- Typography: "Vedúci výroby" font size 12px → 13px

**TypeScript fixes:**
- Removed unused ServiceStatus interface
- Fixed Set<unknown> → Set<string> type annotations
- Removed unused index parameter

**Status:** ✅ Kompletné UI fixes, všetky texty čitateľné v oboch témach, professional layout
---
