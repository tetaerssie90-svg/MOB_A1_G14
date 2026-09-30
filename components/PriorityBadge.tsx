// components/PriorityBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MarketPriority } from '../Types';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  priority: MarketPriority;
};

const labelMap: Record<MarketPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function PriorityBadge({ priority }: Props) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const colorMap: Record<
    MarketPriority,
    { bg: string; text: string; icon: any }
  > = isDark
    ? {
        high: { bg: '#450A0A', text: '#F87171', icon: 'alert-circle' },
        medium: { bg: '#422006', text: '#FCD34D', icon: 'alert-outline' },
        low: { bg: '#082F49', text: '#38BDF8', icon: 'information-outline' },
      }
    : {
        high: { bg: '#FEE2E2', text: '#991B1B', icon: 'alert-circle' },
        medium: { bg: '#FEF3C7', text: '#92400E', icon: 'alert-outline' },
        low: { bg: '#E0F2FE', text: '#075985', icon: 'information-outline' },
      };

  const colors = colorMap[priority];
  const label = labelMap[priority];

  return (
    <View
      style={[styles.badge, { backgroundColor: colors.bg }]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`Priority: ${label}`}
    >
      <MaterialCommunityIcons
        name={colors.icon}
        size={12}
        color={colors.text}
      />
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});