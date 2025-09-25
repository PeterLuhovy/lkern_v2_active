#!/bin/bash
# ================================================================
# SÚBOR: create_backup.sh
# CESTA: /scripts/create_backup.sh
# POPIS: Manuálny backup script pre L-KERN súbory pred úpravami
# VERZIA: v1.0.0
# UPRAVENÉ: 2024-09-25 23:59:00
# ================================================================

# Farby pre výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funkcia pre výpis s farbou
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Funkcia pre vytvorenie backup
create_backup() {
    local file_path="$1"

    # Kontrola či súbor existuje
    if [ ! -f "$file_path" ]; then
        log_error "Súbor neexistuje: $file_path"
        return 1
    fi

    # Získanie adresára súboru
    local file_dir=$(dirname "$file_path")
    local file_name=$(basename "$file_path")
    local file_extension="${file_name##*.}"
    local file_base="${file_name%.*}"

    # Vytvorenie .backup adresára
    local backup_dir="$file_dir/.backup"
    mkdir -p "$backup_dir"

    # Generovanie timestamp
    local timestamp=$(date +"%Y%m%d_%H%M%S")

    # Názov backup súboru
    local backup_filename="${file_base}_${timestamp}.${file_extension}"
    local backup_path="$backup_dir/$backup_filename"

    # Kopírovanie súboru
    if cp "$file_path" "$backup_path"; then
        log_success "Backup vytvorený: $backup_path"
        return 0
    else
        log_error "Zlyhalo vytvorenie backup: $backup_path"
        return 1
    fi
}

# Funkcia pre cleanup starých backup súborov
cleanup_old_backups() {
    local dir_path="$1"
    local days=${2:-30} # Default 30 dní

    log_info "Čistenie backup súborov starších ako $days dní v: $dir_path"

    if [ -d "$dir_path/.backup" ]; then
        local deleted_count=$(find "$dir_path/.backup" -name "*" -type f -mtime +$days -delete -print | wc -l)
        if [ "$deleted_count" -gt 0 ]; then
            log_success "Vymazaných $deleted_count starých backup súborov"
        else
            log_info "Žiadne staré backup súbory na vymazanie"
        fi
    else
        log_warning "Backup adresár neexistuje: $dir_path/.backup"
    fi
}

# Hlavná funkcia
main() {
    log_info "=== L-KERN Backup Script v1.0.0 ==="

    # Kontrola argumentov
    if [ $# -eq 0 ]; then
        log_error "Použitie: $0 <súbor_path> [cleanup_days]"
        log_info "Príklad: $0 ./ui-web/src/components/ModalTemplate.tsx"
        log_info "Príklad: $0 ./ui-web/src/components/ModalTemplate.tsx 7"
        exit 1
    fi

    local file_path="$1"
    local cleanup_days="${2:-30}"

    # Vytvorenie backup
    create_backup "$file_path"
    local backup_result=$?

    # Cleanup starých súborov
    local file_dir=$(dirname "$file_path")
    cleanup_old_backups "$file_dir" "$cleanup_days"

    # Zobrazenie výsledku
    if [ $backup_result -eq 0 ]; then
        log_success "Backup workflow dokončený úspešne!"
        log_info "Teraz môžete bezpečně upravovať súbor: $file_path"
    else
        log_error "Backup workflow zlyhal!"
        exit 1
    fi
}

# Spustenie hlavnej funkcie
main "$@"