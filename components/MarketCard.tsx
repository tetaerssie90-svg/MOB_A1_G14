
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Market } from '../Types';
import { useTheme } from '../theme/ThemeContext';
import StatusChip from './StatusChip';
import PriorityBadge from './PriorityBadge';
import CategoryPill from './CategoryPill';

type Props = {
  market: Market;
  onPress?: (market: Market) => void;
};

export default function MarketCard({ market, onPress }: Props) {
  const { colors } = useTheme();

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
      onPress={onPress ? () => onPress(market) : undefined}
    >
      <View style={styles.imageWrap}>
        <Image source={market.imageSource} style={styles.image} />
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.name, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {market.name}
        </Text>
        <View style={styles.metaRow}>
            <Text
              style={[styles.meta, { color: colors.textMuted }]}
              numberOfLines={1}
            >
              {market.stallCode}
            </Text>
            <CategoryPill category={market.category} />
          </View>

        <View style={styles.chipRow}>
          <StatusChip status={market.status} />
          <PriorityBadge priority={market.priority} />
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={colors.iconMuted}
        style={styles.chevron}
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
  imageWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    flexShrink: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    fontSize: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chevron: {
    marginLeft: 4,
  },
  metaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
},
}
);
