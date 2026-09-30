
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      {message ? (
        <Text style={[styles.message, { color: colors.textMuted }]}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={onAction}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});