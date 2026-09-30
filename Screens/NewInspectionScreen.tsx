// Screens/NewInspectionScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList, Inspection } from '../Types';
import InputField from '../components/InputField';
import StallCodeInput, { Zone } from '../components/StallCodeInput';
import GroupCodeBanner from '../components/GroupCodeBanner';
import { savedInspections } from '../Data/inspectionStore';
import { useTheme } from '../theme/ThemeContext';

type Props = BottomTabScreenProps<RootTabParamList, 'NewInspection'>;

const ZONE_CATEGORIES: Record<Zone, string[]> = {
  A: ['Vegetables', 'Fruits'],
  B: ['Grains', 'Dairy'],
  C: ['Meat', 'Spices'],
};

const RISK_LEVELS = ['low', 'medium', 'high'] as const;
type RiskLevel = typeof RISK_LEVELS[number];

const STALL_CODE_REGEX = /^MSN-[A-C]-\d{3}$/;

function isValidRwandaPhone(input: string): boolean {
  const cleaned = input.replace(/\s/g, '');
  return /^(?:\+?250|0)7[2389]\d{7}$/.test(cleaned);
}

type Step = 'form' | 'review';

export default function NewInspectionScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const initialStallCode = route.params?.stallCode ?? '';

  const [step, setStep] = useState<Step>('form');
  const [vendorAlias, setVendorAlias] = useState('');
  const [stallCode, setStallCode] = useState(initialStallCode);
  const [zone, setZone] = useState<Zone | null>(null);
  const [category, setCategory] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel | ''>('');
  const [consent, setConsent] = useState(false);
  const [evidenceUri, setEvidenceUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleCategories = zone ? ZONE_CATEGORIES[zone] : [];

  function handleZoneChange(next: Zone) {
    setZone(next);
    const allowed = ZONE_CATEGORIES[next];
    if (!allowed.includes(category)) setCategory(allowed[0]);
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (vendorAlias.trim().length < 2)
      next.vendorAlias = 'Vendor alias must be at least 2 characters.';
    if (!STALL_CODE_REGEX.test(stallCode.trim().toUpperCase()))
      next.stallCode = 'Please select a zone and 3-digit number.';
    if (!category) next.category = 'Please select a category.';
    if (!isValidRwandaPhone(contactNumber))
      next.contactNumber = 'Use 07XXXXXXXX or +2507XXXXXXXX.';
    if (!riskLevel) next.riskLevel = 'Please select a risk level.';
    if (!consent) next.consent = 'You must confirm consent before saving.';
    return next;
  }

  function handleContinue() {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) setStep('review');
  }

  async function pickFromGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow gallery access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setEvidenceUri(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setEvidenceUri(result.assets[0].uri);
    }
  }

  function resetForm() {
    setVendorAlias('');
    setStallCode('');
    setZone(null);
    setCategory('');
    setContactNumber('');
    setRiskLevel('');
    setConsent(false);
    setEvidenceUri(null);
    setErrors({});
    setStep('form');
  }

  function handleSave() {
    const inspection: Inspection = {
      id: `i${Date.now()}`,
      vendorAlias: vendorAlias.trim(),
      stallCode: stallCode.trim().toUpperCase(),
      category,
      contactNumber: contactNumber.trim(),
      riskLevel: riskLevel as RiskLevel,
      consent: true,
      evidenceImageUri: evidenceUri ?? undefined,
      createdAt: new Date().toISOString(),
    };
    savedInspections.push(inspection);
    resetForm();
    navigation.navigate('Records');
  }

  if (step === 'form') {
    return (
      <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.title, { color: colors.titlePrimary }]}>
            New Inspection
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Step 1 of 2 — Enter vendor and stall details.
          </Text>

          <InputField
            label="Vendor alias"
            value={vendorAlias}
            onChangeText={setVendorAlias}
            error={errors.vendorAlias}
            placeholder="e.g. Mama Uwase"
          />

          <StallCodeInput
            value={stallCode}
            onChangeText={setStallCode}
            onZoneChange={handleZoneChange}
            error={errors.stallCode}
          />

          <Text
            style={[styles.groupLabel, { color: colors.textSecondary }]}
          >
            Category
          </Text>
          {zone ? (
            <View style={styles.chipRow}>
              {visibleCategories.map((c) => {
                const selected = category === c;
                return (
                  <Pressable
                    key={c}
                    onPress={() => setCategory(c)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: selected
                          ? colors.chipSelected
                          : colors.chipBackground,
                        borderColor: selected
                          ? colors.chipSelected
                          : colors.chipBorder,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        {
                          color: selected ? '#FFFFFF' : colors.textPrimary,
                        },
                      ]}
                    >
                      {c}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <Text style={[styles.hint, { color: colors.textMuted }]}>
              Select a zone above to see available categories.
            </Text>
          )}
          {errors.category ? (
            <Text style={styles.error}>{errors.category}</Text>
          ) : null}

          <View style={styles.spacer} />

          <InputField
            label="Contact number"
            value={contactNumber}
            onChangeText={setContactNumber}
            error={errors.contactNumber}
            placeholder="0788123456"
            keyboardType="phone-pad"
          />

          <Text
            style={[styles.groupLabel, { color: colors.textSecondary }]}
          >
            Risk level
          </Text>
          <View style={styles.chipRow}>
            {RISK_LEVELS.map((r) => {
              const selected = riskLevel === r;
              return (
                <Pressable
                  key={r}
                  onPress={() => setRiskLevel(r)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected
                        ? colors.chipSelected
                        : colors.chipBackground,
                      borderColor: selected
                        ? colors.chipSelected
                        : colors.chipBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: selected ? '#FFFFFF' : colors.textPrimary,
                      },
                    ]}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.riskLevel ? (
            <Text style={styles.error}>{errors.riskLevel}</Text>
          ) : null}

          <View style={styles.spacer} />

          <Pressable
            style={styles.consentRow}
            onPress={() => setConsent((prev) => !prev)}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: consent ? colors.accent : colors.chipBorder,
                  backgroundColor: consent
                    ? colors.accent
                    : colors.cardBackground,
                },
              ]}
            >
              {consent ? (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color="#FFFFFF"
                />
              ) : null}
            </View>
            <Text
              style={[styles.consentText, { color: colors.textPrimary }]}
            >
              The vendor consented to this fictional inspection.
            </Text>
          </Pressable>
          {errors.consent ? (
            <Text style={styles.error}>{errors.consent}</Text>
          ) : null}

          <Pressable
            style={[styles.primaryButton, { backgroundColor: colors.accent }]}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>
              Continue to Evidence
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.screenGradient} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.titlePrimary }]}>
          Review & Evidence
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Step 2 of 2 — Attach evidence and confirm.
        </Text>

        <View style={styles.bannerWrap}>
          <GroupCodeBanner />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Validated fields
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
          <Row label="Vendor alias" value={vendorAlias} />
          <Row label="Stall code" value={stallCode.toUpperCase()} />
          <Row label="Category" value={category} />
          <Row label="Contact" value={contactNumber} />
          <Row
            label="Risk level"
            value={riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          />
          <Row label="Consent" value="Confirmed" last />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Evidence image
        </Text>
        {evidenceUri ? (
          <View>
            <Image source={{ uri: evidenceUri }} style={styles.preview} />
            <View style={styles.evidenceActions}>
              <Pressable
                style={[styles.smallButton, { backgroundColor: colors.accent }]}
                onPress={pickFromGallery}
              >
                <MaterialCommunityIcons
                  name="image-edit-outline"
                  size={16}
                  color="#FFFFFF"
                />
                <Text style={styles.smallButtonText}>Replace</Text>
              </Pressable>
              <Pressable
                style={[styles.smallButton, styles.removeBtn]}
                onPress={() => setEvidenceUri(null)}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={16}
                  color="#991B1B"
                />
                <Text
                  style={[styles.smallButtonText, { color: '#991B1B' }]}
                >
                  Remove
                </Text>
              </Pressable>
            </View>
          </View>
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
              name="camera-off-outline"
              size={32}
              color={colors.iconMuted}
            />
            <Text
              style={[styles.emptyEvidenceText, { color: colors.textMuted }]}
            >
              No evidence image attached yet.
            </Text>
            <View style={styles.evidenceActions}>
              <Pressable
                style={[styles.smallButton, { backgroundColor: colors.accent }]}
                onPress={pickFromGallery}
              >
                <MaterialCommunityIcons
                  name="image-outline"
                  size={16}
                  color="#FFFFFF"
                />
                <Text style={styles.smallButtonText}>Gallery</Text>
              </Pressable>
              <Pressable
                style={[styles.smallButton, styles.cameraBtn]}
                onPress={takePhoto}
              >
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={16}
                  color="#FFFFFF"
                />
                <Text style={styles.smallButtonText}>Camera</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Timestamp
        </Text>
        <Text style={[styles.timestamp, { color: colors.textPrimary }]}>
          {new Date().toLocaleString()}
        </Text>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.accent }]}
          onPress={handleSave}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={18}
            color="#FFF"
          />
          <Text style={styles.primaryButtonText}>Confirm & Save</Text>
        </Pressable>

        <Pressable
          style={[
            styles.secondaryButton,
            {
              borderColor: colors.cardBorder,
              backgroundColor: colors.cardBackground,
            },
          ]}
          onPress={() => setStep('form')}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              { color: colors.textPrimary },
            ]}
          >
            Back to Edit
          </Text>
        </Pressable>
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
  title: { fontSize: 24, fontWeight: '800', marginTop: 8 },
  subtitle: { fontSize: 13, marginTop: 4, marginBottom: 16 },
  bannerWrap: { marginBottom: 16 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  groupLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: { fontSize: 12, fontWeight: '600' },
  hint: { fontSize: 12, fontStyle: 'italic', marginBottom: 8 },
  error: { color: '#DC2626', fontSize: 12, marginTop: 4, marginBottom: 8 },
  spacer: { height: 16 },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentText: { flex: 1, fontSize: 13 },
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
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  emptyEvidence: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  emptyEvidenceText: { fontSize: 12 },
  evidenceActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  smallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  smallButtonText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  cameraBtn: { backgroundColor: '#0369A1' },
  removeBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  timestamp: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: { fontSize: 14, fontWeight: '700' },
});