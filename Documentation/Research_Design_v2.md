# Research Design

**Maik Bender**  
April 2026

---

## 1 Research Design

Diese Arbeit folgt einem kontrollierten, vergleichenden experimentellen Research Design zur
Untersuchung der Leistungsfähigkeit von Large Language Models (LLMs) bei der Durchführung
use-case-basierter Software-Inspektionen. Ziel ist es, die Effektivität und Effizienz eines LLMs
im direkten Vergleich mit menschlichen Inspektoren unter identischen Inspektionsbedingungen
systematisch zu analysieren. Als Referenzbasis dienen die Ergebnisse des kontrollierten Experiments
von Petersen et al. (2008), in dem 23 Master-Studierende dasselbe Experimentalpaket unter
Anwendung der Rank-Based Usage-Based Reading (RB-UBR) Technik inspiziert haben.

### 1.1 Zielsetzung der Studie

Ziel der Studie ist es, zu untersuchen, inwieweit ein Large Language Model in der Lage ist,
Fehler in einem Software-Design-Dokument zu identifizieren, wenn es eine strukturierte
Inspektionsmethode nach dem RB-UBR-Ansatz anwendet. Die Inspektionsleistung des LLMs
wird dabei direkt mit den menschlichen Inspektionsergebnissen aus Petersen et al. (2008)
verglichen. Zusätzlich wird untersucht, wie die Variation von Eingabeparametern (Prompt-Design,
Kontextinformation, Instruktionsdetailgrad) die Leistung des LLMs beeinflusst.

---

### 1.2 Forschungsfragen

Die Untersuchung wird durch die folgenden Forschungsfragen geleitet:

- **RQ1:** Wie effektiv ist ein LLM im Vergleich zu menschlichen Inspektoren bei der
  Identifikation von Fehlern in einem Software-Design-Dokument unter Verwendung des
  RB-UBR-Ansatzes?

- **RQ2:** Wie effizient ist ein LLM im Vergleich zu menschlichen Inspektoren
  (Fehler pro Zeiteinheit)?

- **RQ3:** Unterscheidet sich die Fehlerklassenabdeckung (A-, B-, C-Fehler) eines LLMs
  von der menschlicher Inspektoren?

- **RQ4:** Wie beeinflusst die Variation von Eingabeparametern (z.B. Detailgrad der
  Instruktionen, Kontextinformation, Prompt-Struktur) die Inspektionsleistung des LLMs?

---

### 1.3 Untersuchungsobjekte

Das verwendete Experimentalpaket wurde an der Universität Lund entwickelt und in mehreren
vorangegangenen Inspektionsexperimenten eingesetzt [Petersen et al. 2008, Thelin et al. 2001,
2003]. Es umfasst ein **Taxi-Managementsystem** mit folgenden Dokumenten:

#### Textuelle Anforderungen (`TextReqSpec_v3.6.pdf`)

Die Anforderungen sind in natürlicher Sprache (Englisch) formuliert. Im Kontext dieser Studie
werden die Anforderungen als korrekt angenommen. Inkonsistenzen zwischen Anforderungen und
Design-Dokument werden als Fehler im Design gewertet.

#### Design-Dokument (`Taxi_des_exp_v2.pdf`)

Das zu inspizierende Design-Dokument umfasst 2.300 Wörter auf 9 Seiten. Im einleitenden Teil
erhält der Inspektor einen Überblick über die Komponenten des Systems und deren Kommunikation
über Signale. Anschließend werden zwei Szenarien in Message-Sequence-Chart (MSC) Notation
beschrieben. Das Dokument enthält insgesamt **38 Fehler**, eingeteilt in drei Klassen:

| Klasse | Anzahl | Charakterisierung |
|--------|--------|-------------------|
| A | 13 | Kritisch – betreffen häufig genutzte und wichtige Funktionalität aus Nutzerperspektive |
| B | 14 | Wichtig – betreffen entweder häufig genutzte oder bedeutsame Funktionalität |
| C | 11 | Geringfügig – betreffen selten genutzte oder wenig bedeutsame Funktionalität |

Die Fehler sind identisch mit jenen aus früheren Experimenten und stellen reale Fehler aus
der Entwicklung des Systems dar.

#### Use-Case-Dokument (`UseCasesRank_v3.4.pdf`)

Das Use-Case-Dokument enthält 19 Use Cases (die 5 Use Cases mit der niedrigsten Priorität wurden
entfernt, um die Inspektion in einem begrenzten Zeitrahmen zu ermöglichen). Die Use Cases sind
nach Nutzungshäufigkeit und Wichtigkeit aus Nutzerperspektive priorisiert und in Task-Notation
formuliert (Purpose, Tasks, Variants). Sie dienen als primäres Führungsinstrument für den
RB-UBR-Inspektionsprozess.

#### Inspektionsplan (`Inspektion_1.pdf`)

Der Inspektionsplan beschreibt den strukturierten Ablauf der RB-UBR-Inspektion Schritt für
Schritt. Er legt fest, in welcher Reihenfolge und wie die Use Cases zur Inspektion des
Design-Dokuments heranzuziehen sind. Er bildet die gemeinsame methodische Grundlage sowohl
für die menschlichen Inspektoren (Petersen et al. 2008) als auch für den LLM-Inspektor in
dieser Studie.

---

### 1.4 Experimentelles Setup

#### 1.4.1 Experiment Definition

Das Experiment ist definiert gemäß dem Template von Wohlin et al. (2000) als:

- **Analyseobjekt:** RB-UBR-basierte Software-Inspektion durch ein LLM vs. menschliche Inspektoren
- **Zweck:** Evaluation
- **Qualitätsmerkmal:** Effektivität, Effizienz und Fehlerklassenabdeckung (Fault Content)
- **Perspektive:** Forscher
- **Kontext:** LLM inspiziert dasselbe Design-Dokument wie die menschlichen Probanden
  in Petersen et al. (2008)

#### 1.4.2 Faktor und Treatments

Der **Faktor** (unabhängige Variable) ist der **Reviewer-Typ**.
Die **Treatments** sind:

| Treatment | Beschreibung | Datenbasis |
|-----------|--------------|------------|
| **T1: LLM** | LLM führt RB-UBR Inspektion autonom durch | Neue Erhebung (mehrere Runs) |
| **T2: Mensch** | Menschliche Inspektoren, RB-UBR Gruppe | Petersen et al. (2008), n=10 |

Der Vergleich ist **quasi-experimentell**, da die menschlichen Daten aus einem bereits
durchgeführten Experiment stammen und nicht neu erhoben werden.

Zusätzlich werden innerhalb der LLM-Runs verschiedene **Prompt-Konfigurationen** als
sekundärer Faktor untersucht (vgl. RQ4).

#### 1.4.3 Instrumente

Folgende Instrumente werden eingesetzt (keine Variablen):

- **Inspektionsartefakte:** `TextReqSpec_v3.6.pdf`, `Taxi_des_exp_v2.pdf`,
  `UseCasesRank_v3.4.pdf`
- **Inspektionsplan:** `Inspektion_1.pdf`
- **Inspection Record (Vorlage):** `Inspection Record Empty.json` – standardisiertes Formular
  zur Dokumentation gefundener Fehler (Fehlerort, Fehlerklasse, Beschreibung, genutzter
  Use Case)
- **Referenzdaten (Mensch):** `Inspection Record Original.json` – menschliche
  Inspektionsergebnisse aus Petersen et al. (2008); dem LLM nicht zugänglich

---

### 1.5 Variablen

#### 1.5.1 Unabhängige Variable

Der **Reviewer-Typ** (LLM vs. Mensch) ist die primäre unabhängige Variable. Innerhalb der
LLM-Runs wird zusätzlich der **Eingabeparameter** (Prompt-Konfiguration) als sekundäre
unabhängige Variable variiert.

#### 1.5.2 Abhängige Variablen

Entsprechend Petersen et al. (2008) werden folgende abhängige Variablen erhoben:

**Direkte Messgrößen:**
- Zeit für Überblickslesen (Overview Reading) in Minuten
- Zeit für die Inspektion in Minuten
- Zeitpunkt der Fehlerentdeckung in Minuten ab Inspektionsbeginn

**Indirekte Messgrößen (berechnet):**

```
Effectiveness = Anzahl gefundener Fehler / Gesamtanzahl vorhandener Fehler (38)

Efficiency = 60 × (Anzahl gefundener Fehler / (Overview-Zeit + Inspektionszeit))
```

Berechnet jeweils für: alle Fehler (A+B+C), A-Fehler, A&B-Fehler.

#### 1.5.3 Kontrollvariablen

Zur Sicherstellung der Vergleichbarkeit werden folgende Variablen konstant gehalten:

- Inspektionsdokumente (identisch mit Petersen et al. 2008)
- Fehlerklassifikation und Gesamtanzahl (38 Fehler: 13A, 14B, 11C)
- Inspektionsreihenfolge (Use Cases in priorisierter Reihenfolge, RB-UBR)
- Fehlerdefinition (Inkonsistenz zwischen Anforderungen und Design gilt als Fehler)

---

### 1.6 Datenerhebung

#### LLM-Daten (neue Erhebung)

Jeder LLM-Run wird nach folgendem Protokoll durchgeführt:

1. Das LLM erhält die Inspektionsdokumente aus dem `Input/`-Ordner sowie den Inspektionsplan
2. Es erhält **keinen** Zugriff auf den `Inspection Record Original.json`
   (Vermeidung von Kontamination durch die Lösungen)
3. Das LLM führt die Inspektion nach dem RB-UBR-Prozess durch
4. Die gefundenen Fehler werden in einer Kopie der `Inspection Record Empty.json` dokumentiert
5. Das ausgefüllte Formular wird gespeichert als `Results/Run_XX_Inspection_Record.json`

Für die Untersuchung von RQ4 werden mehrere Runs mit variierenden Prompt-Konfigurationen
durchgeführt (z.B. mit/ohne Fehlerklassendefinition, unterschiedlicher Detailgrad des
Inspektionsplans).

#### Menschliche Basisdaten (aus Petersen et al. 2008)

Die Vergleichsdaten der menschlichen Inspektoren stammen aus:

- **Quelle:** Petersen et al. (2008), RB-UBR Gruppe (Kontrollgruppe), n=10
- **Datei:** `Human_Reference_NOT_FOR_AI/Inspection Record Original.json`
- **Enthaltene Daten:** Gefundene Fehler pro Inspektor, Fehlerklassen (A/B/C),
  Inspektionszeiten (Overview + Individual)

---

### 1.7 Datenauswertung

Die Auswertung orientiert sich direkt an Petersen et al. (2008), um eine direkte
Vergleichbarkeit der Ergebnisse sicherzustellen.

#### Statistische Verfahren

Entsprechend Petersen et al. (2008) wird der **Mann-Whitney-Test** eingesetzt, um die
Medianwerte für Effektivität und Effizienz zwischen LLM und menschlichen Inspektoren zu
vergleichen. Der Test ist robust gegenüber Verteilungsannahmen und wurde in vorangegangenen
Inspektionsexperimenten konsistent verwendet.

Für den Vergleich der **Fehlerklassenabdeckung (Fault Content)** wird der
**Chi-Quadrat-Test** auf die Häufigkeiten der gefundenen Fehler angewendet.

Das Signifikanzniveau ist auf **α = 0,05** festgelegt (analog zu Petersen et al. 2008).

#### Hypothesen

**Q1 – Effektivität (Effectiveness):**

```
H0_S_all:  S_all(LLM) = S_all(Mensch)
Ha_S_all:  S_all(LLM) ≠ S_all(Mensch)

H0_S_A:    S_A(LLM) = S_A(Mensch)
Ha_S_A:    S_A(LLM) ≠ S_A(Mensch)

H0_S_A&B:  S_A&B(LLM) = S_A&B(Mensch)
Ha_S_A&B:  S_A&B(LLM) ≠ S_A&B(Mensch)
```

**Q2 – Effizienz (Efficiency):**

```
H0_E_all:  E_all(LLM) = E_all(Mensch)
Ha_E_all:  E_all(LLM) ≠ E_all(Mensch)

H0_E_A:    E_A(LLM) = E_A(Mensch)
Ha_E_A:    E_A(LLM) ≠ E_A(Mensch)

H0_E_A&B:  E_A&B(LLM) = E_A&B(Mensch)
Ha_E_A&B:  E_A&B(LLM) ≠ E_A&B(Mensch)
```

**Q3 – Fehlerklassenabdeckung (Fault Content):**

```
H0_Fault:  Fault(LLM) = Fault(Mensch)
Ha_Fault:  Fault(LLM) ≠ Fault(Mensch)
```

#### Darstellung der Ergebnisse

Analog zu Petersen et al. (2008):

- **Box Plots** für Effektivität und Effizienz (alle Fehler, A-Fehler, A&B-Fehler)
- **Balkendiagramme** für Fehlerklassenabdeckung (Anteil der Reviewer/Runs,
  die jeden einzelnen Fehler gefunden haben)
- **Vergleichstabellen** mit den Werten aus Petersen et al. (Tabelle 3: Zeiten;
  Tabelle 4: p-Werte der Hypothesentests)
- **Kumulative Fehlerentdeckungskurven** (analog zu Figure 2 in Petersen et al.)

---

### 1.8 Reproduzierbarkeit

Das Research Design ist vollständig reproduzierbar. Alle Eingabedokumente, der Inspektionsplan,
die Inspection-Record-Vorlage sowie die Prompt-Konfigurationen sind versioniert im Repository
`Sildex/bachelor-thesis-ai-inspection` hinterlegt. Jeder Inspektionsdurchlauf wird als
separater Run mit eindeutiger Nummer gespeichert (`Results/Run_XX_Inspection_Record.json`).
Die menschlichen Referenzdaten sind ebenfalls im Repository enthalten, jedoch vom
LLM-Zugriff isoliert (`Human_Reference_NOT_FOR_AI/`).

---

## Referenzen

- Petersen, K., Rönkkö, K., & Wohlin, C. (2008). *The Impact of Time Controlled Reading on
  Software Inspection Effectiveness and Efficiency – A Controlled Experiment*. ESEM'08.
- Thelin, T., Runeson, P., & Regnell, B. (2001). *Usage-based reading – an experiment to guide
  reviewers with use cases*. Information & Software Technology, 43(15), 925–938.
- Thelin, T., Runeson, P., & Wohlin, C. (2003). *An experimental comparison of usage-based and
  checklist-based reading*. IEEE Transactions on Software Engineering, 29(8), 687–704.
- Wohlin, C., Runeson, P., Höst, M., Ohlsson, M.C., Regnell, B., & Wesslén, A. (2000).
  *Experimentation in Software Engineering: An Introduction*. Springer.
