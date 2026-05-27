# FitTrack – App-Spezifikation

## Überblick

Fitness-Tracking-App für Push/Pull/Leg-Splits. Nutzer wählen einen Split-Tag, erfassen Gewicht und Wiederholungen pro Satz und sehen sofort, ob sie im Vergleich zum letzten Training Fortschritte erzielt haben.

---

## Technisches Fundament

| Eigenschaft     | Wert                        |
|-----------------|-----------------------------|
| Plattform       | Mobile (React Native + Expo) |
| Datenhaltung    | Lokal (SQLite via expo-sqlite)|
| Zielplattformen | iOS & Android               |
| Sprache         | TypeScript                  |

---

## Kernfunktionen

### 1. Split-Auswahl
- Nutzer wählt beim Start einer Session: **Push**, **Pull** oder **Leg**
- Pro Split gibt es eine Standardliste an Übungen (editierbar)

### 2. Übungsverwaltung
- Jeder Split hat vordefinierte Standardübungen
- Nutzer kann Übungen hinzufügen, entfernen oder umbenennen
- Änderungen sind persistent

**Standardübungen (Vorschlag, anpassbar):**

| Push              | Pull             | Leg              |
|-------------------|------------------|------------------|
| Bankdrücken       | Klimmzüge        | Kniebeugen       |
| Schulterdrücken   | Rudern           | Rumänisches Kreuzheben |
| Dips              | Bizepscurls      | Beinpresse       |
| Seitheben         | Face Pulls       | Ausfallschritte  |
| Trizepsdrücken    | Latzug           | Wadenheben       |

### 3. Trainingserfassung
- Pro Übung: konfigurierbare Standardsatzanzahl (Default: 3)
- Pro Satz: **Gewicht (kg)** + **Wiederholungen**
- Sätze können dynamisch hinzugefügt oder entfernt werden
- Eingabe via numerisches Keyboard

### 4. Fortschrittsanzeige
- Vergleich mit dem letzten Training des gleichen Split-Typs
- Anzeige pro Satz: ↑ mehr Gewicht / ↑ mehr Wiederholungen / ↓ weniger / = gleich
- Gesamtübersicht: Volumen (kg × Wdh) im Vergleich

---

## Use Cases (Überblick)

| ID    | Name                          | Akteur |
|-------|-------------------------------|--------|
| UC-01 | Split-Tag auswählen           | Nutzer |
| UC-02 | Training starten              | Nutzer |
| UC-03 | Satz erfassen                 | Nutzer |
| UC-04 | Satz hinzufügen / entfernen   | Nutzer |
| UC-05 | Übung hinzufügen              | Nutzer |
| UC-06 | Übung entfernen / umbenennen  | Nutzer |
| UC-07 | Fortschritt einsehen          | Nutzer |
| UC-08 | Training abschließen          | Nutzer |
| UC-09 | Trainingshistorie ansehen     | Nutzer |

---

## Datenmodell (konzeptuell)

```
Split
  └── name: "Push" | "Pull" | "Leg"
  └── exercises: Exercise[]

Exercise
  └── id, name, splitType, defaultSets: number

Session
  └── id, splitType, date
  └── sessionExercises: SessionExercise[]

SessionExercise
  └── exerciseId
  └── sets: Set[]

Set
  └── setNumber, weight (kg), reps
```

---

## Offene Entscheidungen

- [ ] App-Name final (aktuell: "FitTrack")
- [ ] Design-System / UI-Bibliothek (z.B. NativeBase, Tamagui, plain StyleSheet)
- [ ] Navigation: Stack + Bottom Tabs?
- [ ] Trainingshistorie: eigener Screen oder inline?
- [ ] Einheitenwechsel kg ↔ lbs?

---

## Nicht im Scope (vorerst)

- Cloud-Sync / Accounts
- Ernährungstracking
- Timerfunktion
- Körpergewicht-Tracking
