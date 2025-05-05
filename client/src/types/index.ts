export interface AppState {
  entries: DiaryEntry[];
  loading: boolean;
  error: string | null;
}

export interface DiaryEntry {
  id?: number;
  content: string;
  imageData?: string;
  createdAt: Date;
  updatedAt: Date;
}
