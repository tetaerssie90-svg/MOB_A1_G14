// Data/inspectionStore.ts
import { Inspection } from '../Types';

// Simple in-memory store. Reset every time the app reloads.
// Member 3 will replace this with proper state management later.
export const savedInspections: Inspection[] = [];