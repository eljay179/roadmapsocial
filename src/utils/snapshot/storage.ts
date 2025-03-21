import fs from 'fs';
import path from 'path';
import { SNAPSHOTS_DIR, SNAPSHOT_INDEX } from './config';
import { Snapshot, SnapshotIndex } from './types';

export const saveSnapshot = async (snapshot: Snapshot): Promise<void> => {
  const snapshotPath = path.join(SNAPSHOTS_DIR, `${snapshot.id}.json`);
  await fs.promises.writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));
};

export const loadSnapshot = async (id: string): Promise<Snapshot | null> => {
  try {
    const content = await fs.promises.readFile(
      path.join(SNAPSHOTS_DIR, `${id}.json`),
      'utf-8'
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
};

export const updateSnapshotIndex = async (snapshot: Pick<Snapshot, 'id' | 'description' | 'timestamp'>): Promise<void> => {
  const indexPath = path.join(SNAPSHOTS_DIR, SNAPSHOT_INDEX);
  let index: SnapshotIndex[] = [];

  try {
    const content = await fs.promises.readFile(indexPath, 'utf-8');
    index = JSON.parse(content);
  } catch {
    // Index doesn't exist yet
  }

  index.push({
    id: snapshot.id,
    description: snapshot.description,
    timestamp: snapshot.timestamp,
  });

  await fs.promises.writeFile(indexPath, JSON.stringify(index, null, 2));
};

export const getSnapshotIndex = async (): Promise<SnapshotIndex[]> => {
  try {
    const indexContent = await fs.promises.readFile(
      path.join(SNAPSHOTS_DIR, SNAPSHOT_INDEX),
      'utf-8'
    );
    return JSON.parse(indexContent);
  } catch {
    return [];
  }
};