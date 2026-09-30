
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'phone-pad';
};

export default function InputField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = 'default',
}: Props) {
  const { colors, mode } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? '#DC2626' : colors.cardBorder,
            backgroundColor: colors.cardBackground,
            color: colors.textPrimary,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={mode === 'dark' ? '#6B7280' : '#9CA3AF'}
        keyboardType={keyboardType}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  error: { color: '#DC2626', fontSize: 12 },
});