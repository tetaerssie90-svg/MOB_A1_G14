// Screens/RecordScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RecordsStackParamList, Inspection } from '../Types';
import { savedInspections } from '../Data/inspectionStore';
import RecordCard from '../components/RecordCard';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RecordsStackParamList, 'RecordsList'>;

export default function RecordScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [inspections, setInspections] = useState<Inspection[]>([
    ...savedInspections,
  ]);

  useFocusEffect(
    useCallback(() => {
      setInspections([...savedInspections]);
    }, [])
  );

  const hasRecords = inspections.length > 0;

  if (!hasRecords) {
    return (
      <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.titlePrimary }]}>
            Records
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Saved inspections from this session
          </Text>
        </View>
        <EmptyState
          title="No inspections yet"
          message="Save a new inspection from the New Inspection tab to see it here."
        />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.titlePrimary }]}>
          Records
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {inspections.length} saved inspection
          {inspections.length === 1 ? '' : 's'}
        </Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList<Inspection>
          data={inspections}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecordCard
              inspection={item}
              onPress={(inspection) =>
                navigation.navigate('InspectionDetails', {
                  inspectionId: inspection.id,
                })
              }
            />
          )}
        />
      </View>
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
  title: { fontSize: 24, fontWeight: '800', letterSpacing: 0.3 },
  subtitle: { fontSize: 13, marginTop: 4 },
  listContainer: { flex: 1, paddingHorizontal: 16 },
});