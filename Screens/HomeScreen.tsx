// Screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList, Market } from '../Types';
import { markets } from '../Data/MarketData';
import MarketCard from '../components/MarketCard';
import EmptyState from '../components/EmptyState';
import GroupCodeBanner from '../components/GroupCodeBanner';
import SettingsMenu from '../components/SettingsMenu';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const hasMarkets = markets.length > 0;
  const insets = useSafeAreaInsets();

  const handleMarketPress = (market: Market) => {
    navigation.navigate('NewInspection', { stallCode: market.stallCode });
  };

  return (
    <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.titlePrimary }]}>
            Market Catalog
          </Text>
          <SettingsMenu />
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Assigned zones and stalls for today’s pilot
        </Text>
        <View style={styles.bannerWrap}>
          <GroupCodeBanner />
        </View>
      </View>

      {hasMarkets ? (
        <View style={styles.listContainer}>
          <FlatList<Market>
            data={markets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MarketCard market={item} onPress={handleMarketPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <EmptyState
          title="No markets assigned"
          message="You have no stalls to inspect right now."
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  subtitle: { fontSize: 13, marginTop: 4 },
  bannerWrap: { marginTop: 10 },
  listContainer: { flex: 1, paddingHorizontal: 16 },
});