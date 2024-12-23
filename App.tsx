import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRoutes from './src/routes/app.routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AppRoutes />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
