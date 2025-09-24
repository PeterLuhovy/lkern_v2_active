# 📚 L-KERN v2 - Kompletný Frontend Guide

**Verzia:** 1.0
**Dátum:** 2024-09-25
**Účel:** Úplný sprievodca React + TypeScript + Vite + Docker pre L-KERN v2

---

## 📖 Obsah

1. [Úvod - Prečo tieto technológie](#úvod)
2. [JavaScript vs TypeScript](#javascript-vs-typescript)
3. [React - Základy](#react-základy)
4. [Vite - Build Tool](#vite-build-tool)
5. [Štruktúra projektu](#štruktúra-projektu)
6. [Ako funguje náš Dashboard](#ako-funguje-náš-dashboard)
7. [Docker integrácia](#docker-integrácia)
8. [Development workflow](#development-workflow)
9. [Časté problémy a riešenia](#časté-problémy)
10. [Ďalšie kroky](#ďalšie-kroky)

---

## 🎯 Úvod

### Prečo tieto technológie?

**Frontend v roku 2024** = React + TypeScript + Vite

```
Staré časy (2010):        Moderné časy (2024):
┌─────────────────┐      ┌─────────────────┐
│ HTML            │ →    │ React           │
│ CSS             │      │ TypeScript      │
│ jQuery          │      │ Vite            │
│ PHP/ASP.NET     │      │ Docker          │
└─────────────────┘      └─────────────────┘

❌ Pomalé               ✅ Rýchle
❌ Chyby až v produkcii ✅ Chyby hneď pri písaní
❌ Kopírovanie kódu     ✅ Znovupoužiteľné komponenty
❌ Manuálne testing     ✅ Automatické validácie
```

### Čo budeme stavať

**L-KERN v2 Dashboard** - moderná webová aplikácia s:
- ⚡ Okamžitým načítaním (Vite)
- 🛡️ Bezpečnosťou typov (TypeScript)
- 🧩 Modulárnosťou (React komponenty)
- 🐳 Jednoduchou distribúciou (Docker)

---

## 💻 JavaScript vs TypeScript

### JavaScript - klasika
```javascript
// ❌ Problém: Chyby až pri spustení
function calculatePrice(product, quantity, discount) {
    return product.price * quantity - discount;
}

// Čo ak:
calculatePrice("invalid", "not-a-number", null); // 💥 NaN
calculatePrice({name: "Produkt"}); // 💥 undefined * undefined
calculatePrice(product, quantity); // 💥 Missing parameter
```

### TypeScript - s typmi
```typescript
// ✅ Riešenie: Chyby hneď pri písaní
interface Product {
    id: number;
    name: string;
    price: number;
}

function calculatePrice(
    product: Product,
    quantity: number,
    discount: number = 0
): number {
    return product.price * quantity - discount;
}

// IDE ti povie chybu HNEĎ:
calculatePrice("invalid", "not-a-number", null); // ❌ Type error!
calculatePrice({name: "Produkt"}); // ❌ Missing 'price' property!
```

### Výhody TypeScript

**1. Autocomplete (IntelliSense)**
```typescript
interface Customer {
    id: number;
    name: string;
    email: string;
    orders: Order[];
}

const customer: Customer = getCustomer();
customer. // <- IDE ti ukáže: id, name, email, orders
```

**2. Refactoring bez strachu**
```typescript
// Zmena názvu funkcie sa propaguje VŠADE
function getCustomerData() { /* ... */ }

// Rename → getAllCustomersData()
// IDE automaticky zmení všetky volania!
```

**3. Dokumentácia v kóde**
```typescript
interface DashboardModule {
    id: string;           // Unique identifier
    title: string;        // Display name
    description: string;  // Tooltip text
    icon: string;         // Emoji or icon name
    path: string;         // Route path
}
```

---

## ⚛️ React - Základy

### Čo je React komponet?

**Komponet = funkcia čo vracia HTML**

```typescript
// Najjednoduchší komponet
function Welcome() {
    return <h1>Ahoj svet!</h1>;
}

// Komponet s parametrami (props)
function Welcome(props: {name: string}) {
    return <h1>Ahoj {props.name}!</h1>;
}

// Moderná syntax
function Welcome({name}: {name: string}) {
    return <h1>Ahoj {name}!</h1>;
}
```

### JSX - HTML v JavaScripte

```typescript
// ❌ Bez React (klasický DOM):
function createButton() {
    const button = document.createElement('button');
    button.textContent = 'Klikni ma';
    button.addEventListener('click', handleClick);
    document.body.appendChild(button);
}

// ✅ S React (JSX):
function Button() {
    return <button onClick={handleClick}>Klikni ma</button>;
}
```

### State - stav komponentu

```typescript
import { useState } from 'react';

function Counter() {
    // useState = "pamätaj si hodnotu medzi rendermi"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Počet: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Pridaj 1
            </button>
        </div>
    );
}

// Čo sa deje:
// 1. Prvé spustenie: count = 0
// 2. Klik na button: setCount(1)
// 3. React automaticky prekreslí: count = 1
// 4. Klik na button: setCount(2)
// 5. React automaticky prekreslí: count = 2
```

### Props - posielanie dát medzi komponentami

```typescript
// Parent komponet
function Dashboard() {
    const modules = [
        {id: 'orders', title: 'Objednávky', icon: '📋'},
        {id: 'customers', title: 'Zákazníci', icon: '👥'}
    ];

    return (
        <div>
            {modules.map(module =>
                <ModuleCard
                    key={module.id}
                    title={module.title}
                    icon={module.icon}
                />
            )}
        </div>
    );
}

// Child komponet
function ModuleCard({title, icon}: {title: string, icon: string}) {
    return (
        <div>
            <span>{icon}</span>
            <h3>{title}</h3>
        </div>
    );
}
```

### Event handling

```typescript
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Zabráň refresh stránky
        console.log('Login:', email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Prihlásiť</button>
        </form>
    );
}
```

---

## ⚡ Vite - Build Tool

### Čo je build tool?

**Build tool** = program čo pripravuje tvoj kód pre prehliadač

```
Tvoj kód:                    Výsledok pre prehliadač:
┌─────────────────┐         ┌─────────────────┐
│ TypeScript      │  Vite   │ JavaScript      │
│ React JSX       │   →     │ HTML            │
│ Modern CSS      │         │ Optimized CSS   │
│ ES6 Modules     │         │ Bundle.js       │
└─────────────────┘         └─────────────────┘
```

### Vite vs staré nástroje

**Webpack (starý spôsob):**
```bash
npm start
# ⏳ Building... 45 seconds
# ⏳ Optimizing... 12 seconds
# ✅ Server ready on http://localhost:3000
# 💀 Total: ~60 seconds
```

**Vite (moderný spôsob):**
```bash
npm run dev
# ⚡ Pre-bundling dependencies...
# ✅ Server ready on http://localhost:3000
# 🚀 Total: ~2 seconds
```

### Ako Vite funguje

**Development mode:**
1. **ES modules** - načítava súbory jednotlivě (rýchle)
2. **esbuild** - super rýchly TypeScript compiler
3. **HMR** - Hot Module Replacement (bez refresh stránky)

**Production mode:**
1. **Rollup** - optimalizácia a bundle
2. **Tree shaking** - odstráni nepoužitý kód
3. **Minification** - zmenší veľkosť súborov

### HMR - Hot Module Replacement

```typescript
// Zmeníš toto:
function Dashboard() {
    return <h1>Starý názov</h1>;
}

// Na toto:
function Dashboard() {
    return <h1>Nový názov</h1>;
}

// Vite:
// 1. Detekuje zmenu súboru
// 2. Recompile iba tento komponent
// 3. Injektuje zmenu do prehliadača
// 4. Stránka sa aktualizuje BEZ refresh
// 5. State zostáva zachovaný!
```

---

## 📁 Štruktúra projektu

### Náš projekt rozloženie

```
ui-web/
├── package.json              # 📦 Dependencies a scripty
├── vite.config.ts           # ⚙️ Vite konfigurácia
├── tsconfig.json            # 🔷 TypeScript nastavenia
├── Dockerfile               # 🐳 Docker container setup
├── src/
│   ├── main.tsx            # 🚀 Entry point - tu sa všetko začína
│   ├── App.tsx             # 🏠 Main app component
│   ├── index.css           # 🎨 Global styles
│   └── pages/
│       └── Dashboard.tsx   # 📋 Dashboard stránka
└── public/
    └── index.html          # 📄 HTML template
```

### package.json - receptúra projektu

```json
{
  "name": "lkern-v2-web",
  "scripts": {
    "dev": "vite",              // Spustí development server
    "build": "tsc && vite build", // Skompajluje pre produkciu
    "preview": "vite preview"   // Náhľad produkčnej verzie
  },
  "dependencies": {
    "react": "^18.2.0",         // React knižnica
    "react-dom": "^18.2.0",     // React DOM rendering
    "react-router-dom": "^6.16.0" // Navigácia medzi stránkami
  },
  "devDependencies": {
    "@types/react": "^18.2.15", // TypeScript typy pre React
    "typescript": "^5.0.2",     // TypeScript compiler
    "vite": "^4.4.5"           // Vite build tool
  }
}
```

### vite.config.ts - Vite nastavenia

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],        // Povoľ React JSX
  server: {
    port: 3000,             // Development server port
    host: true              // Povoľ external connections (Docker)
  },
  build: {
    outDir: 'dist'          // Kam uložiť produkčné súbory
  }
})
```

### tsconfig.json - TypeScript pravidlá

```json
{
  "compilerOptions": {
    "target": "ES2020",           // Verzia JavaScript výstupu
    "lib": ["ES2020", "DOM"],     // Dostupné API (DOM pre browser)
    "module": "ESNext",           // Module system
    "jsx": "react-jsx",           // JSX handling

    "strict": true,               // Prísne type checking
    "noUnusedLocals": true,      // Error pri nepoužitých premenných
    "noUnusedParameters": true   // Error pri nepoužitých parametroch
  },
  "include": ["src"]              // Ktoré súbory kontrolovať
}
```

---

## 🏠 Ako funguje náš Dashboard

### Celý flow krok za krokom

**1. Browser načíta stránku:**
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>L-KERN v2</title>
</head>
<body>
    <div id="root"></div>                    <!-- Prázdny kontajner -->
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**2. main.tsx - bootuje React:**
```typescript
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Nájdi div s id="root" a renderuj do neho <App />
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// React.StrictMode = development helper pre lepšie error handling
```

**3. App.tsx - nastaví routing:**
```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>                                 {/* Povoľ navigáciu */}
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />  {/* Hlavná stránka */}
          {/* Tu budú ďalšie stránky */}
        </Routes>
      </div>
    </Router>
  );
};
```

**4. Dashboard.tsx - hlavná logika:**
```typescript
// src/pages/Dashboard.tsx
import React from 'react';

interface DashboardModule {              // TypeScript interface
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const Dashboard: React.FC = () => {
  // Dáta pre moduly (neskôr z API)
  const modules: DashboardModule[] = [
    {
      id: 'orders',
      title: 'Objednávky',
      description: 'Správa objednávok a workflow',
      icon: '📋',
      path: '/orders'
    },
    // ... ďalšie moduly
  ];

  // Event handler pre klik
  const handleModuleClick = (module: DashboardModule) => {
    console.log(`Navigating to: ${module.path}`);
    // TODO: implementovať navigáciu
  };

  // JSX return - HTML-like syntax
  return (
    <div>
      <header>
        <h1>L-KERN v2</h1>
        <p>ERP Systém - Dashboard</p>
      </header>

      <main>
        <div>
          {modules.map((module) => (          // JavaScript v JSX
            <div
              key={module.id}                // React potrebuje unique key
              onClick={() => handleModuleClick(module)}
            >
              <div>{module.icon}</div>
              <div>
                <h3>{module.title}</h3>      {/* JavaScript expression */}
                <p>{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 L-KERN v2</p>
      </footer>
    </div>
  );
};

export default Dashboard;
```

### Čo sa deje pri spustení

```
1. Browser → GET http://localhost:3000
2. Vite server → pošle index.html
3. Browser → parsuje HTML, nájde <script src="/src/main.tsx">
4. Browser → GET /src/main.tsx
5. Vite → kompajluje TypeScript → JavaScript
6. Browser → vykonáva main.tsx:
   - Nájde div#root
   - Vytvorí React root
   - Renderuje <App />
7. React → vykonáva App.tsx:
   - Nastaví Router
   - Pre path="/" renderuje <Dashboard />
8. React → vykonáva Dashboard.tsx:
   - Vytvorí modules array
   - Renderuje JSX s modules.map()
9. Browser → zobrazí finálny HTML s modulmi
```

---

## 🐳 Docker integrácia

### Prečo Docker pre frontend?

**Problém:**
```
Developer A:                Developer B:
Node.js 16.5               Node.js 18.2
npm 8.1                    npm 9.3
Windows                    macOS
→ "Na mojom počítači to funguje!" 🤷‍♂️
```

**Riešenie - Docker:**
```
Všetci používajú:
┌─────────────────┐
│ Docker Container │
│ Node.js 18       │  ← Rovnaká verzia pre všetkých
│ npm 9.3          │  ← Rovnaké dependencies
│ Alpine Linux     │  ← Rovnaký OS
└─────────────────┘
→ "Funguje všade rovnako!" ✅
```

### Dockerfile vysvetlenie

```dockerfile
# Základ - minimálny Linux s Node.js
FROM node:18-alpine

# Pracovný priečinok v kontajneri
WORKDIR /app

# Skopíruj package súbory (cache layer)
COPY package*.json ./

# Nainštaluj dependencies (cache layer)
RUN npm install

# Skopíruj zvyšný kód
COPY . .

# Otvor port 3000
EXPOSE 3000

# Spusti development server
CMD ["npm", "run", "dev", "--", "--host"]
```

**Docker layers (cache optimization):**
```
Layer 1: node:18-alpine          [CACHED - nemení sa]
Layer 2: WORKDIR /app            [CACHED - nemení sa]
Layer 3: COPY package*.json      [CACHED - až kým nezmeníš dependencies]
Layer 4: RUN npm install         [CACHED - až kým nezmeníš dependencies]
Layer 5: COPY . .                [REBUILD - pri každej zmene kódu]
Layer 6: CMD ...                 [CACHED - nemení sa]
```

### docker-compose.yml vysvetlenie

```yaml
version: '3.8'

services:
  # Frontend service
  ui-web:
    build: ./ui-web              # Postav image z ./ui-web/Dockerfile
    ports:
      - "3000:3000"              # Host:Container port mapping
    volumes:                     # Live reload - sync súborov
      - ./ui-web/src:/app/src    # Lokálny src → Container src
      - /app/node_modules        # Anonymous volume pre node_modules
    environment:
      - NODE_ENV=development     # Environment variable
    depends_on:
      - backend                  # Počkaj kým sa backend nespustí
    networks:
      - lkern-network           # Vlastná sieť pre inter-service komunikáciu

  # Placeholder services pre budúcnosť
  backend:
    image: node:18-alpine
    command: sh -c "echo 'Backend placeholder' && sleep infinity"
    ports:
      - "8000:8000"
    networks:
      - lkern-network

  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lkern_v2
      POSTGRES_USER: lkern
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persistent data
    networks:
      - lkern-network

# Named volumes
volumes:
  postgres_data:

# Custom networks
networks:
  lkern-network:
    driver: bridge
```

### Volume mapping pre live reload

```yaml
volumes:
  - ./ui-web/src:/app/src        # Source kód
  - ./ui-web/public:/app/public  # Static files
  - /app/node_modules            # Exclude node_modules z sync
```

**Čo sa deje:**
1. **Zmeníš súbor** v `./ui-web/src/Dashboard.tsx`
2. **Docker volume** sync súbor do `/app/src/Dashboard.tsx` v kontajneri
3. **Vite HMR** detekuje zmenu
4. **TypeScript** recompile
5. **Browser** automatický refresh
6. **Vidíš zmenu** bez restart kontajnera!

---

## 🔄 Development workflow

### Štandardný deň developera

**1. Ráno - spusti stack:**
```bash
cd lkern_codebase_v2_active
docker-compose up --build ui-web
```

**2. Vývoj - edit → save → see:**
```typescript
// Edituj súbor
// src/pages/Dashboard.tsx
const modules = [
  {
    title: 'Objednávky',  // ← Zmeníš na 'Nové objednávky'
    // ...
  }
];

// Ctrl+S → save
// Browser automaticky refresh
// Vidíš zmenu okamžite!
```

**3. Testing - otvori browser tools:**
```
F12 → Console
Vidíš všetky console.log() z kódu
Sleduj errors a warnings
```

**4. Večer - vypni stack:**
```bash
Ctrl+C  # Zastaví docker-compose
```

### Debugging workflow

**Console logging:**
```typescript
function Dashboard() {
  const modules = getModules();

  console.log('Dashboard modules:', modules);          // Debug info
  console.warn('TODO: Implement navigation');         // Warning
  console.error('API call failed:', error);           // Error

  return <div>...</div>;
}
```

**React Developer Tools:**
```
1. Install: React Developer Tools (Chrome extension)
2. F12 → Components tab
3. Vidíš React component tree
4. Môžeš editovať props a state live!
```

**TypeScript errors:**
```typescript
// IDE (VS Code) ti ukáže chyby červeno:
const module: DashboardModule = {
  id: 'test',
  title: 'Test',
  // ❌ Missing 'description', 'icon', 'path' properties
};

// Hover nad error → detailné vysvetlenie
// Ctrl+. → Quick fix suggestions
```

### Hot reload v praxi

**Scenario: Pridáš nový modul**

```typescript
// PRED:
const modules = [
  {id: 'orders', title: 'Objednávky', /*...*/}
];

// PO:
const modules = [
  {id: 'orders', title: 'Objednávky', /*...*/},
  {id: 'reports', title: 'Reporty', icon: '📊', /*...*/}  // ← NOVÝ
];
```

**Čo sa stane:**
```
1. Save súbor (Ctrl+S)
2. Vite detects change
3. TypeScript compile (200ms)
4. HMR inject to browser (50ms)
5. React re-render Dashboard (10ms)
6. Vidíš nový modul (Total: ~260ms)
```

**Bez hot reload (starý spôsob):**
```
1. Save súbor
2. Manuálny refresh (F5)
3. Browser reload entire app (2-5s)
4. Stratíš všetok state
5. Musíš sa znova dostať na rovnaké miesto
```

---

## 🚨 Časté problémy a riešenia

### TypeScript errors

**Problem: "Property does not exist"**
```typescript
// ❌ Error
const user = getUser();
console.log(user.name); // Property 'name' does not exist

// ✅ Riešenie - definuj interface
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = getUser();
console.log(user.name); // OK
```

**Problem: "Object is possibly undefined"**
```typescript
// ❌ Error
const element = document.getElementById('root');
element.innerHTML = 'test'; // Object is possibly 'undefined'

// ✅ Riešenie - null check
const element = document.getElementById('root');
if (element) {
  element.innerHTML = 'test';
}

// ✅ Alebo assertion
const element = document.getElementById('root')!; // ! = "trust me, not null"
```

### React errors

**Problem: "Each child should have unique key"**
```typescript
// ❌ Error
{modules.map(module => (
  <div>{module.title}</div>  // Missing key
))}

// ✅ Riešenie
{modules.map(module => (
  <div key={module.id}>{module.title}</div>
))}
```

**Problem: State nie je reactive**
```typescript
// ❌ Nesprávne - mutuje state priamo
const [modules, setModules] = useState([]);
modules.push(newModule); // Nedeje sa nič

// ✅ Správne - nový array
const [modules, setModules] = useState([]);
setModules([...modules, newModule]); // Re-render
```

### Vite/Docker errors

**Problem: "EADDRINUSE port 3000"**
```bash
# Riešenie - zastaví existujúci server
docker-compose down
docker-compose up ui-web
```

**Problem: "Module not found"**
```typescript
// ❌ Nesprávne path
import Dashboard from './Dashboard'; // Missing .tsx

// ✅ Správne path
import Dashboard from './Dashboard.tsx';
import Dashboard from './pages/Dashboard'; // OK ak je v pages/
```

**Problem: Hot reload nefunguje**
```yaml
# docker-compose.yml - over volume mapping
volumes:
  - ./ui-web/src:/app/src     # ✅ Správne
  - ./ui-web/src/:/app/src/   # ❌ Extra slash
```

---

## 🚀 Ďalšie kroky

### Čo budeme pridávať

**1. Routing - navigácia medzi stránkami**
```typescript
// React Router rozšírenie
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/customers" element={<CustomersPage />} />
</Routes>
```

**2. State management - globálny state**
```typescript
// Context API alebo Zustand
const [user, setUser] = useGlobalState();
const [orders, setOrders] = useGlobalState();
```

**3. API komunikácia - backend volania**
```typescript
// Fetch API alebo axios
const orders = await fetch('/api/orders').then(r => r.json());
setOrders(orders);
```

**4. Forms - formuláre s validáciou**
```typescript
// React Hook Form + Zod validation
const {register, handleSubmit, errors} = useForm();
```

**5. Styling - CSS knižnice**
```typescript
// Tailwind CSS, Material-UI, alebo Styled Components
import { Button } from '@mui/material';
```

### Learning path

**Týždeň 1-2: Základy**
- ✅ React komponenty a JSX
- ✅ TypeScript interfaces
- ✅ Props a state
- ✅ Event handling

**Týždeň 3-4: Pokročilé**
- 🎯 React hooks (useEffect, useCallback, useMemo)
- 🎯 Custom hooks
- 🎯 Context API
- 🎯 Error boundaries

**Týždeň 5-6: Ekosystém**
- 🎯 React Router (navigácia)
- 🎯 API calls (axios/fetch)
- 🎯 Form handling
- 🎯 Testing (Jest, React Testing Library)

**Týždeň 7-8: Production**
- 🎯 Performance optimization
- 🎯 Bundle analysis
- 🎯 PWA features
- 🎯 Deployment

---

## 🎓 Zhrnutie

### Čo sme sa naučili

**Technológie:**
- ✅ **React** - komponenty, JSX, props, state
- ✅ **TypeScript** - typy, interfaces, type safety
- ✅ **Vite** - build tool, HMR, development server
- ✅ **Docker** - kontajnery, volume mapping, compose

**Praktické znalosti:**
- ✅ Ako vytvoriť React komponent
- ✅ Ako definovať TypeScript interface
- ✅ Ako nastaviť Vite projekt
- ✅ Ako používať Docker pre development

**Náš Dashboard:**
- ✅ Fungujúca React aplikácia
- ✅ TypeScript type safety
- ✅ Vite hot reload
- ✅ Docker containerized
- ✅ Pripravený na rozšírenie

### Čo ďalej

**1. Prejdi si tento guide**
**2. Spusti Dashboard: `docker-compose up ui-web`**
**3. Experimentuj - zmeň kód a sleduj zmeny**
**4. Pýtaj sa na čokoľvek čo nerozumieš!**

---

**Happy coding! 🚀**

*L-KERN v2 Frontend Guide - Peter Luhový, 2024*