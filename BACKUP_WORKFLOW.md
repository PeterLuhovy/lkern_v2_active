# 🔒 L-KERN Backup Workflow

## Automatický backup systém pre bezpečné úpravy kódu

### ⚡ Rýchly štart

```bash
# Pred úpravou súboru vytvor backup
./scripts/create_backup.sh ./path/to/your/file.tsx
```

### 📋 Implementované features

✅ **Automatický backup** pred každou úpravou
✅ **.backup/ adresáre** ignorované v git a docker
✅ **Timestamp názvy** súborov pre jednoznačnosť
✅ **Automatický cleanup** starých backupov (30 dní)
✅ **Cross-platform** podpora (Bash + PowerShell)
✅ **AI workflow integrácia** - pripravené na automatizáciu

### 📁 Štruktúra

```
component/
├── ModalTemplate.tsx          # Originál súbor
├── .backup/                   # Backup adresár (git ignored)
│   ├── ModalTemplate_20241225_143022.tsx
│   ├── ModalTemplate_20241224_091534.tsx
│   └── ModalTemplate_20241223_165211.tsx
└── index.ts
```

### 🔧 Použitie

**Bash/Linux/macOS:**
```bash
./scripts/create_backup.sh ./ui-web/src/components/Modal.tsx
```

**PowerShell/Windows:**
```powershell
.\scripts\create_backup.ps1 -FilePath .\ui-web\src\components\Modal.tsx
```

### 📖 Kompletná dokumentácia

Pozri: `./scripts/README.md` pre detailné informácie.

---

**Definované v:** `CLAUDE.md` → **BACKUP WORKFLOW - POVINNÝ PRE VŠETKY ÚPRAVY**