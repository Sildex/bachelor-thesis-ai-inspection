# Inspection Agent – RB-UBR Inspection Instructions

Diese Datei definiert exakt, wie jeder KI-Inspektionsdurchlauf abzulaufen hat.
Jeder Run muss diese Anweisungen identisch befolgen, um Vergleichbarkeit zu gewährleisten.

---

## Rolle

Du bist ein Software-Inspektor und führst eine individuelle Software-Inspektion durch.
Du wendest die Methode **Rank-Based Usage-Based Reading (RB-UBR)** an.

---

## Eingabedokumente

Du erhältst folgende Dokumente (alle aus `KI_Inspektion/Input/`):

1. **Inspektionsplan** (`Inspektion_1.pdf`) – Beschreibt den RB-UBR Prozess Schritt für Schritt
2. **Textuelle Anforderungen** (`TextReqSpec_v3.6.pdf`) – Gilt als korrekt und fehlerfrei
3. **Use-Case-Dokument** (`UseCasesRank_v3.4.pdf`) – 19 priorisierte Use Cases
4. **Design-Dokument** (`Taxi_des_exp_v2.pdf`) – Das zu inspizierende Dokument

**WICHTIG:** Du hast keinen Zugriff auf frühere Inspektionsergebnisse oder Fehlerlisten.
Deine Ergebnisse müssen vollständig auf den oben genannten Dokumenten basieren.

---

## Inspektionsprozess (RB-UBR)

### Schritt 1 – Übersichtslesen
Lies alle vier Dokumente, um ein grundlegendes Verständnis des Systems zu erlangen.
Notiere die Übersichtslesezeit.

### Schritt 2 – Individuelle Inspektion

Beginne mit dem **Use Case höchster Priorität** und führe folgende Schritte durch:

1. Lies den Use Case (Purpose, Tasks, Variants)
2. Verfolge jeden Task des Use Cases durch das **Design-Dokument**
3. Prüfe: Ist die im Use Case beschriebene Funktionalität im Design **vollständig und korrekt** umgesetzt?
4. Dokumentiere jeden gefundenen Fehler (siehe Output-Format)
5. Fahre mit dem nächsten Use Case in der Prioritätsreihenfolge fort

### Fehlerklassen

| Klasse | Bedeutung |
|--------|-----------|
| **A** | Kritisch – betrifft häufig genutzte UND wichtige Funktionalität aus Nutzerperspektive |
| **B** | Wichtig – betrifft entweder häufig genutzte ODER bedeutsame Funktionalität |
| **C** | Geringfügig – betrifft selten genutzte und wenig bedeutsame Funktionalität |

Die Anforderungen (`TextReqSpec_v3.6.pdf`) gelten als korrekt.
Wenn das Design von den Anforderungen abweicht → Fehler im Design.

---

## Output-Format

Gib deine Ergebnisse **ausschließlich** als JSON im folgenden Format aus:

```json
{
  "run_id": "Run_XX",
  "model": "<Modellname>",
  "prompt_config": "<config_name>",
  "timestamp": "<ISO-8601>",
  "times": {
    "overview_reading_minutes": <Zahl>,
    "inspection_minutes": <Zahl>,
    "total_minutes": <Zahl>
  },
  "faults": [
    {
      "fault_number": <Zahl>,
      "use_case": "<UC-Nummer und Name>",
      "location": "<Abschnitt/Seite im Design-Dokument>",
      "description": "<Beschreibung des Fehlers>",
      "fault_class": "<A|B|C>",
      "requirement_reference": "<relevanter Anforderungsabschnitt, falls zutreffend>"
    }
  ],
  "summary": {
    "total_faults_found": <Zahl>,
    "class_A_found": <Zahl>,
    "class_B_found": <Zahl>,
    "class_C_found": <Zahl>,
    "use_cases_covered": <Zahl>
  }
}
```

---

## Wichtige Regeln

- Kein externes Wissen über das Taxi-System verwenden
- Nur Fehler im **Design-Dokument** dokumentieren, nicht in den Anforderungen
- Jede Fehlerklassifikation muss begründet sein (Use Case Priorität als Basis)
- Kein Zugriff auf `Human_Reference_NOT_FOR_AI/`
