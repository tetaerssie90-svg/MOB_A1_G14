// Components/StatusChip.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MarketStatus } from '../Types';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  status: MarketStatus;
};

const labelMap: Record<MarketStatus, string> = {
  open: 'Open',
  'needs-attention': 'Needs Attention',
  closed: 'Closed',
};

export default function StatusChip({ status }: Props) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // Semantic colors — adjusted for dark mode contrast
  const colorMap: Record<
    MarketStatus,
    { bg: string; text: string; dot: string }
  > = isDark
    ? {
        open: { bg: '#052E16', text: '#4ADE80', dot: '#22C55E' },
        'needs-attention': { bg: '#422006', text: '#FCD34D', dot: '#F59E0B' },
        closed: { bg: '#450A0A', text: '#F87171', dot: '#EF4444' },
      }
    : {
        open: { bg: '#DCFCE7', text: '#166534', dot: '#16A34A' },
        'needs-attention': { bg: '#FEF9C3', text: '#854D0E', dot: '#CA8A04' },
        closed: { bg: '#FEE2E2', text: '#991B1B', dot: '#DC2626' },
      };

  const colors = colorMap[status];

  return (
    <View style={[styles.chip, { backgroundColor: colors.bg }]}>
      <View style={[styles.dot, { backgroundColor: colors.dot }]} />
      <Text style={[styles.text, { color: colors.text }]}>
        {labelMap[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});