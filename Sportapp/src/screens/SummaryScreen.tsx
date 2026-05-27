import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Summary'>;

export default function SummaryScreen({ route, navigation }: Props) {
  const { summary } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Done 💪</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {summary.map((item, i) => {
          const volume = item.sets.reduce((sum, s) => sum + s.weight_kg * s.reps, 0);
          const prevVolume = item.previousSets.reduce((sum, s) => sum + s.weight_kg * s.reps, 0);
          const diff = prevVolume > 0 ? volume - prevVolume : null;

          return (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.exName}>{item.name}</Text>
                {diff !== null && (
                  <Text style={[styles.volumeDiff, { color: diff >= 0 ? '#2ECC71' : '#E74C3C' }]}>
                    {diff >= 0 ? '+' : ''}{diff.toFixed(0)} kg vol
                  </Text>
                )}
              </View>
              {item.sets.map((set, si) => {
                const prev = item.previousSets[si];
                return (
                  <View key={si} style={styles.setRow}>
                    <Text style={styles.setNum}>Set {set.set_number}</Text>
                    <Text style={styles.setValue}>{set.weight_kg} kg × {set.reps}</Text>
                    {prev ? (
                      <Text style={styles.prevValue}>prev: {prev.weight_kg} kg × {prev.reps}</Text>
                    ) : (
                      <Text style={styles.prevValue}>first time</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, backgroundColor: '#16213E' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  scroll: { padding: 16, gap: 12 },
  card: { backgroundColor: '#16213E', borderRadius: 12, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  exName: { fontSize: 15, fontWeight: 'bold', color: '#FFF', flex: 1 },
  volumeDiff: { fontSize: 14, fontWeight: 'bold' },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  setNum: { color: '#888', width: 40, fontSize: 13 },
  setValue: { color: '#FFF', fontSize: 14, flex: 1 },
  prevValue: { color: '#555', fontSize: 12 },
  homeBtn: {
    margin: 20, backgroundColor: '#3498DB', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  homeBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
