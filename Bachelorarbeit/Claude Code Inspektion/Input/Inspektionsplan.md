# Inspection Plan – RB-UBR

**Maik Bender**  
April 2026

---

## 1 Ziel der Inspektion

Ziel ist die systematische Identifikation von Fehlern im Software Top Level Design Document
anhand der priorisierten Use Cases.

Die Use Cases sind der alleinige Treiber der Inspektion. Inkonsistenzen zwischen Use Cases
und dem Design-Dokument werden als Fehler im Design interpretiert.

---

## 2 Inspektionsartefakte

| Dokument | Datei | Rolle |
|----------|-------|-------|
| Use Cases (rank-based) | `UseCasesRank_v3.4.md` | Inspektionstreiber |
| Software Top Level Design Document | `Taxi_des_exp_v2.md` | Inspektionsobjekt |
| Textual Requirements Specification | `TextReqSpec_v3.6.md` | Hintergrundlektüre |

---

## 3 Inspektionsprozess (RB-UBR)

Die Inspektion folgt der Methode **Rank-Based Usage-Based Reading (RB-UBR)**:
Die Use Cases werden in priorisierter Reihenfolge (höchste Priorität zuerst) als
Führungsinstrument genutzt, um das Design-Dokument systematisch auf Fehler zu prüfen.

### Phase 1 – Dokumente lesen

Lies Use Cases und Design-Dokument vollständig, um ein Systemverständnis aufzubauen:

- Systemzweck und Komponenten des Taxi-Managementsystems
- Kommunikation der Komponenten über Signale
- Struktur und Notation des Design-Dokuments (MSC-Diagramme)
- Priorisierung und Struktur der Use Cases

In dieser Phase erfolgt keine Fehlerdokumentation.

### Phase 2 – Use-Case-basierte Inspektion

Beginne mit dem Use Case der **höchsten Priorität** und führe für jeden Use Case
die folgenden Schritte durch:

1. Lies den Use Case vollständig (Purpose, Tasks, Variants)
2. Verfolge jeden Task durch das Design-Dokument
3. Prüfe für jeden Task:
   - Ist die geforderte Funktionalität im Design vorhanden? (Missing fault)
   - Ist sie korrekt modelliert? (Wrong fault)
   - Sind Signalflüsse, Parameter und Zustandsübergänge korrekt?
   - Sind Alternativfälle (Variants) im Design berücksichtigt?
4. Dokumentiere jeden gefundenen Fehler im Inspection Record
5. Fahre mit dem Use Case der nächsthöheren Priorität fort

Wiederhole Schritte 1–5 für alle 19 Use Cases.

---

## 4 Fehlerklassifikation

### Fehlerklasse (Risk)

| Klasse | Bezeichnung | Kriterium |
|--------|-------------|-----------|
| **A** | Crucial | Betrifft Funktionalität, die häufig genutzt wird UND wichtig ist |
| **B** | Important | Betrifft Funktionalität, die entweder häufig genutzt ODER wichtig ist |
| **C** | Minor | Betrifft Funktionalität, die selten genutzt wird und wenig bedeutsam ist |

Die Fehlerklasse richtet sich nach der Priorität des Use Cases, über den der Fehler
gefunden wurde: Use Cases hoher Priorität führen in der Regel zu A- oder B-Fehlern.

### Fehlertyp (Type of Fault)

| Typ | Bedeutung |
|-----|-----------|
| **M** | Missing – geforderte Funktionalität fehlt im Design |
| **W** | Wrong – Funktionalität ist vorhanden, aber fehlerhaft modelliert |

---

## 5 Inspection Record

Alle gefundenen Fehler werden im Inspection Record dokumentiert.
Das Formular: `Inspection Record Empty.json`

Jeder Eintrag enthält:

| Feld | Inhalt |
|------|--------|
| `fault_number` | Laufende Nummer des Fehlers |
| `use_case` | Use-Case-Nummer und Name |
| `location` | Abschnitt/Position im Design-Dokument |
| `fault_class` | A, B oder C |
| `fault_type` | M (Missing) oder W (Wrong) |
| `description` | Kurze Beschreibung des Fehlers |
| `use_case_reference` | UC-Nummer und Task, über den der Fehler gefunden wurde |
