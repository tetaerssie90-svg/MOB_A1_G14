// Screens/InspectionDetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordsStackParamList } from '../Types';
import { savedInspections } from '../Data/inspectionStore';
import GroupCodeBanner from '../components/GroupCodeBanner';
import { useTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RecordsStackParamList, 'InspectionDetails'>;

export default function InspectionDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const { inspectionId } = route.params;
  const inspection = savedInspections.find((i) => i.id === inspectionId);

  if (!inspection) {
    return (
      <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="file-question-outline"
            size={48}
            color={colors.iconMuted}
          />
          <Text style={[styles.missingTitle, { color: colors.textPrimary }]}>
            Inspection not found
          </Text>
          <Text style={[styles.missingText, { color: colors.textMuted }]}>
            This record may have been removed or the session was reset.
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.titlePrimary }]}>
          Inspection Details
        </Text>
        <View style={styles.bannerWrap}>
          <GroupCodeBanner compact />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Vendor & stall
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <Row label="Vendor alias" value={inspection.vendorAlias} />
          <Row label="Stall code" value={inspection.stallCode} />
          <Row label="Category" value={inspection.category} last />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Inspection
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <Row label="Contact number" value={inspection.contactNumber} />
          <Row
            label="Risk level"
            value={
              inspection.riskLevel.charAt(0).toUpperCase() +
              inspection.riskLevel.slice(1)
            }
          />
          <Row
            label="Consent"
            value={inspection.consent ? 'Confirmed' : 'Not confirmed'}
          />
          <Row
            label="Recorded at"
            value={new Date(inspection.createdAt).toLocaleString()}
            last
          />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Evidence image
        </Text>
        {inspection.evidenceImageUri ? (
          <Image
            source={{ uri: inspection.evidenceImageUri }}
            style={styles.evidence}
          />
        ) : (
          <View
            style={[
              styles.emptyEvidence,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="image-off-outline"
              size={28}
              color={colors.iconMuted}
            />
            <Text
              style={[styles.evidenceText, { color: colors.textMuted }]}
            >
              No evidence image was attached to this inspection.
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.row,
        { borderBottomColor: colors.cardBorder },
        last && styles.rowLast,
      ]}
    >
      <Text style={[styles.rowLabel, { color: colors.textMuted }]}>
        {label}
      </Text>
      <Text style={[styles.rowValue, { color: colors.textPrimary }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  missingTitle: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  missingText: { fontSize: 13, textAlign: 'center' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 10 },
  bannerWrap: { marginBottom: 16 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 8,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontSize: 12, flexShrink: 0 },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  evidence: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
  emptyEvidence: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  evidenceText: { fontSize: 12, textAlign: 'center', maxWidth: 260 },
});