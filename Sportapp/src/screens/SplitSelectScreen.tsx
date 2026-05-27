import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getLastSplitType } from '../data/database';
import { SplitType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SplitSelect'>;

const SPLITS: { label: string; type: SplitType; color: string }[] = [
  { label: 'Push', type: 'push', color: '#E74C3C' },
  { label: 'Pull', type: 'pull', color: '#3498DB' },
  { label: 'Leg',  type: 'leg',  color: '#2ECC71' },
];

const PPL_NEXT: Record<SplitType, SplitType> = {
  leg:  'push',
  push: 'pull',
  pull: 'leg',
};

export default function SplitSelectScreen({ navigation }: Props) {
  const [nextSplit, setNextSplit] = useState<SplitType | null>(null);

  useFocusEffect(useCallback(() => {
    const last = getLastSplitType();
    setNextSplit(last ? PPL_NEXT[last] : 'leg');
  }, []));

  const nextInfo = SPLITS.find(s => s.type === nextSplit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitTrack</Text>

      {nextInfo && (
        <View style={[styles.nextBadge, { borderColor: nextInfo.color }]}>
          <Text style={styles.nextLabel}>Next up</Text>
          <Text style={[styles.nextValue, { color: nextInfo.color }]}>{nextInfo.label}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {SPLITS.map(split => (
          <TouchableOpacity
            key={split.type}
            style={[
              styles.button,
              { backgroundColor: split.color },
              split.type === nextSplit && styles.buttonHighlight,
            ]}
            onPress={() => navigation.navigate('Workout', { splitType: split.type })}
          >
            <Text style={styles.buttonText}>{split.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.historyLink} onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 24 },
  nextBadge: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 10,
    alignItems: 'center', marginBottom: 40,
  },
  nextLabel: { color: '#888', fontSize: 12, marginBottom: 2 },
  nextValue: { fontSize: 22, fontWeight: 'bold' },
  buttonContainer: { width: '80%', gap: 20 },
  button: {
    paddingVertical: 24, borderRadius: 16, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonHighlight: { elevation: 12, shadowOpacity: 0.5 },
  buttonText: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  historyLink: { marginTop: 50 },
  historyText: { color: '#8888AA', fontSize: 14 },
});
