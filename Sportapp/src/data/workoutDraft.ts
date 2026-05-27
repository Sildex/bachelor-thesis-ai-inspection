import { ExerciseWithSets } from '../types';

interface Draft {
  splitType: string;
  data: ExerciseWithSets[];
}

let draft: Draft | null = null;

export function saveDraft(splitType: string, data: ExerciseWithSets[]) {
  draft = { splitType, data };
}

export function getDraft(splitType: string): ExerciseWithSets[] | null {
  return draft?.splitType === splitType ? draft.data : null;
}

export function clearDraft() {
  draft = null;
}
