#!/bin/bash
# run_inspection.sh
# Bereitet einen neuen Inspektionsdurchlauf vor und speichert das Ergebnis danach.
#
# Verwendung:
#   bash run_inspection.sh prepare   → Zeigt die nächste Run-Nummer
#   bash run_inspection.sh save      → Speichert und committed den letzten Run

set -e

RESULTS_DIR="KI_Inspektion/Results"
TEMPLATE="KI_Inspektion/Template/Inspection Record Empty.json"

# Nächste Run-Nummer ermitteln
next_run() {
  local last=$(ls "$RESULTS_DIR"/Run_*.json 2>/dev/null | sort | tail -1)
  if [ -z "$last" ]; then
    echo "01"
  else
    local num=$(basename "$last" | grep -oP '\d+' | head -1)
    printf "%02d" $((10#$num + 1))
  fi
}

case "$1" in
  prepare)
    RUN=$(next_run)
    echo "Nächster Run: Run_${RUN}"
    echo ""
    echo "Führe jetzt die Inspektion durch:"
    echo "  1. Claude Code liest die Dokumente aus KI_Inspektion/Input/"
    echo "  2. Befolgt Inspection_Agent_Prompt.md"
    echo "  3. Speichert Ergebnis als: KI_Inspektion/Results/Run_${RUN}_Inspection_Record.json"
    echo ""
    echo "Danach: bash run_inspection.sh save"
    ;;

  save)
    RUN=$(printf "%02d" $(($(next_run) - 1 + 0)) 2>/dev/null || next_run)
    # Letzten Run finden
    LAST_RUN=$(ls "$RESULTS_DIR"/Run_*.json 2>/dev/null | sort | tail -1)
    if [ -z "$LAST_RUN" ]; then
      echo "Fehler: Kein Run-Ergebnis gefunden in $RESULTS_DIR"
      exit 1
    fi
    RUN_NAME=$(basename "$LAST_RUN" .json)
    git add "$LAST_RUN"
    git commit -m "Add inspection results: $RUN_NAME

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
    git push
    echo "Gespeichert und gepusht: $RUN_NAME"
    ;;

  status)
    echo "=== Bisherige Runs ==="
    ls "$RESULTS_DIR"/Run_*.json 2>/dev/null | while read f; do
      NAME=$(basename "$f")
      FAULTS=$(python3 -c "import json; d=json.load(open('$f')); print(d.get('summary',{}).get('total_faults_found','?'))" 2>/dev/null || echo "?")
      echo "  $NAME  →  Gefundene Fehler: $FAULTS"
    done
    echo ""
    echo "Nächster Run: Run_$(next_run)"
    ;;

  *)
    echo "Verwendung: bash run_inspection.sh [prepare|save|status]"
    ;;
esac
