import { SplitType } from '../types';

export const DEFAULT_EXERCISES: { name: string; split_type: SplitType; default_sets: number }[] = [
  // Push
  { name: 'Bench Press', split_type: 'push', default_sets: 3 },
  { name: 'Dumbbell Lateral Raise', split_type: 'push', default_sets: 3 },
  { name: 'Pec Deck Fly', split_type: 'push', default_sets: 3 },
  { name: 'Tricep Pushdown (Bar)', split_type: 'push', default_sets: 3 },
  { name: 'Tricep Pushdown (Rope)', split_type: 'push', default_sets: 3 },
  { name: 'Cable Lateral Raise', split_type: 'push', default_sets: 3 },
  // Pull
  { name: 'Lat Pulldown', split_type: 'pull', default_sets: 3 },
  { name: 'Reverse Pec Deck', split_type: 'pull', default_sets: 3 },
  { name: 'Seated Cable Row', split_type: 'pull', default_sets: 3 },
  { name: 'Bicep Curl', split_type: 'pull', default_sets: 3 },
  { name: 'Lying Crunch Machine', split_type: 'pull', default_sets: 3 },
  // Leg
  { name: 'Seated Leg Curl', split_type: 'leg', default_sets: 3 },
  { name: 'Lying Leg Curl', split_type: 'leg', default_sets: 3 },
  { name: 'Leg Extension', split_type: 'leg', default_sets: 3 },
  { name: 'Hip Adduction', split_type: 'leg', default_sets: 3 },
  { name: 'Hip Abduction', split_type: 'leg', default_sets: 3 },
  { name: 'Standing Calf Raise', split_type: 'leg', default_sets: 3 },
  { name: 'Glute Kickback', split_type: 'leg', default_sets: 3 },
];
