export interface Snapshot {
  id: string;
  timestamp: number;
  description: string;
  files: {
    path: string;
    hash: string;
    content: string;
  }[];
}

export interface SnapshotIndex {
  id: string;
  description: string;
  timestamp: number;
}