
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getGroupCode } from '../config/groupInfo';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  compact?: boolean;
};

export default function GroupCodeBanner({ compact = false }: Props) {
  const { colors } = useTheme();
  const code = getGroupCode();

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.accentSoft,
          borderColor: colors.accent,
        },
        compact && styles.bannerCompact,
      ]}
    >
      <MaterialCommunityIcons
        name="shield-check-outline"
        size={compact ? 14 : 16}
        color={colors.iconPrimary}
      />
      <Text
        style={[
          styles.label,
          { color: colors.iconPrimary },
          compact && styles.labelCompact,
        ]}
      >
        Group Code
      </Text>
      <Text
        style={[
          styles.code,
          { color: colors.iconPrimary },
          compact && styles.codeCompact,
        ]}
      >
        {code}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  bannerCompact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  label: { fontSize: 12, fontWeight: '600' },
  labelCompact: { fontSize: 11 },
  code: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  codeCompact: { fontSize: 11 },
});