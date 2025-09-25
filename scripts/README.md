# L-KERN Scripts

Pomocné skripty pre L-KERN ERP systém.

## Backup Workflow

### 🔒 Automatický Backup Systém

L-KERN implementuje automatický backup workflow pre bezpečné úpravy kódu.

### Použitie

#### Manuálny backup:

**Bash (Linux/macOS/WSL):**
```bash
# Základné použitie
./scripts/create_backup.sh ./ui-web/src/components/ModalTemplate.tsx

# S custom cleanup (7 dní)
./scripts/create_backup.sh ./ui-web/src/components/ModalTemplate.tsx 7
```

**PowerShell (Windows):**
```powershell
# Základné použitie
.\scripts\create_backup.ps1 -FilePath .\ui-web\src\components\ModalTemplate.tsx

# S custom cleanup (7 dní)
.\scripts\create_backup.ps1 -FilePath .\ui-web\src\components\ModalTemplate.tsx -CleanupDays 7
```

#### Príklad výstupu:
```
[INFO] === L-KERN Backup Script v1.0.0 ===
[SUCCESS] Backup vytvorený: ./ui-web/src/components/.backup/ModalTemplate_20241225_143022.tsx
[INFO] Čistenie backup súborov starších ako 30 dní v: ./ui-web/src/components
[SUCCESS] Vymazaných 3 starých backup súborov
[SUCCESS] Backup workflow dokončený úspešne!
[INFO] Teraz môžete bezpečně upravovať súbor: ./ui-web/src/components/ModalTemplate.tsx
```

### 📁 Štruktúra backup súborov

```
component/
├── ModalTemplate.tsx          # Aktuálny súbor
├── .backup/                   # Backup adresár (ignored by git/docker)
│   ├── ModalTemplate_20241225_143022.tsx
│   ├── ModalTemplate_20241224_091534.tsx
│   └── ModalTemplate_20241223_165211.tsx
└── index.ts
```

### ⚙️ Automatizácia v AI Workflow

Pre AI asistentov je backup workflow automaticky integrovaný:

```typescript
// Pred každou Edit/Write operáciou
const backupResult = await createBackupBeforeEdit(filePath);
if (!backupResult.success) {
  throw new Error('Backup failed - aborting edit operation');
}
```

### 🧹 Cleanup pravidlá

- **Retention**: 30 dní (default)
- **Automatický cleanup**: Pri každom backup
- **Formát názvu**: `originalname_YYYYMMDD_HHMMSS.ext`
- **Ignore súbory**: `.backup/` pridané do `.gitignore` a `.dockerignore`

### 🔧 Rollback

```bash
# Rollback na najnovší backup
cp .backup/ModalTemplate_20241225_143022.tsx ModalTemplate.tsx

# Rollback na špecifický backup
cp .backup/ModalTemplate_20241224_091534.tsx ModalTemplate.tsx
```

### ✅ Výhody systému

- ✅ **Bezpečnosť**: Žiadne stratené zmeny
- ✅ **Automatizácia**: Zero-effort pre vývojárov
- ✅ **Clean git**: Backup súbory nie sú v git repository
- ✅ **Retention**: Automatické mazanie starých backupov
- ✅ **Fast rollback**: Jednoduchý návrat k predchádzajúcej verzii