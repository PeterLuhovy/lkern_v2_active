# L-KERN Testing Hub

Testovacia sekcia pre L-KERN ERP systém obsahujúca všetky vývojové a experimentálne komponenty.

## 📁 Štruktúra

### `/design-examples/`
Obsahuje 9 dizajnových variantov pre Orders stránku:
- `OrdersVariant1.tsx` - Minimalist Space-Tech (tmavý futuristický)
- `OrdersVariant2.tsx` - Medical Industrial (čistý medicínsky)
- `OrdersVariant3.tsx` - Military Grade (robustný vojenský)
- `OrdersVariant4.tsx` - Nuclear Energy (bezpečnostný jadrovka)
- `OrdersVariant5.tsx` - Corporate Premium (luxusný korporátny)
- `OrdersVariant6.tsx` - L-KERN Professional (technický brand)
- `OrdersVariant7.tsx` - Dark Professional Pro (tmavý advanced)
- `OrdersVariant8.tsx` - Perfect Fusion (funkcionalita + dizajn)
- `OrdersVariant9.tsx` - L-KERN + StatusBar + Report (kompletný)

### `/customer-inquiries/`
Testovanie modalov pre spracovanie dopytov zákazníkov:
- `TestCustomerInquiries.tsx` - Testovacia stránka s modal
- `CustomerInquiryModal.tsx` - Hlavný modal komponent

## 🎯 Účel

1. **Dizajnové testovanie** - Rôzne vizuálne štýly pre rôzne odvetvia
2. **Funkcionálne testovanie** - Nové modaly a komponenty
3. **Experimentovanie** - Miesto pre nové nápady pred nasadením do produkcie

## 🚀 Prístup

Všetky testing komponenty sú dostupné cez hlavný App.tsx dashboard ako testing varianty.

## 📋 Konvencie

- Každý súbor má štandardný header s cestou a popisom
- Komponenty používajú konzistentný L-KERN styling
- Testovanie je oddelené od produkčného kódu