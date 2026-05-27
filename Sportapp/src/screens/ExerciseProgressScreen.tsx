import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getExerciseProgress } from '../data/database';

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseProgress'>;

const BAR_MAX_HEIGHT = 120;

export default function ExerciseProgressScreen({ route, navigation }: Props) {
  const { exerciseId, exerciseName } = route.params;
  const data = getExerciseProgress(exerciseId);

  const maxWeight = Math.max(...data.map(d => d.best_weight), 1);
  const first = data[0];
  const last = data[data.length - 1];
  const diff = data.length >= 2 ? last.best_weight - first.best_weight : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{exerciseName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {diff !== null && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Progress (first → latest)</Text>
            <Text style={[styles.summaryValue, { color: diff >= 0 ? '#2ECC71' : '#E74C3C' }]}>
              {diff >= 0 ? '+' : ''}{diff.toFixed(1)} kg
            </Text>
            <Text style={styles.summaryDetail}>
              {first.best_weight} kg → {last.best_weight} kg
            </Text>
          </View>
        )}

        {data.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No data yet</Text>
          </View>
        ) : (
          <View style={styles.chartCard}>
            <Text style={styles.chartLabel}>Best weight per session (kg)</Text>
            <View style={styles.chartBars}>
              {data.map((d, i) => {
                const barH = (d.best_weight / maxWeight) * BAR_MAX_HEIGHT;
                const isFirst = i === 0;
                const isLast = i === data.length - 1;
                const color = isFirst ? '#888' : isLast ? '#2ECC71' : '#3498DB';
                return (
                  <View key={i} style={styles.barWrapper}>
                    <Text style={styles.barValue}>{d.best_weight}</Text>
                    <View style={[styles.bar, { height: Math.max(barH, 4), backgroundColor: color }]} />
                    <Text style={styles.barDate}>{d.date.slice(5)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.tableCard}>
          <Text style={styles.chartLabel}>All sessions</Text>
          {data.map((d, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableDate}>{d.date}</Text>
              <Text style={styles.tableWeight}>{d.best_weight} kg</Text>
              <Text style={styles.tableReps}>× {d.best_reps} reps</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
    backgroundColor: '#16213E',
  },
  back: { color: '#3498DB', fontSize: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF', flex: 1 },
  scroll: { padding: 16, gap: 16 },
  summaryCard: { backgroundColor: '#16213E', borderRadius: 12, padding: 20, alignItems: 'center' },
  summaryLabel: { color: '#888', fontSize: 13, marginBottom: 8 },
  summaryValue: { fontSize: 36, fontWeight: 'bold' },
  summaryDetail: { color: '#555', fontSize: 13, marginTop: 4 },
  chartCard: { backgroundColor: '#16213E', borderRadius: 12, padding: 16 },
  chartLabel: { color: '#888', fontSize: 13, marginBottom: 12 },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: BAR_MAX_HEIGHT + 40 },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  barValue: { color: '#AAA', fontSize: 9, marginBottom: 2 },
  bar: { width: '100%', borderRadius: 3 },
  barDate: { color: '#555', fontSize: 9, marginTop: 4 },
  tableCard: { backgroundColor: '#16213E', borderRadius: 12, padding: 16 },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1A1A2E' },
  tableDate: { color: '#888', fontSize: 14, flex: 1 },
  tableWeight: { color: '#FFF', fontSize: 14, fontWeight: 'bold', width: 70, textAlign: 'right' },
  tableReps: { color: '#888', fontSize: 14, width: 70, textAlign: 'right' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#555', fontSize: 16 },
});
