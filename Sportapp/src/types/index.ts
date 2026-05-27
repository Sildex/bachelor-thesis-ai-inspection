export type SplitType = 'push' | 'pull' | 'leg';

export interface Exercise {
  id: number;
  name: string;
  split_type: SplitType;
  default_sets: number;
  machine_setting?: string;
}

export interface Session {
  id: number;
  split_type: SplitType;
  date: string;
}

export interface SessionExercise {
  id: number;
  session_id: number;
  exercise_id: number;
  name: string;
}

export interface SetEntry {
  id: number;
  session_exercise_id: number;
  set_number: number;
  weight_kg: number;
  reps: number;
}

export interface SetInput {
  set_number: number;
  weight_kg: string;
  reps: string;
}

export interface ExerciseWithSets {
  exercise: Exercise;
  sets: SetInput[];
  previousSets: SetEntry[];
  active: boolean;
}
