# Bachelorarbeit – Notizen & Entscheidungsprotokoll

Letzte Aktualisierung: April 2026  
Autor: Maik Bender (GitHub: Sildex)

---

## 1. Thema & Kontext

**Titel (vorläufig):** Vergleich von LLMs und menschlichen Inspektoren bei der
use-case-basierten Software-Inspektion (RB-UBR)

**Betreuer/Prof:** Kai Petersen (Blekinge Institute of Technology)  
**Referenzpaper:** Petersen, K., Rönkkö, K., & Wohlin, C. (2008). *The Impact of Time
Controlled Reading on Software Inspection Effectiveness and Efficiency.* ESEM'08.

**Kernidee:** Dieselbe Inspektion, die Petersens Studenten 2008 manuell durchgeführt haben,
wird nun von LLMs wiederholt. KI-Ergebnisse werden direkt mit den menschlichen Ergebnissen
verglichen.

---

## 2. Aufbau der Arbeit (Struktur-Entscheidungen)

### Einleitung
- **Erster Absatz:** Überblick über das Themenfeld und die Methoden
  (Software Engineering, Software-Inspektion, Reading Techniques, LLMs)
- **Zweiter Absatz:** Problem und Relevanz – warum ist der Vergleich von KI und Mensch
  bei Software-Inspektionen relevant?

### Research Design
- Das Research Design **wird vollständig in die Arbeit aufgenommen** (als eigenes Kapitel)
- Datei: `Documentation/Research_Design_v2.md`

### Experimente & Ergebnisse
- **Mehrere Durchläufe pro KI-Modell** durchführen, dann plotten
- **Zum Schluss alle Ergebnisse zusammenführen** und vergleichen
- Darauf aufbauend: **Wie kann KI durch Änderung der Eingabeparameter verbessert werden?**
- Keine schrittweise Diskussion nach jedem Experiment – erst alle aufzählen, am Ende
  Vergleichstabelle

### Discussion
- Interpretation der Ergebnisse: Warum ist Modell X besser als Modell Y?
- Was folgt für die Forschung?
- Was bedeutet das für Forscher und Praktiker im Software Engineering?

### Conclusion
- Kurze Zusammenfassung
- **Jede Forschungsfrage einzeln beantworten**

---

## 3. LLM-Auswahl

- **Vergleich verschiedener moderner LLMs** (nicht alt vs. neu)
- Fokus auf **Claude AI** (Anthropic) als primäres Modell
- Ggf. weitere aktuelle Modelle zum Vergleich

---

## 4. Experimentalpaket

**Verwendet wird ausschließlich das Taxi-Managementsystem** (von Lund University).
- Für andere Systeme gibt es keine ausgefüllten Fehlerlisten → kein Vergleich möglich

### Dokumente
| Datei | Inhalt |
|-------|--------|
| `Input/Taxi_des_exp_v2.pdf` | Design-Dokument (2300 Wörter, 9 Seiten, 38 Fehler) |
| `Input/TextReqSpec_v3.6.pdf` | Textuelle Anforderungen (gilt als korrekt) |
| `Input/UseCasesRank_v3.4.pdf` | 19 Use Cases, priorisiert (RB-UBR) |
| `Input/Inspektion_1.pdf` | Inspektionsplan / Guideline |
| `Template/Inspection Record Empty.json` | Leeres Formular für jeden KI-Durchlauf |
| `Human_Reference_NOT_FOR_AI/Inspection Record Original.json` | Menschliche Ergebnisse (Petersen 2008) |

### Datenbezogene Entscheidungen
- **Zeile 42 (Excel) – nicht vorhandene Fehler:** Alle berücksichtigen
- **Session- und Clocktime-Spalten** wurden aus dem Inspection Record entfernt → OK
- Die Excel-Datei (`Faults_List_In_ver6.xls`) ist **Teil des Experimentalpakets** von
  Petersen et al. (2008) – Zitierung entsprechend

---

## 5. Quellenangaben

**Problem:** Wenige eigene Quellen bisher.

**Lösung für Experimentaldaten:**
- Excel/Fehlerlisten als "Teil des Experimentalpakets" zitieren:
  *„Experimental package originally developed at Lund University,
  used in [Petersen et al. 2008, Thelin et al. 2001, 2003]"*

**Bekannte Quellen:**
- Petersen et al. (2008) – ESEM'08 → Hauptreferenz
- Thelin et al. (2001) – Usage-based reading, IST
- Thelin et al. (2003) – Experimental comparison UBR vs. CBR, IEEE TSE
- Wohlin et al. (2000) – Experimentation in Software Engineering (Methodik)
- Andersson et al. (2003) – ISESE (Experimentalpaket-Ursprung)

---

## 6. Formalia & Disclaimer

### Disclaimer (Reihenfolge am Anfang der Arbeit)
1. **Eigenständigkeitserklärung** der Hochschule (Standard)
2. **KI-Disclaimer:** KI wurde als Formulierungshilfe verwendet

### Erklärungstiefe (Einleitung/Grundlagen)
- Nicht nur UBR erklären, sondern **breiteres Software-Engineering-Umfeld**
- Kontext: statische Qualitätssicherung, Inspektionen allgemein, Reading Techniques,
  dann spezifisch UBR

---

## 7. Repository-Struktur

```
bachelor-thesis-ai-inspection/ (GitHub: Sildex, privat)
├── KI_Inspektion/
│   ├── Input/                        ← KI bekommt NUR diese Dateien
│   │   ├── Inspektion_1.pdf
│   │   ├── Taxi_des_exp_v2.pdf
│   │   ├── TextReqSpec_v3.6.pdf
│   │   └── UseCasesRank_v3.4.pdf
│   ├── Template/                     ← Immer leer lassen
│   │   └── Inspection Record Empty.json
│   ├── Results/                      ← Run_01, Run_02, ... pro KI-Durchlauf
│   └── Human_Reference_NOT_FOR_AI/   ← KI darf das NICHT sehen
│       └── Inspection Record Original.json
│   └── Reference_Papers/
│       └── Petersen_ESEM08.pdf
└── Documentation/
    ├── Research_Design_v1_original.pdf
    ├── Research_Design_v2.md         ← Aktuelles Research Design
    └── Thesis_Notes.md               ← Diese Datei
```

---

## 8. Offene Punkte / TODOs

- [ ] KI-Inspektionsagenten bauen (Workflow für automatische Runs)
- [ ] LLM-Auswahl finalisieren (welche Modelle konkret?)
- [ ] Prompt-Konfigurationen definieren (für RQ4 – Parametervariationen)
- [ ] README.md für GitHub-Repo erstellen
- [ ] Statistik-Skripte für Auswertung vorbereiten (Mann-Whitney, Chi-Quadrat)
- [ ] Vergleichstabelle (analog Petersen Tabelle 3 & 4) vorbereiten
