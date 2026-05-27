import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { initDB } from './src/data/database';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
