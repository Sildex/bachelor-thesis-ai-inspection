# Use Cases – Detailübersicht

> Status: Entwurf | Stand: 2026-04-19

---

## UC-01: Split-Tag auswählen

**Akteur:** Nutzer  
**Vorbedingung:** App ist geöffnet  
**Ablauf:**
1. Nutzer sieht Startbildschirm mit drei Optionen: Push / Pull / Leg
2. Nutzer tippt auf einen Split
3. App lädt die Übungsliste für diesen Split

**Nachbedingung:** Übungsliste des gewählten Splits wird angezeigt

---

## UC-02: Training starten

**Akteur:** Nutzer  
**Vorbedingung:** Split ausgewählt  
**Ablauf:**
1. Nutzer tippt "Training starten"
2. App legt neue Session an (Datum, Split-Typ)
3. Übungen werden mit Standardsatzanzahl angezeigt
4. Letzte Werte (falls vorhanden) werden als Referenz eingeblendet

---

## UC-03: Satz erfassen

**Akteur:** Nutzer  
**Vorbedingung:** Training läuft  
**Ablauf:**
1. Nutzer gibt Gewicht (kg) und Wiederholungen für einen Satz ein
2. App zeigt sofort Vergleich zum gleichen Satz des letzten Trainings (↑ / ↓ / =)

---

## UC-04: Satz hinzufügen / entfernen

**Akteur:** Nutzer  
**Vorbedingung:** Training läuft  
**Ablauf:**
1. Nutzer tippt "+" um einen Satz hinzuzufügen
2. Nutzer tippt "×" auf einem Satz um ihn zu entfernen

---

## UC-05: Übung hinzufügen

**Akteur:** Nutzer  
**Vorbedingung:** Split-Ansicht offen  
**Ablauf:**
1. Nutzer tippt "Übung hinzufügen"
2. Gibt Name und Standard-Satzanzahl ein
3. Übung wird dem Split dauerhaft hinzugefügt

---

## UC-06: Übung entfernen / umbenennen

**Akteur:** Nutzer  
**Vorbedingung:** Split-Ansicht offen  
**Ablauf:**
1. Nutzer hält Übung gedrückt (Long Press) → Kontextmenü
2. Option: Umbenennen oder Entfernen
3. Änderung wird gespeichert

---

## UC-07: Fortschritt einsehen

**Akteur:** Nutzer  
**Vorbedingung:** Mindestens eine vorherige Session des gleichen Split-Typs vorhanden  
**Ablauf:**
1. Während des Trainings: Referenzwerte werden pro Satz eingeblendet
2. Nach dem Training: Zusammenfassung zeigt Gesamtvolumen-Vergleich

---

## UC-08: Training abschließen

**Akteur:** Nutzer  
**Vorbedingung:** Training läuft  
**Ablauf:**
1. Nutzer tippt "Training beenden"
2. App speichert Session in SQLite
3. Zusammenfassung mit Fortschrittsübersicht wird angezeigt

---

## UC-09: Trainingshistorie ansehen

**Akteur:** Nutzer  
**Vorbedingung:** Mindestens eine abgeschlossene Session  
**Ablauf:**
1. Nutzer navigiert zum History-Screen
2. Liste aller Sessions (Datum, Split-Typ, Volumen)
3. Nutzer kann eine Session antippen für Details
