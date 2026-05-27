import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SetEntry } from '../types';
import SplitSelectScreen from '../screens/SplitSelectScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import SummaryScreen from '../screens/SummaryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ExerciseProgressScreen from '../screens/ExerciseProgressScreen';

export type RootStackParamList = {
  SplitSelect: undefined;
  Workout: { splitType: 'push' | 'pull' | 'leg' };
  Summary: {
    summary: {
      name: string;
      sets: SetEntry[];
      previousSets: SetEntry[];
    }[];
  };
  History: undefined;
  ExerciseProgress: { exerciseId: number; exerciseName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplitSelect" component={SplitSelectScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="ExerciseProgress" component={ExerciseProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
