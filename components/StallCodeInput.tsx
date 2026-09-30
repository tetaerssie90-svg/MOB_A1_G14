// Components/StallCodeInput.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export type Zone = 'A' | 'B' | 'C';

type Props = {
  value: string;
  onChangeText: (code: string) => void;
  onZoneChange?: (zone: Zone) => void;
  error?: string;
};

const ZONES: Zone[] = ['A', 'B', 'C'];

function parseCode(value: string): { zone: Zone | null; digits: string } {
  const match = value.match(/^MSN-([A-C])-(\d{0,3})$/);
  if (!match) return { zone: null, digits: '' };
  return { zone: match[1] as Zone, digits: match[2] };
}

export default function StallCodeInput({
  value,
  onChangeText,
  onZoneChange,
  error,
}: Props) {
  const { colors, mode } = useTheme();
  const parsed = parseCode(value);
  const [zone, setZone] = useState<Zone | null>(parsed.zone);
  const [digits, setDigits] = useState(parsed.digits);

  useEffect(() => {
    if (!zone) return;
    const padded = digits.padStart(3, '0').slice(0, 3);
    onChangeText(`MSN-${zone}-${padded}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone, digits]);

  function handleZonePress(next: Zone) {
    setZone(next);
    onZoneChange?.(next);
  }

  function handleDigitsChange(text: string) {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 3);
    setDigits(cleaned);
  }

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Stall code
      </Text>

      <View style={styles.row}>
        <View
          style={[
            styles.prefixBox,
            { backgroundColor: colors.accentSoft },
          ]}
        >
          <Text style={[styles.prefixText, { color: colors.iconPrimary }]}>
            MSN -
          </Text>
        </View>

        <View style={styles.zoneRow}>
          {ZONES.map((z) => {
            const selected = zone === z;
            return (
              <Pressable
                key={z}
                onPress={() => handleZonePress(z)}
                style={[
                  styles.zoneChip,
                  {
                    borderColor: colors.cardBorder,
                    backgroundColor: selected
                      ? colors.chipSelected
                      : colors.chipBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.zoneText,
                    {
                      color: selected ? '#FFFFFF' : colors.textPrimary,
                    },
                  ]}
                >
                  {z}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.dash, { color: colors.textMuted }]}>-</Text>

        <TextInput
          style={[
            styles.digitsInput,
            {
              borderColor: colors.cardBorder,
              backgroundColor: colors.cardBackground,
              color: colors.textPrimary,
            },
          ]}
          value={digits}
          onChangeText={handleDigitsChange}
          keyboardType="number-pad"
          placeholder="014"
          placeholderTextColor={mode === 'dark' ? '#6B7280' : '#9CA3AF'}
          maxLength={3}
        />
      </View>

      <Text style={[styles.preview, { color: colors.textMuted }]}>
        Preview:{' '}
        {zone
          ? `MSN-${zone}-${digits.padStart(3, '0').slice(0, 3)}`
          : 'Select a zone'}
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  prefixBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  prefixText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },
  zoneRow: { flexDirection: 'row', gap: 4 },
  zoneChip: {
    width: 34,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneText: { fontSize: 14, fontWeight: '700' },
  dash: { fontSize: 18, fontWeight: '700', marginHorizontal: 2 },
  digitsInput: {
    width: 70,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  preview: { fontSize: 11, marginTop: 6 },
  error: { color: '#DC2626', fontSize: 12, marginTop: 4 },
});