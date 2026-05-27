import * as SQLite from 'expo-sqlite';
import { DEFAULT_EXERCISES } from './defaultExercises';
import { Exercise, Session, SessionExercise, SetEntry, SplitType } from '../types';

const db = SQLite.openDatabaseSync('fittrack.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      split_type TEXT NOT NULL,
      default_sets INTEGER NOT NULL DEFAULT 3
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      split_type TEXT NOT NULL,
      date TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS session_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_exercise_id INTEGER NOT NULL,
      set_number INTEGER NOT NULL,
      weight_kg REAL NOT NULL,
      reps INTEGER NOT NULL
    );
  `);

  try {
    db.execSync('ALTER TABLE exercises ADD COLUMN sort_order INTEGER DEFAULT 0');
    db.execSync('UPDATE exercises SET sort_order = id');
  } catch { /* column already exists */ }
  try {
    db.execSync('ALTER TABLE exercises ADD COLUMN machine_setting TEXT DEFAULT ""');
  } catch { /* column already exists */ }

  const count = db.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM exercises');
  if (count?.count === 0) {
    for (const ex of DEFAULT_EXERCISES) {
      db.runSync(
        'INSERT INTO exercises (name, split_type, default_sets) VALUES (?, ?, ?)',
        [ex.name, ex.split_type, ex.default_sets]
      );
    }
  }
}

export function getExercisesBySplit(splitType: SplitType): Exercise[] {
  return db.getAllSync<Exercise>(
    'SELECT * FROM exercises WHERE split_type = ? ORDER BY sort_order, id',
    [splitType]
  );
}

export function saveExerciseOrder(orderedIds: number[]) {
  for (let i = 0; i < orderedIds.length; i++) {
    db.runSync('UPDATE exercises SET sort_order = ? WHERE id = ?', [i, orderedIds[i]]);
  }
}

export function getExerciseProgress(exerciseId: number): { date: string; best_weight: number; best_reps: number }[] {
  return db.getAllSync(
    `SELECT s.date, MAX(st.weight_kg) as best_weight,
            (SELECT st2.reps FROM sets st2
             WHERE st2.session_exercise_id = se.id
             ORDER BY st2.weight_kg DESC LIMIT 1) as best_reps
     FROM sessions s
     JOIN session_exercises se ON se.session_id = s.id
     JOIN sets st ON st.session_exercise_id = se.id
     WHERE se.exercise_id = ?
     GROUP BY s.id
     ORDER BY s.id ASC`,
    [exerciseId]
  );
}

export function createSession(splitType: SplitType): number {
  const date = new Date().toISOString().split('T')[0];
  const result = db.runSync(
    'INSERT INTO sessions (split_type, date) VALUES (?, ?)',
    [splitType, date]
  );
  return result.lastInsertRowId;
}

export function createSessionExercise(sessionId: number, exerciseId: number, name: string): number {
  const result = db.runSync(
    'INSERT INTO session_exercises (session_id, exercise_id, name) VALUES (?, ?, ?)',
    [sessionId, exerciseId, name]
  );
  return result.lastInsertRowId;
}

export function saveSets(sessionExerciseId: number, sets: { weight_kg: number; reps: number }[]) {
  for (let i = 0; i < sets.length; i++) {
    db.runSync(
      'INSERT INTO sets (session_exercise_id, set_number, weight_kg, reps) VALUES (?, ?, ?, ?)',
      [sessionExerciseId, i + 1, sets[i].weight_kg, sets[i].reps]
    );
  }
}

export function getPreviousSets(exerciseId: number, splitType: SplitType): SetEntry[] {
  // Get the last session of this split type (excluding current if exists)
  const lastSession = db.getFirstSync<Session>(
    'SELECT * FROM sessions WHERE split_type = ? ORDER BY id DESC LIMIT 1',
    [splitType]
  );
  if (!lastSession) return [];

  const sessionExercise = db.getFirstSync<SessionExercise>(
    'SELECT * FROM session_exercises WHERE session_id = ? AND exercise_id = ?',
    [lastSession.id, exerciseId]
  );
  if (!sessionExercise) return [];

  return db.getAllSync<SetEntry>(
    'SELECT * FROM sets WHERE session_exercise_id = ? ORDER BY set_number',
    [sessionExercise.id]
  );
}

export function getLastSplitType(): SplitType | null {
  const row = db.getFirstSync<{ split_type: SplitType }>(
    'SELECT split_type FROM sessions ORDER BY id DESC LIMIT 1'
  );
  return row?.split_type ?? null;
}

export function getAllSessions(): (Session & { exercise_count: number })[] {
  return db.getAllSync(
    `SELECT s.*, COUNT(se.id) as exercise_count
     FROM sessions s
     LEFT JOIN session_exercises se ON se.session_id = s.id
     GROUP BY s.id
     ORDER BY s.id DESC`
  );
}

export function addExercise(name: string, splitType: SplitType, defaultSets: number): Exercise {
  const maxOrder = db.getFirstSync<{ max_order: number }>(
    'SELECT COALESCE(MAX(sort_order), -1) as max_order FROM exercises WHERE split_type = ?',
    [splitType]
  );
  const sortOrder = (maxOrder?.max_order ?? -1) + 1;
  const result = db.runSync(
    'INSERT INTO exercises (name, split_type, default_sets, sort_order) VALUES (?, ?, ?, ?)',
    [name, splitType, defaultSets, sortOrder]
  );
  return { id: result.lastInsertRowId, name, split_type: splitType, default_sets: defaultSets };
}

export function updateExerciseName(id: number, name: string) {
  db.runSync('UPDATE exercises SET name = ? WHERE id = ?', [name, id]);
}

export function updateMachineSetting(id: number, setting: string) {
  db.runSync('UPDATE exercises SET machine_setting = ? WHERE id = ?', [setting, id]);
}

export function deleteExercise(id: number) {
  db.runSync('DELETE FROM exercises WHERE id = ?', [id]);
}

export function getVolumeHistory(splitType: SplitType): { date: string; volume: number }[] {
  return db.getAllSync(
    `SELECT s.date, COALESCE(SUM(st.weight_kg * st.reps), 0) as volume
     FROM sessions s
     LEFT JOIN session_exercises se ON se.session_id = s.id
     LEFT JOIN sets st ON st.session_exercise_id = se.id
     WHERE s.split_type = ?
     GROUP BY s.id
     ORDER BY s.id ASC
     LIMIT 10`,
    [splitType]
  );
}

export function deleteSession(sessionId: number) {
  const exercises = db.getAllSync<{ id: number }>(
    'SELECT id FROM session_exercises WHERE session_id = ?', [sessionId]
  );
  for (const ex of exercises) {
    db.runSync('DELETE FROM sets WHERE session_exercise_id = ?', [ex.id]);
  }
  db.runSync('DELETE FROM session_exercises WHERE session_id = ?', [sessionId]);
  db.runSync('DELETE FROM sessions WHERE id = ?', [sessionId]);
}

export function exportAllData() {
  const sessions = db.getAllSync<Session>('SELECT * FROM sessions ORDER BY id ASC');
  return sessions.map(session => {
    const exercises = db.getAllSync<SessionExercise>(
      'SELECT * FROM session_exercises WHERE session_id = ?', [session.id]
    );
    return {
      ...session,
      exercises: exercises.map(ex => ({
        ...ex,
        sets: db.getAllSync<SetEntry>(
          'SELECT * FROM sets WHERE session_exercise_id = ? ORDER BY set_number', [ex.id]
        ),
      })),
    };
  });
}

export function getSessionDetails(sessionId: number) {
  const exercises = db.getAllSync<SessionExercise>(
    'SELECT * FROM session_exercises WHERE session_id = ?',
    [sessionId]
  );
  return exercises.map(ex => ({
    ...ex,
    sets: db.getAllSync<SetEntry>(
      'SELECT * FROM sets WHERE session_exercise_id = ? ORDER BY set_number',
      [ex.id]
    ),
  }));
}
