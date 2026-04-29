# Research Design

**Maik Bender**  
April 2026

---

## 1 Research Design

Diese Arbeit folgt einem quasi-experimentellen, vergleichenden Research Design zur Untersuchung
der Leistungsfähigkeit von Large Language Models (LLMs) bei der Durchführung use-case-basierter
Software-Inspektionen. Ziel ist es, die Effektivität eines LLMs im direkten Vergleich
mit menschlichen Inspektoren unter identischen Inspektionsbedingungen systematisch zu analysieren.
Als Referenzrahmen dienen das Experimentalpaket und die Ergebnisse von Petersen et al. (2008),
in dem 23 Master-Studierende dasselbe Artefakt unter Anwendung der Rank-Based Usage-Based
Reading (RB-UBR) Technik inspiziert haben.

---

### 1.1 Zielsetzung der Studie

Ziel der Studie ist es, zu untersuchen, inwieweit ein Large Language Model in der Lage ist, Fehler
in einem Software-Design-Dokument zu identifizieren, wenn es eine strukturierte Inspektionsmethode
nach dem RB-UBR-Ansatz anwendet. Die Inspektionsleistung des LLMs wird dabei direkt mit den
menschlichen Inspektionsergebnissen aus Petersen et al. (2008) verglichen. In einer zweiten Phase
wird untersucht, wie die Variation von Eingabeparametern (Prompt-Design, Detailgrad der
Instruktionen, bereitgestellte Dokumente, Effort-Level des Modells) die Leistung des LLMs beeinflusst.

---

### 1.2 Forschungsfragen

Die Untersuchung wird durch die folgenden Forschungsfragen geleitet:

- **RQ1:** Wie effektiv ist ein LLM im Vergleich zu menschlichen Inspektoren bei der
  Identifikation von Fehlern in einem Software-Design-Dokument unter Verwendung des
  RB-UBR-Ansatzes?

- **RQ2:** Unterscheidet sich die Fehlerklassenabdeckung (A-, B-, C-Fehler) eines LLMs
  von der menschlicher Inspektoren?

- **RQ3:** Wie beeinflusst die Variation von Eingabeparametern (z.B. Detailgrad der
  Instruktionen, Kontextinformation, Prompt-Struktur, Effort-Level des Modells) die
  Inspektionsleistung des LLMs? Kann insbesondere ein höherer Effort-Level (Extended Thinking)
  die Effektivität gegenüber den Baseline-Runs (Standard-Modus) steigern?

---

### 1.3 Untersuchungsobjekte

Das verwendete Experimentalpaket wurde an der Universität Lund entwickelt und in mehreren
kontrollierten Inspektionsexperimenten eingesetzt [Andersson et al. 2003, Thelin et al. 2001,
2003, Petersen et al. 2008]. Es umfasst ein **Taxi-Managementsystem** mit den folgenden
Artefakten:

#### Textuelle Anforderungen (`TextReqSpec_v3.6.md`)

Das Anforderungsdokument beschreibt die funktionalen Anforderungen des Taxi-Managementsystems
in natürlicher Sprache (Englisch). Es definiert das erwartete Systemverhalten aus
Nutzerperspektive und bildet die normative Grundlage für die Inspektion: Inkonsistenzen
zwischen Anforderungen und Design-Dokument werden als Fehler im Design gewertet. Das
Anforderungsdokument selbst wird als korrekt angenommen.

#### Design-Dokument (`Taxi_des_exp_v2.md`)

Das zu inspizierende Artefakt ist ein **Software-Design-Dokument** mit einem Umfang von
ca. 2.300 Wörtern auf 9 Seiten. Es gliedert sich in zwei Teile:

1. **Systemübersicht:** Beschreibung der Komponenten des Taxi-Managementsystems und deren
   Kommunikation über Signale (Signal-basierte Interaktion zwischen Dispatcher, Fahrer-Terminals
   und Zentrale).

2. **Zwei Szenarien in Message-Sequence-Chart (MSC) Notation:** Die Szenarien beschreiben
   konkrete Abläufe im System auf Komponentenebene. MSC ist eine standardisierte grafische
   Notation zur Darstellung von Interaktionssequenzen zwischen Systemkomponenten.

Das Dokument enthält insgesamt **38 Fehler**, eingeteilt in drei Klassen nach Nutzungshäufigkeit
und Wichtigkeit der betroffenen Funktionalität:

| Klasse | Anzahl | Charakterisierung |
|--------|--------|-------------------|
| A | 13 | Kritisch – betreffen häufig genutzte und wichtige Funktionalität |
| B | 14 | Wichtig – betreffen entweder häufig genutzte oder bedeutsame Funktionalität |
| C | 11 | Geringfügig – betreffen selten genutzte oder wenig bedeutsame Funktionalität |

Die Fehler sind identisch mit jenen aus den Vorläuferexperimenten und stellen reale Fehler
aus der Entwicklung des Systems dar.

#### Use-Case-Dokument (`UseCasesRank_v3.4.md`)

Das Use-Case-Dokument enthält **19 priorisierte Use Cases**. Das ursprüngliche Dokument
umfasste 24 Use Cases; die 5 Use Cases mit der niedrigsten Priorität wurden von den
Experimentatoren (Petersen et al. 2008) entfernt, um die Inspektion innerhalb des vorgesehenen
Zeitrahmens von zwei Stunden durchführbar zu machen. Die Use Cases sind in Task-Notation
formuliert (Purpose, Tasks, Variants) und dienen als primäres Führungsinstrument für den
RB-UBR-Inspektionsprozess: Der Inspektor prüft das Design-Dokument Use Case für Use Case,
beginnend mit dem höchstpriorisierten.

#### Inspection Record Form (`Inspection Record Empty.json`)

Das Inspection-Record-Formular ist Bestandteil des originalen Experimentalpakets von
Petersen et al. (2008). In diesem Formular dokumentiert der Inspektor den Inspektionsprozess:
gefundene Fehler, genutzte Use Cases, Fehlerort und eine kurze Fehlerbeschreibung. Es
dient als standardisiertes Erhebungsinstrument für LLM und menschliche Inspektoren gleichermaßen.

---

### 1.4 Experimentelles Setup

#### 1.4.1 Experiment Definition

Das Experiment ist definiert gemäß dem GQM-basierten Template von Wohlin et al. (2000):

- **Analyseobjekt:** RB-UBR-basierte Software-Inspektion eines Design-Dokuments
- **Zweck:** Evaluation der Inspektionsleistung (Effektivität, Fehlerklassenabdeckung)
- **Qualitätsmerkmal:** Effektivität der Fehleridentifikation
- **Perspektive:** Forscher
- **Kontext:** LLM inspiziert dasselbe Design-Dokument wie die menschlichen Probanden
  in Petersen et al. (2008); quasi-experimenteller Vergleich, da die menschlichen Daten
  aus einem bereits abgeschlossenen Experiment stammen

#### 1.4.2 Faktor und Treatments

Der primäre **Faktor** ist der **Reviewer-Typ**. Die **Treatments** sind:

| Treatment | Beschreibung | Datenbasis |
|-----------|--------------|------------|
| **T1: LLM** | LLM führt RB-UBR Inspektion autonom durch | Neue Erhebung (Phase 1: n=10 Runs) |
| **T2: Mensch** | Menschliche Inspektoren, RB-UBR Gruppe | Petersen et al. (2008), n=10 |

In Petersen et al. (2008) nahmen ursprünglich 23 Studierende teil; nach Ausschluss von
4 Probanden (2 abgebrochen, 2 wegen mangelnder Process Conformance in der TC-UBR-Gruppe)
verblieben 19 ausgewertete Probanden. Davon gehörten **10 der RB-UBR-Gruppe** (Kontrollgruppe)
an, die als Vergleichsbasis für diese Studie dient.

Um einen direkten Vergleich zu ermöglichen, führt das LLM in **Phase 1 ebenfalls 10 Runs**
mit identischer Konfiguration durch – entsprechend der Stichprobengröße der menschlichen
Vergleichsgruppe.

In **Phase 2** wird der **Eingabeparameter** als sekundärer Faktor untersucht (vgl. RQ3):
Mehrere Runs mit variierenden Konfigurationen (Detailgrad der Instruktionen, bereitgestellte
Dokumente, Prompt-Struktur, Effort-Level des Modells) werden durchgeführt, um die
Inspektionsleistung des LLMs zu optimieren.

#### 1.4.3 Instrumente

Folgende Instrumente werden eingesetzt. Diese sind keine Variablen, sondern Werkzeuge und
Artefakte zur Durchführung und Dokumentation der Inspektion:

- **Inspektionsartefakte (Experimentalpaket):** `TextReqSpec_v3.6.md`,
  `Taxi_des_exp_v2.md`, `UseCasesRank_v3.4.md`, `Inspection Record Empty.json`
  – alle Bestandteile des originalen Experimentalpakets von Petersen et al. (2008)
- **Inspektionsplan:** `Inspektionsplan.md` – vom Autor dieser Studie erstellt, basierend
  auf dem RB-UBR-Prozess aus Petersen et al. (2008); kein Bestandteil des originalen
  Experimentalpakets
- **Inspection Agent Prompt:** `Inspection_Agent_Prompt.md` – Prompt-Instruktionen für den
  LLM-Inspektor; vom Autor erstellt; kein Bestandteil des originalen Experimentalpakets
- **Referenzdaten (Mensch):** `Inspection Record Original.json` – menschliche
  Inspektionsergebnisse aus Petersen et al. (2008); dem LLM nicht zugänglich

---

### 1.5 Variablen

#### 1.5.1 Unabhängige Variable

Der **Reviewer-Typ** (LLM vs. Mensch) ist die primäre unabhängige Variable. In Phase 2
wird zusätzlich der **Eingabeparameter** (Prompt-Konfiguration, Effort-Level des Modells)
als sekundäre unabhängige Variable variiert. Der Effort-Level umfasst dabei den
Standard-Modus (Baseline-Runs in Phase 1) sowie höhere Stufen wie Extended Thinking
(Optimierungsläufe in Phase 2).

#### 1.5.2 Abhängige Variablen

Entsprechend Petersen et al. (2008) wird folgende abhängige Variable erhoben:

**Direkte Messgröße:**
- Anzahl gefundener Fehler (gesamt sowie je Klasse A, B, C)

**Abgeleitete Messgröße:**

```
Effectiveness = Anzahl gefundener Fehler / Gesamtanzahl vorhandener Fehler (38)
```

Berechnet jeweils für: alle Fehler (A+B+C), nur A-Fehler, A&B-Fehler.

#### 1.5.3 Kontrollvariablen

Zur Sicherstellung der Vergleichbarkeit werden folgende Variablen konstant gehalten:

- Inspektionsdokumente des Experimentalpakets (identisch mit Petersen et al. 2008):
  Anforderungsdokument, Design-Dokument, Use-Case-Dokument, Inspection Record Form
- Fehlerklassifikation und Gesamtanzahl (38 Fehler: 13A, 14B, 11C)
- Inspektionsreihenfolge (Use Cases in priorisierter Reihenfolge, RB-UBR)
- Fehlerdefinition (Inkonsistenz zwischen Anforderungen und Design gilt als Fehler)

*Nicht identisch mit Petersen et al. (2008):* Der Inspektionsplan wurde vom Autor neu
erstellt und ist kein Bestandteil des originalen Experimentalpakets.

---

### 1.6 Datenerhebung

#### Phase 1: LLM-Replikation (RQ1–RQ2)

Das LLM führt 10 Runs mit identischer Konfiguration durch (entsprechend n=10 der
menschlichen RB-UBR-Gruppe). Jeder Run folgt diesem Protokoll:

1. Das LLM erhält die Inspektionsdokumente aus dem `Input/`-Ordner sowie den Inspektionsplan
2. Es erhält **keinen** Zugriff auf `Inspection Record Original.json`
3. Das LLM führt die Inspektion nach dem RB-UBR-Prozess durch
4. Die gefundenen Fehler werden in einer Kopie der `Inspection Record Empty.json` dokumentiert
5. Das ausgefüllte Formular wird gespeichert als `Results/Run_XX_Inspection_Record.json`

Jeder Run wird durch folgenden standardisierten Trigger-Prompt gestartet (wobei `XX` durch die Laufnummer ersetzt wird):

```
Lies `Claude Code Inspektion/Input/Inspection_Agent_Prompt.md` und befolge die Anweisungen exakt. Dies ist Run_XX.
```

#### Phase 2: Parametervariation (RQ3)

Mehrere zusätzliche Runs mit variierenden Eingabeparametern werden durchgeführt
(z.B. mit/ohne Fehlerklassendefinition, unterschiedlichem Detailgrad des Inspektionsplans,
variierender Anzahl bereitgestellter Eingabedokumente, höherem Effort-Level). Ziel ist die
Identifikation von Konfigurationen, die die Inspektionsleistung des LLMs verbessern.

#### Menschliche Basisdaten (aus Petersen et al. 2008)

| Datenquelle | Inhalt | Verwendet für |
|-------------|--------|---------------|
| Tabelle 4 (Petersen et al. 2008) | p-Werte der Hypothesentests | Benchmarkvergleich |
| `Inspection Record Original.json` | Gefundene Fehler je Inspektor, Fehlerklassen A/B/C | Effektivitäts-Berechnung |

---

### 1.7 Datenauswertung

Die Auswertung orientiert sich an Petersen et al. (2008) und erfolgt in drei Schritten:
deskriptive Statistik, inferenzstatistische Tests und visuelle Aufbereitung.

#### Deskriptive Statistik

Für jede abhängige Variable werden Median, Minimum, Maximum und Interquartilsabstand (IQR)
berechnet – analog zu Petersen et al. (2008).

#### Inferenzstatistische Verfahren

Da keine Normalverteilung angenommen werden kann, werden nicht-parametrische Tests eingesetzt:

**Mann-Whitney-U-Test** (für RQ1):  
Vergleich der Medianwerte für Effektivität zwischen LLM und menschlichen Inspektoren.
Der Test ist robust gegenüber Verteilungsannahmen und wurde in vorangegangenen
Inspektionsexperimenten konsistent eingesetzt [Thelin et al. 2001, 2003, Petersen et al. 2008].

**Effektgröße:**  
Ergänzend zum p-Wert wird die Effektgröße *r* berechnet (r = Z / √N), um die praktische
Bedeutsamkeit der Unterschiede einzuschätzen (Richtwerte nach Cohen: r ≥ 0,1 klein;
r ≥ 0,3 mittel; r ≥ 0,5 groß).

**Chi-Quadrat-Test** (für RQ2):  
Vergleich der Häufigkeitsverteilung gefundener Fehler über die Klassen A, B, C zwischen
LLM und menschlichen Inspektoren.

Das Signifikanzniveau ist auf **α = 0,05** festgelegt (analog zu Petersen et al. 2008).

#### Hypothesen

**RQ1 – Effektivität:**

```
H0_S_all:  S_all(LLM) = S_all(Mensch)
Ha_S_all:  S_all(LLM) ≠ S_all(Mensch)

H0_S_A:    S_A(LLM) = S_A(Mensch)
Ha_S_A:    S_A(LLM) ≠ S_A(Mensch)

H0_S_A&B:  S_A&B(LLM) = S_A&B(Mensch)
Ha_S_A&B:  S_A&B(LLM) ≠ S_A&B(Mensch)
```

**RQ2 – Fehlerklassenabdeckung:**

```
H0_Fault:  Fault(LLM) = Fault(Mensch)
Ha_Fault:  Fault(LLM) ≠ Fault(Mensch)
```

#### Darstellung der Ergebnisse

Analog zu Petersen et al. (2008):

- **Box Plots** für Effektivität (alle Fehler, A-Fehler, A&B-Fehler)
- **Balkendiagramme** für Fehlerklassenabdeckung (Anteil der Reviewer/Runs, die jeden
  einzelnen Fehler gefunden haben; analog zu Figure 3/4 in Petersen et al. 2008)
- **Vergleichstabellen** mit den Werten aus Petersen et al. (analog zu Tabelle 4)

---

### 1.8 Reproduzierbarkeit

Das Research Design ist vollständig reproduzierbar. Alle Eingabedokumente, der Inspektionsplan,
die Inspection-Record-Vorlage sowie die Prompt-Konfigurationen sind versioniert im Repository
`Sildex/bachelor-thesis-ai-inspection` hinterlegt. Jeder Inspektionsdurchlauf wird als
separater Run mit eindeutiger Nummer gespeichert (`Results/Run_XX_Inspection_Record.json`).
Die menschlichen Referenzdaten sind im Repository enthalten, jedoch vom LLM-Zugriff isoliert
(`Human_Reference_NOT_FOR_AI/`).

---

## Referenzen

- Andersson, C., Thelin, T., Runeson, P., & Dzamashvili, N. (2003). *An experimental
  evaluation of inspection and testing for detection of design faults*. ISESE'03.
- Petersen, K., Rönkkö, K., & Wohlin, C. (2008). *The Impact of Time Controlled Reading on
  Software Inspection Effectiveness and Efficiency – A Controlled Experiment*. ESEM'08.
- Thelin, T., Runeson, P., & Regnell, B. (2001). *Usage-based reading – an experiment to guide
  reviewers with use cases*. Information & Software Technology, 43(15), 925–938.
- Thelin, T., Runeson, P., & Wohlin, C. (2003). *An experimental comparison of usage-based and
  checklist-based reading*. IEEE Transactions on Software Engineering, 29(8), 687–704.
- Wohlin, C., Runeson, P., Höst, M., Ohlsson, M.C., Regnell, B., & Wesslén, A. (2000).
  *Experimentation in Software Engineering: An Introduction*. Springer.
