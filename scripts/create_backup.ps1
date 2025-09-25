# ================================================================
# SÚBOR: create_backup.ps1
# CESTA: /scripts/create_backup.ps1
# POPIS: PowerShell backup script pre L-KERN súbory pred úpravami
# VERZIA: v1.0.0
# UPRAVENÉ: 2024-09-25 23:59:00
# ================================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$FilePath,

    [Parameter(Mandatory=$false)]
    [int]$CleanupDays = 30
)

# Farby pre výstup
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Funkcia pre vytvorenie backup
function Create-Backup {
    param([string]$FileToBackup)

    # Kontrola či súbor existuje
    if (-not (Test-Path $FileToBackup)) {
        Write-Error "Súbor neexistuje: $FileToBackup"
        return $false
    }

    # Získanie informácií o súbore
    $fileInfo = Get-Item $FileToBackup
    $fileDir = $fileInfo.DirectoryName
    $fileName = $fileInfo.BaseName
    $fileExtension = $fileInfo.Extension

    # Vytvorenie .backup adresára
    $backupDir = Join-Path $fileDir ".backup"
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    }

    # Generovanie timestamp
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

    # Názov backup súboru
    $backupFileName = "${fileName}_${timestamp}${fileExtension}"
    $backupPath = Join-Path $backupDir $backupFileName

    # Kopírovanie súboru
    try {
        Copy-Item $FileToBackup $backupPath -Force
        Write-Success "Backup vytvorený: $backupPath"
        return $true
    }
    catch {
        Write-Error "Zlyhalo vytvorenie backup: $backupPath - $($_.Exception.Message)"
        return $false
    }
}

# Funkcia pre cleanup starých backup súborov
function Cleanup-OldBackups {
    param([string]$DirPath, [int]$Days)

    Write-Info "Čistenie backup súborov starších ako $Days dní v: $DirPath"

    $backupDir = Join-Path $DirPath ".backup"
    if (Test-Path $backupDir) {
        $cutoffDate = (Get-Date).AddDays(-$Days)
        $oldFiles = Get-ChildItem $backupDir -File | Where-Object { $_.LastWriteTime -lt $cutoffDate }

        if ($oldFiles.Count -gt 0) {
            $oldFiles | Remove-Item -Force
            Write-Success "Vymazaných $($oldFiles.Count) starých backup súborov"
        }
        else {
            Write-Info "Žiadne staré backup súbory na vymazanie"
        }
    }
    else {
        Write-Warning "Backup adresár neexistuje: $backupDir"
    }
}

# Hlavná funkcia
function Main {
    Write-Info "=== L-KERN Backup Script v1.0.0 (PowerShell) ==="

    # Kontrola argumentov
    if (-not $FilePath) {
        Write-Error "Použitie: .\create_backup.ps1 -FilePath <súbor_path> [-CleanupDays <dni>]"
        Write-Info "Príklad: .\create_backup.ps1 -FilePath .\ui-web\src\components\ModalTemplate.tsx"
        Write-Info "Príklad: .\create_backup.ps1 -FilePath .\ui-web\src\components\ModalTemplate.tsx -CleanupDays 7"
        exit 1
    }

    # Vytvorenie backup
    $backupResult = Create-Backup -FileToBackup $FilePath

    # Cleanup starých súborov
    $fileDir = Split-Path $FilePath -Parent
    Cleanup-OldBackups -DirPath $fileDir -Days $CleanupDays

    # Zobrazenie výsledku
    if ($backupResult) {
        Write-Success "Backup workflow dokončený úspešne!"
        Write-Info "Teraz môžete bezpečně upravovať súbor: $FilePath"
    }
    else {
        Write-Error "Backup workflow zlyhal!"
        exit 1
    }
}

# Spustenie hlavnej funkcie
Main