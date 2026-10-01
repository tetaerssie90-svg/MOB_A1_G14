# Musanze Safe Market Field Inspection Prototype

A React Native + Expo mobile application for the fictional **Musanze Safe Markets** one-day vendor registration and stall inspection pilot.

- **Course:** SWE 3409 — Mobile Application Development
- **Assignment:** Musanze Safe Market Field Inspection Prototype
- **Group:** A14
- **Group verification code:** MOB-G14-6951
- **Platform:** Expo Go on Android
- **Language:** TypeScript

---

## 1. What the app does

The app supports a field officer during a one-day market inspection pilot. The officer can:

- View six fictional market zones and stalls in a catalog
- Register a fictional vendor inspection with validation
- Attach one evidence image from the camera or the gallery
- Review the inspection before saving
- View saved inspections in a list
- Open an individual inspection to see its details

There is **no backend**. All data is held in memory for the current session and resets when the app is reloaded. No real personal data is used. All names, stall codes, and phone numbers are fictional.

---

## 2. Features

### Market Catalog

- Six fictional market stalls, each showing:
  - A local image
  - Name
  - Stall code (for example `MSN-A-014`)
  - Category pill (Vegetables, Fruits, Grains, Dairy, Meat, Spices)
  - Status chip (Open, Needs Attention, Closed)
  - Priority badge (High, Medium, Low)
- Group verification code banner in the header
- Empty state when no markets are assigned
- Responsive Flexbox layout that works on narrow phone widths

### New Inspection

- Two-step flow: **Form** then **Review and Evidence**
- Vendor alias, stall code, category, contact number, risk level, and consent
- Smart stall code input: fixed `MSN-` prefix, zone chips (A/B/C), 3-digit number
- Category options are filtered automatically by the selected zone
- Field-level validation with clear error messages
- Submission is blocked until every field is valid

### Evidence

- Attach an image from the camera or the gallery
- Preview the selected image
- Replace or remove the image
- Permission denial shows a helpful alert
- Picker cancellation leaves the current image unchanged

### Review and Save

- Review screen shows the validated fields, the evidence image, a timestamp, and the group verification code
- Confirm and save writes the inspection to the in-memory session

### Records

- List of saved inspections from the current session
- Each row shows vendor alias, stall code, category, timestamp, and risk badge
- Empty state when no inspections have been saved
- Tapping a row opens the Inspection Details screen

### Inspection Details

- Full record: vendor alias, stall code, category, contact, risk level, consent, timestamp, and evidence image
- Group verification code banner at the top

### Theme

- Light mode and dark mode
- Toggle available from the settings menu
- Dark mode uses black with green highlights for low-light field work
- Every screen and component respects the active theme

### Accessibility

- Every interactive element has an accessibility label, role, and hint
- Each market card is announced as one button with a full sentence
- Status is communicated by color, dot, and text, never by color alone
- Layout tested at 200 percent system font scaling
- Safe area handling for Android system navigation and status bar

---

## 3. Project structure
MOB_A14_G14/
├── App.js Root component, wraps theme + navigation
├── app.json Expo configuration
├── package.json Dependencies and scripts
├── tsconfig.json TypeScript configuration
├── README.md This file
├── AI_USE.md AI use declaration
├── TEST_LOG.md Test log (exported as TEST_LOG.pdf)
├── .gitignore
│
├── assets/ Local images for market cards
│
├── config/
│ └── groupInfo.ts Group verification code builder
│
├── theme/
│ ├── colors.ts Light and dark palettes
│ └── ThemeContext.tsx Theme provider and useTheme hook
│
├── Navigation/
│ └── AppNavigator.tsx Bottom tabs and Records stack
│
├── Components/
│ ├── MarketCard.tsx
│ ├── StatusChip.tsx
│ ├── PriorityBadge.tsx
│ ├── CategoryPill.tsx
│ ├── EmptyState.tsx
│ ├── RecordCard.tsx
│ ├── GroupCodeBanner.tsx
│ ├── SettingsMenu.tsx
│ ├── InputField.tsx
│ └── StallCodeInput.tsx
│
├── Screens/
│ ├── HomeScreen.tsx Market Catalog
│ ├── NewInspectionScreen.tsx Form and Review
│ ├── RecordScreen.tsx Records list
│ └── InspectionDetailScreen.tsx Inspection details
│
├── Data/
│ ├── MarketData.ts Six fictional stalls
│ └── inspectionStore.ts In-memory saved inspections
│
├── Types/
│ └── index.ts Shared TypeScript types
│
├── evidence/ Screenshots used for the submission
│
└── contributions/ Per-member contribution notes

---

## 4. Requirements

- Node.js 20 LTS or 22 LTS (Node 24 is not recommended for Expo SDK 53)
- npm 9 or later
- Expo Go installed on an Android phone
- Phone and computer connected to the same Wi-Fi network

---

## 5. Setup and run

### 5.1 Install dependencies

```bash
npm install
npx expo start