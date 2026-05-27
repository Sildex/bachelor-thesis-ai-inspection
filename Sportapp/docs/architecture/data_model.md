# Datenmodell

> Stand: 2026-04-19 | Datenhaltung: SQLite (expo-sqlite)

---

## Tabellen

### `exercises`
| Spalte         | Typ     | Beschreibung                     |
|----------------|---------|----------------------------------|
| id             | INTEGER | Primary Key                      |
| name           | TEXT    | Name der Übung                   |
| split_type     | TEXT    | "push" \| "pull" \| "leg"        |
| default_sets   | INTEGER | Standard-Satzanzahl (Default: 3) |

### `sessions`
| Spalte     | Typ     | Beschreibung               |
|------------|---------|----------------------------|
| id         | INTEGER | Primary Key                |
| split_type | TEXT    | "push" \| "pull" \| "leg" |
| date       | TEXT    | ISO 8601 (z.B. 2026-04-19) |

### `session_exercises`
| Spalte      | Typ     | Beschreibung        |
|-------------|---------|---------------------|
| id          | INTEGER | Primary Key         |
| session_id  | INTEGER | FK → sessions.id    |
| exercise_id | INTEGER | FK → exercises.id   |
| name        | TEXT    | Name zum Zeitpunkt  |

### `sets`
| Spalte              | Typ     | Beschreibung               |
|---------------------|---------|----------------------------|
| id                  | INTEGER | Primary Key                |
| session_exercise_id | INTEGER | FK → session_exercises.id  |
| set_number          | INTEGER | Reihenfolge (1, 2, 3, …)   |
| weight_kg           | REAL    | Gewicht in kg              |
| reps                | INTEGER | Wiederholungen             |

---

## Beziehungen

```
sessions 1──n session_exercises n──n exercises
                    │
                    └──n sets
```

---

## Fortschrittsberechnung

- **Volumen** = weight_kg × reps (pro Satz), summiert pro session_exercise
- **Vergleich**: letzte Session mit gleichem split_type → gleiche exercise_id → gleicher set_number
