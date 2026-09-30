// Navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../Screens/HomeScreen';
import NewInspectionScreen from '../Screens/NewInspectionScreen';
import RecordScreen from '../Screens/RecordScreen';
import InspectionDetailScreen from '../Screens/InspectionDetailScreen';

import { RootTabParamList, RecordsStackParamList } from '../Types';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator<RootTabParamList>();
const RecordsStack = createNativeStackNavigator<RecordsStackParamList>();

function RecordsStackNavigator() {
  const { colors } = useTheme();
  return (
    <RecordsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cardBackground },
        headerTintColor: colors.titlePrimary,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <RecordsStack.Screen
        name="RecordsList"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
      <RecordsStack.Screen
        name="InspectionDetails"
        component={InspectionDetailScreen}
        options={{ title: 'Inspection Details' }}
      />
    </RecordsStack.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.iconMuted,
          tabBarStyle: {
            backgroundColor: colors.cardBackground,
            borderTopColor: colors.cardBorder,
            // 60 for the tab content + insets.bottom for the system nav bar
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom + 6,
            paddingTop: 6,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="storefront-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="NewInspection"
          component={NewInspectionScreen}
          options={{
            tabBarLabel: 'New Inspection',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="clipboard-plus-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Records"
          component={RecordsStackNavigator}
          options={{
            tabBarLabel: 'Records',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="file-document-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}