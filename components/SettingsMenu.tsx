
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Switch,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { getGroupCode } from '../config/groupInfo';

export default function SettingsMenu() {
  const [visible, setVisible] = useState(false);
  const { mode, colors, toggleTheme } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      {/* The three-dot button that sits in the header */}
      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          styles.iconButton,
          { backgroundColor: colors.accentSoft },
          pressed && { opacity: 0.7 },
        ]}
        hitSlop={8}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={22}
          color={colors.iconPrimary}
        />
      </Pressable>

      {/* The modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          {/* Inner Pressable stops the tap from closing the modal
              when the user taps inside the card */}
          <Pressable
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => {}}
          >
            {/* Header row */}
            <View style={styles.modalHeader}>
              <Text
                style={[styles.modalTitle, { color: colors.titlePrimary }]}
              >
                Settings
              </Text>
              <Pressable
                onPress={() => setVisible(false)}
                hitSlop={8}
                style={({ pressed }) => pressed && { opacity: 0.6 }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>

            {/* Group verification code */}
            <View
              style={[
                styles.infoRow,
                { borderColor: colors.cardBorder },
              ]}
            >
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={20}
                color={colors.iconPrimary}
              />
              <View style={styles.infoText}>
                <Text
                  style={[styles.infoLabel, { color: colors.textMuted }]}
                >
                  Group verification code
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.textPrimary }]}
                >
                  {getGroupCode()}
                </Text>
              </View>
            </View>

            {/* Theme toggle row */}
            <View
              style={[
                styles.infoRow,
                { borderColor: colors.cardBorder },
              ]}
            >
              <MaterialCommunityIcons
                name={isDark ? 'weather-night' : 'weather-sunny'}
                size={20}
                color={colors.iconPrimary}
              />
              <View style={styles.infoText}>
                <Text
                  style={[styles.infoLabel, { color: colors.textMuted }]}
                >
                  Appearance
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.textPrimary }]}
                >
                  {isDark ? 'Night mode' : 'Day mode'}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D1D5DB', true: colors.accent }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Small note about what the toggle does */}
            <Text style={[styles.note, { color: colors.textMuted }]}>
              Night mode uses black with green highlights for low-light
              field work.
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 16,
  },
});