// Types/index.ts
import { ImageSourcePropType } from 'react-native';

// ---------- Market (your part) ----------
export type MarketStatus = 'open' | 'needs-attention' | 'closed';

export type MarketPriority = 'high' | 'medium' | 'low';

export type Market = {
  id: string;
  name: string;
  stallCode: string;
  category: string;
  status: MarketStatus;
  priority: MarketPriority;
  placeholderColor: string;
  imageSource: ImageSourcePropType;
};

// ---------- Navigation ----------
export type RootTabParamList = {
  Home: undefined;
  NewInspection: { stallCode?: string } | undefined;
  Records: undefined;
};

export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { inspectionId: string };
};

// ---------- Inspection ----------
export type Inspection = {
  id: string;
  vendorAlias: string;
  stallCode: string;
  category: string;
  contactNumber: string;
  riskLevel: 'low' | 'medium' | 'high';
  consent: boolean;
  evidenceImageUri?: string;
  createdAt: string;
};