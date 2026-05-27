import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback,
  TextInput, StyleSheet, KeyboardAvoidingView, Alert, Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  getExercisesBySplit, createSession, createSessionExercise,
  saveSets, getPreviousSets, addExercise, updateExerciseName, deleteExercise, saveExerciseOrder, updateMachineSetting,
} from '../data/database';
import { saveDraft, getDraft, clearDraft } from '../data/workoutDraft';
import { Exercise, ExerciseWithSets, SetEntry, SplitType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

function makeEmptySets(count: number) {
  return Array.from({ length: count }, (_, i) => ({ set_number: i + 1, weight_kg: '', reps: '' }));
}

function progressIcon(current: number, previous: number | undefined): string {
  if (previous === undefined || isNaN(current)) return '';
  if (current > previous) return '↑';
  if (current < previous) return '↓';
  return '=';
}

export default function WorkoutScreen({ route, navigation }: Props) {
  const { splitType } = route.params;
  const [exerciseData, setExerciseData] = useState<ExerciseWithSets[]>([]);
  const [editModal, setEditModal] = useState<{ visible: boolean; exIndex: number; name: string }>({
    visible: false, exIndex: -1, name: '',
  });
  const [addModal, setAddModal] = useState(false);
  const [newExName, setNewExName] = useState('');
  const isFinishing = useRef(false);
  const exerciseDataRef = useRef(exerciseData);
  const settingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function loadExercises() {
    const exercises: Exercise[] = getExercisesBySplit(splitType);
    const fresh = exercises.map(ex => ({
      exercise: ex,
      sets: makeEmptySets(ex.default_sets),
      previousSets: getPreviousSets(ex.id, splitType),
      active: true,
    }));

    const draft = getDraft(splitType);
    if (draft) {
      // Merge draft values into fresh exercise list (exercises may have changed)
      const merged = fresh.map(item => {
        const saved = draft.find(d => d.exercise.id === item.exercise.id);
        return saved ? { ...item, sets: saved.sets, active: saved.active } : item;
      });
      setExerciseData(merged);
    } else {
      setExerciseData(fresh);
    }
  }

  useEffect(() => { loadExercises(); }, [splitType]);

  // Keep ref in sync so the beforeRemove listener always reads current data
  useEffect(() => {
    exerciseDataRef.current = exerciseData;
    if (exerciseData.length > 0) saveDraft(splitType, exerciseData);
  }, [exerciseData]);

  // Register beforeRemove only once – reads data via ref
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isFinishing.current) return;
      const hasData = exerciseDataRef.current.some(
        ex => ex.sets.some(s => s.weight_kg !== '' || s.reps !== '')
      );
      if (!hasData) return;

      e.preventDefault();
      Alert.alert(
        'Leave workout?',
        'Your entries are saved and will be here when you come back.',
        [
          { text: 'Stay', style: 'cancel' },
          {
            text: 'Leave & keep draft',
            onPress: () => {
              saveDraft(splitType, exerciseDataRef.current);
              navigation.dispatch(e.data.action);
            },
          },
          {
            text: 'Discard draft',
            style: 'destructive',
            onPress: () => {
              clearDraft();
              navigation.dispatch(e.data.action);
            },
          },
        ]
      );
    });
    return unsubscribe;
  }, [navigation]);

  function updateSet(exIndex: number, setIndex: number, field: 'weight_kg' | 'reps', value: string) {
    setExerciseData(prev => {
      const next = [...prev];
      next[exIndex] = {
        ...next[exIndex],
        sets: next[exIndex].sets.map((s, i) => i === setIndex ? { ...s, [field]: value } : s),
      };
      return next;
    });
  }

  function addSet(exIndex: number) {
    setExerciseData(prev => {
      const next = [...prev];
      const sets = next[exIndex].sets;
      next[exIndex] = { ...next[exIndex], sets: [...sets, { set_number: sets.length + 1, weight_kg: '', reps: '' }] };
      return next;
    });
  }

  function removeSet(exIndex: number) {
    setExerciseData(prev => {
      const next = [...prev];
      if (next[exIndex].sets.length <= 1) return prev;
      next[exIndex] = { ...next[exIndex], sets: next[exIndex].sets.slice(0, -1) };
      return next;
    });
  }

  function moveExercise(exIndex: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? exIndex - 1 : exIndex + 1;
    if (swapIndex < 0 || swapIndex >= exerciseData.length) return;
    const next = [...exerciseData];
    [next[exIndex], next[swapIndex]] = [next[swapIndex], next[exIndex]];
    setExerciseData(next);
    saveExerciseOrder(next.map(d => d.exercise.id));
  }

  function toggleActive(exIndex: number) {
    setExerciseData(prev => {
      const next = [...prev];
      next[exIndex] = { ...next[exIndex], active: !next[exIndex].active };
      return next;
    });
  }

  function openEditModal(exIndex: number) {
    const ex = exerciseData[exIndex].exercise;
    setEditModal({ visible: true, exIndex, name: ex.name });
  }

  function handleRename() {
    const { exIndex, name } = editModal;
    if (!name.trim()) return;
    updateExerciseName(exerciseData[exIndex].exercise.id, name.trim());
    setEditModal({ visible: false, exIndex: -1, name: '' });
    loadExercises();
  }

  function handleViewProgress() {
    const { exIndex } = editModal;
    const ex = exerciseData[exIndex].exercise;
    setEditModal({ visible: false, exIndex: -1, name: '' });
    navigation.navigate('ExerciseProgress', { exerciseId: ex.id, exerciseName: ex.name });
  }

  function handleDelete() {
    const { exIndex } = editModal;
    Alert.alert('Delete Exercise', `Remove "${exerciseData[exIndex].exercise.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          deleteExercise(exerciseData[exIndex].exercise.id);
          setEditModal({ visible: false, exIndex: -1, name: '' });
          loadExercises();
        },
      },
    ]);
  }

  function handleAddExercise() {
    if (!newExName.trim()) return;
    addExercise(newExName.trim(), splitType as SplitType, 3);
    setNewExName('');
    setAddModal(false);
    loadExercises();
  }

  function finishWorkout() {
    Alert.alert('Finish Workout', 'End this session and save results?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Finish', onPress: saveAndNavigate },
    ]);
  }

  function saveAndNavigate() {
    const summary: { name: string; sets: SetEntry[]; previousSets: SetEntry[] }[] = [];
    const toSave = exerciseData.filter(({ active, sets }) =>
      active && sets.some(s => s.weight_kg !== '' && s.reps !== '')
    );

    if (toSave.length === 0) {
      Alert.alert('No data', 'Enter at least one set before finishing.');
      return;
    }

    let sessionId: number;
    try {
      sessionId = createSession(splitType);
    } catch (e) {
      Alert.alert('Save failed', 'Could not create session: ' + String(e));
      return;
    }

    try {
      for (const { exercise, sets, previousSets } of toSave) {
        const validSets = sets.filter(s => {
          const w = parseFloat(s.weight_kg);
          const r = parseInt(s.reps);
          return s.weight_kg !== '' && s.reps !== '' && !isNaN(w) && !isNaN(r) && w >= 0 && r > 0;
        });
        if (validSets.length === 0) continue;
        const seId = createSessionExercise(sessionId, exercise.id, exercise.name);
        const parsed = validSets.map(s => ({ weight_kg: parseFloat(s.weight_kg), reps: parseInt(s.reps) }));
        saveSets(seId, parsed);
        summary.push({
          name: exercise.name,
          sets: parsed.map((s, i) => ({ id: 0, session_exercise_id: seId, set_number: i + 1, ...s })),
          previousSets,
        });
      }
    } catch (e) {
      Alert.alert('Save failed', 'Could not save sets: ' + String(e));
      return;
    }

    if (summary.length === 0) {
      Alert.alert('No data', 'Enter at least one valid set before finishing.');
      return;
    }

    clearDraft();
    isFinishing.current = true;
    navigation.replace('Summary', { summary });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerText}>{splitType.toUpperCase()} Day</Text>
        <TouchableOpacity style={styles.finishBtn} onPress={finishWorkout}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {exerciseData.map((item, exIndex) => (
          <TouchableWithoutFeedback key={item.exercise.id} onLongPress={() => openEditModal(exIndex)}>
            <View style={[styles.card, !item.active && styles.cardInactive]}>
              <View style={styles.cardTopRow}>
                <TouchableOpacity onPress={() => toggleActive(exIndex)} style={styles.nameTouchable}>
                  <Text style={[styles.exerciseName, !item.active && styles.textInactive]}>
                    {item.exercise.name} {!item.active && '(skipped)'}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.settingInput}
                  value={item.exercise.machine_setting ?? ''}
                  placeholder="setting"
                  placeholderTextColor="#333"
                  onChangeText={v => {
                    setExerciseData(prev => prev.map((d, i) =>
                      i === exIndex ? { ...d, exercise: { ...d.exercise, machine_setting: v } } : d
                    ));
                    if (settingTimerRef.current) clearTimeout(settingTimerRef.current);
                    settingTimerRef.current = setTimeout(
                      () => updateMachineSetting(item.exercise.id, v),
                      600
                    );
                  }}
                />
                <View style={styles.moveButtons}>
                  <TouchableOpacity onPress={() => moveExercise(exIndex, 'up')} style={styles.moveBtn}>
                    <Text style={styles.moveBtnText}>↑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => moveExercise(exIndex, 'down')} style={styles.moveBtn}>
                    <Text style={styles.moveBtnText}>↓</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {item.active && <Text style={styles.longPressHint}>hold to edit</Text>}

              {item.active && <>
                <View style={styles.setHeader}>
                  <Text style={styles.colLabel}>Set</Text>
                  <Text style={styles.colLabel}>kg</Text>
                  <Text style={styles.colLabel}>Reps</Text>
                  <Text style={styles.colLabel}>vs last</Text>
                </View>

                {item.sets.map((set, setIndex) => {
                  const prev: SetEntry | undefined = item.previousSets[setIndex];
                  const wIcon = set.weight_kg !== '' ? progressIcon(parseFloat(set.weight_kg), prev?.weight_kg) : '';
                  const rIcon = set.reps !== '' ? progressIcon(parseInt(set.reps), prev?.reps) : '';
                  const iconColor = wIcon === '↑' || rIcon === '↑' ? '#2ECC71' : wIcon === '↓' || rIcon === '↓' ? '#E74C3C' : '#888';
                  return (
                    <View key={setIndex} style={styles.setRow}>
                      <Text style={styles.setNum}>{setIndex + 1}</Text>
                      <TextInput
                        style={styles.input}
                        placeholder={prev ? String(prev.weight_kg) : '0'}
                        placeholderTextColor="#555"
                        keyboardType="decimal-pad"
                        value={set.weight_kg}
                        onChangeText={v => updateSet(exIndex, setIndex, 'weight_kg', v)}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder={prev ? String(prev.reps) : '0'}
                        placeholderTextColor="#555"
                        keyboardType="number-pad"
                        value={set.reps}
                        onChangeText={v => updateSet(exIndex, setIndex, 'reps', v)}
                      />
                      <Text style={[styles.icon, { color: iconColor }]}>
                        {wIcon || rIcon ? `${wIcon} ${rIcon}`.trim() : prev ? '—' : ''}
                      </Text>
                    </View>
                  );
                })}

                <View style={styles.setActions}>
                  <TouchableOpacity onPress={() => removeSet(exIndex)} style={styles.setBtn}>
                    <Text style={styles.setBtnText}>− Set</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => addSet(exIndex)} style={styles.setBtn}>
                    <Text style={styles.setBtnText}>+ Set</Text>
                  </TouchableOpacity>
                </View>
              </>}
            </View>
          </TouchableWithoutFeedback>
        ))}

        <TouchableOpacity style={styles.addExBtn} onPress={() => setAddModal(true)}>
          <Text style={styles.addExText}>+ Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={editModal.visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Edit Exercise</Text>
            <TextInput
              style={styles.modalInput}
              value={editModal.name}
              onChangeText={name => setEditModal(prev => ({ ...prev, name }))}
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.modalBtn} onPress={handleRename}>
              <Text style={styles.modalBtnText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, styles.progressBtn]} onPress={handleViewProgress}>
              <Text style={styles.modalBtnText}>View Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, styles.deleteBtn]} onPress={handleDelete}>
              <Text style={styles.modalBtnText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModal({ visible: false, exIndex: -1, name: '' })}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={addModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>New Exercise</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Exercise name"
              placeholderTextColor="#555"
              value={newExName}
              onChangeText={setNewExName}
            />
            <TouchableOpacity style={styles.modalBtn} onPress={handleAddExercise}>
              <Text style={styles.modalBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setAddModal(false); setNewExName(''); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, backgroundColor: '#16213E',
  },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  finishBtn: { backgroundColor: '#2ECC71', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  finishText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  scroll: { padding: 16, gap: 16, paddingBottom: 40 },
  card: { backgroundColor: '#16213E', borderRadius: 12, padding: 16 },
  cardInactive: { opacity: 0.4 },
  textInactive: { color: '#888' },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nameTouchable: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  settingInput: {
    backgroundColor: '#0F3460', color: '#AAA', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 4, fontSize: 12, width: 72, textAlign: 'center',
  },
  moveButtons: { flexDirection: 'row', gap: 4 },
  moveBtn: { backgroundColor: '#0F3460', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  moveBtnText: { color: '#888', fontSize: 16 },
  longPressHint: { fontSize: 10, color: '#444', marginBottom: 10, marginTop: 2 },
  setHeader: { flexDirection: 'row', marginBottom: 6 },
  colLabel: { flex: 1, color: '#888', fontSize: 12, textAlign: 'center' },
  setRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  setNum: { flex: 1, color: '#888', textAlign: 'center' },
  input: {
    flex: 1, backgroundColor: '#0F3460', color: '#FFF', borderRadius: 6,
    textAlign: 'center', paddingVertical: 6, marginHorizontal: 4, fontSize: 16,
  },
  icon: { flex: 1, textAlign: 'center', fontSize: 14 },
  setActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  setBtn: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: '#0F3460', borderRadius: 6 },
  setBtnText: { color: '#AAA', fontSize: 14 },
  addExBtn: {
    borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 16,
    alignItems: 'center', borderStyle: 'dashed',
  },
  addExText: { color: '#555', fontSize: 15 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' },
  modal: { backgroundColor: '#16213E', borderRadius: 16, padding: 24, width: '80%', gap: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  modalInput: {
    backgroundColor: '#0F3460', color: '#FFF', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },
  modalBtn: { backgroundColor: '#3498DB', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  progressBtn: { backgroundColor: '#8E44AD' },
  deleteBtn: { backgroundColor: '#E74C3C' },
  modalBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  cancelText: { color: '#888', textAlign: 'center', marginTop: 4 },
});
