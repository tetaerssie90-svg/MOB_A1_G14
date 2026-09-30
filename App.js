// App.js
import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { ThemeProvider } from './theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}