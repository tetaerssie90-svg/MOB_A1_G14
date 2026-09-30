
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Inspection } from '../Types';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  inspection: Inspection;
  onPress: (inspection: Inspection) => void;
};

export default function RecordCard({ inspection, onPress }: Props) {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  const riskColorMap: Record<
    Inspection['riskLevel'],
    { bg: string; text: string }
  > = isDark
    ? {
        low: { bg: '#082F49', text: '#38BDF8' },
        medium: { bg: '#422006', text: '#FCD34D' },
        high: { bg: '#450A0A', text: '#F87171' },
      }
    : {
        low: { bg: '#E0F2FE', text: '#075985' },
        medium: { bg: '#FEF3C7', text: '#92400E' },
        high: { bg: '#FEE2E2', text: '#991B1B' },
      };

  const risk = riskColorMap[inspection.riskLevel];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadowColor,
        },
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(inspection)}
    >
      <View
        style={[styles.iconBox, { backgroundColor: colors.accentSoft }]}
      >
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={22}
          color={colors.iconPrimary}
        />
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.name, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {inspection.vendorAlias}
        </Text>
        <Text
          style={[styles.meta, { color: colors.textMuted }]}
          numberOfLines={1}
        >
          {inspection.stallCode} · {inspection.category}
        </Text>
        <Text
          style={[styles.date, { color: colors.textMuted }]}
          numberOfLines={1}
        >
          {new Date(inspection.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={[styles.riskBadge, { backgroundColor: risk.bg }]}>
        <Text style={[styles.riskText, { color: risk.text }]}>
          {inspection.riskLevel.toUpperCase()}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={colors.iconMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, flexShrink: 1, gap: 3 },
  name: { fontSize: 15, fontWeight: '700' },
  meta: { fontSize: 12 },
  date: { fontSize: 11 },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  riskText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
});