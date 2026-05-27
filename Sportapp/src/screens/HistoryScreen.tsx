import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getAllSessions, getVolumeHistory, deleteSession, exportAllData } from '../data/database';
import { SplitType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

const SPLIT_COLOR: Record<string, string> = {
  push: '#E74C3C',
  pull: '#3498DB',
  leg: '#2ECC71',
};

const SPLITS: SplitType[] = ['push', 'pull', 'leg'];
const CHART_WIDTH = Dimensions.get('window').width - 64;

function VolumeChart({ splitType }: { splitType: SplitType }) {
  const data = getVolumeHistory(splitType);
  if (data.length === 0) return null;

  const max = Math.max(...data.map(d => d.volume));
  const color = SPLIT_COLOR[splitType];

  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>{splitType.toUpperCase()} – Volume (kg)</Text>
      <View style={styles.chartBars}>
        {data.map((d, i) => {
          const barHeight = max > 0 ? (d.volume / max) * 80 : 4;
          return (
            <View key={i} style={styles.barWrapper}>
              <Text style={styles.barValue}>{Math.round(d.volume)}</Text>
              <View style={[styles.bar, { height: barHeight, backgroundColor: color }]} />
              <Text style={styles.barDate}>{d.date.slice(5)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function HistoryScreen({ navigation }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);

  function loadSessions() {
    setSessions(getAllSessions());
  }

  async function handleExport() {
    try {
      const data = exportAllData();
      if (data.length === 0) { Alert.alert('No data', 'No sessions to export yet.'); return; }
      const json = JSON.stringify({ exported: new Date().toISOString(), sessions: data }, null, 2);
      const path = FileSystem.documentDirectory + 'fittrack_export.json';
      await FileSystem.writeAsStringAsync(path, json, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(path, { mimeType: 'application/json', dialogTitle: 'Export FitTrack data' });
    } catch (e) {
      Alert.alert('Export failed', String(e));
    }
  }

  useEffect(() => { loadSessions(); }, []);

  function handleDelete(item: any) {
    Alert.alert(
      'Delete Session',
      `Delete ${item.split_type.toUpperCase()} session from ${item.date}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: () => {
            deleteSession(item.id);
            loadSessions();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity onPress={handleExport} style={styles.exportBtn}>
          <Text style={styles.exportText}>↑ Export</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {SPLITS.map(split => <VolumeChart key={split} splitType={split} />)}
            {sessions.length > 0 && <Text style={styles.sectionLabel}>Sessions</Text>}
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No workouts yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.tag, { backgroundColor: SPLIT_COLOR[item.split_type] }]}>
              <Text style={styles.tagText}>{item.split_type.toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.count}>{item.exercise_count} exercises</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  list: { padding: 16, gap: 12 },
  chartCard: { backgroundColor: '#16213E', borderRadius: 12, padding: 16, marginBottom: 4 },
  chartTitle: { color: '#AAA', fontSize: 13, marginBottom: 12 },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 110 },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  barValue: { color: '#888', fontSize: 9, marginBottom: 2 },
  bar: { width: '100%', borderRadius: 3, minHeight: 4 },
  barDate: { color: '#555', fontSize: 9, marginTop: 4 },
  sectionLabel: { color: '#555', fontSize: 12, marginTop: 8, marginBottom: 4 },
  card: { backgroundColor: '#16213E', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 },
  tag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  tagText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  info: { flex: 1 },
  date: { color: '#FFF', fontSize: 15 },
  count: { color: '#888', fontSize: 13 },
  exportBtn: { marginLeft: 'auto' },
  exportText: { color: '#3498DB', fontSize: 14 },
  deleteBtn: { padding: 8 },
  deleteText: { fontSize: 18 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  emptyText: { color: '#555', fontSize: 16 },
});
