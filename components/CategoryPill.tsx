// components/CategoryPill.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  category: string;
};

export default function CategoryPill({ category }: Props) {
  const { mode, colors } = useTheme();
  const isDark = mode === 'dark';

  // One color per known category. Falls back to neutral for unknown ones.
  const categoryColors: Record<
    string,
    { bg: string; text: string }
  > = isDark
    ? {
        Vegetables: { bg: '#052E16', text: '#4ADE80' },
        Fruits: { bg: '#422006', text: '#FCD34D' },
        Grains: { bg: '#3F2D08', text: '#FDE68A' },
        Dairy: { bg: '#082F49', text: '#38BDF8' },
        Meat: { bg: '#450A0A', text: '#F87171' },
        Spices: { bg: '#3B0764', text: '#C4B5FD' },
      }
    : {
        Vegetables: { bg: '#DCFCE7', text: '#166534' },
        Fruits: { bg: '#FEF3C7', text: '#92400E' },
        Grains: { bg: '#FEF9C3', text: '#854D0E' },
        Dairy: { bg: '#E0F2FE', text: '#075985' },
        Meat: { bg: '#FEE2E2', text: '#991B1B' },
        Spices: { bg: '#F3E8FF', text: '#6B21A8' },
      };

  const palette =
    categoryColors[category] ?? {
      bg: colors.accentSoft,
      text: colors.iconPrimary,
    };

  return (
    <View style={[styles.pill, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.text }]}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});