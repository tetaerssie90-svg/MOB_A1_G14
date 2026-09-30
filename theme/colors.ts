// theme/colors.ts

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  // Backgrounds
  screenGradient: [string, string, ...string[]];
  cardBackground: string;
  cardBorder: string;

  // Text
  titlePrimary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Accents
  accent: string;
  accentSoft: string;

  // Chips & badges
  chipBackground: string;
  chipBorder: string;
  chipSelected: string;

  // Animated gradient on cards
  cardGradient: [string, string, ...string[]];

  // Shadows
  shadowColor: string;

  // Icons
  iconPrimary: string;
  iconMuted: string;
};

export const lightColors: ThemeColors = {
  screenGradient: ['#ECFDF5', '#F9FAFB', '#F3F4F6'],
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E7EB',

  titlePrimary: '#065F46',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',

  accent: '#065F46',
  accentSoft: '#D1FAE5',

  chipBackground: '#FFFFFF',
  chipBorder: '#D1D5DB',
  chipSelected: '#065F46',

  // Moving gradient — light mode: white with a soft mint sheen
  cardGradient: ['#FFFFFF', '#ECFDF5', '#FFFFFF'],

  shadowColor: '#000',

  iconPrimary: '#065F46',
  iconMuted: '#9CA3AF',
};

export const darkColors: ThemeColors = {
  // Black with green highlights for night activity
  screenGradient: ['#000000', '#04140C', '#000000'],
  cardBackground: '#0B1A12',
  cardBorder: '#134E2E',

  titlePrimary: '#34D399',
  textPrimary: '#F9FAFB',
  textSecondary: '#A7F3D0',
  textMuted: '#6B7280',

  accent: '#34D399',
  accentSoft: '#064E3B',

  chipBackground: '#0F1E16',
  chipBorder: '#134E2E',
  chipSelected: '#34D399',

  // Moving gradient — dark mode: deep black with a green sheen
  cardGradient: ['#0B1A12', '#064E3B', '#0B1A12'],

  shadowColor: '#34D399', // green shadow for night mode

  iconPrimary: '#34D399',
  iconMuted: '#4B5563',
};