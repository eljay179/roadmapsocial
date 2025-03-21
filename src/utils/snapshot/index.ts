import { createHash } from 'crypto';
import path from 'path';
import fs from 'fs';
import { SNAPSHOTS_DIR } from './config';
import { getAllProjectFiles, getFileHash, ensureDirectory } from './fileUtils';
import { saveSnapshot, loadSnapshot, updateSnapshotIndex, getSnapshotIndex } from './storage';
import { Snapshot } from './types';

export const createSnapshot = async (description: string): Promise<string> => {
  const timestamp = Date.now();
  const id = createHash('sha256')
    .update(`${timestamp}-${description}`)
    .digest('hex')
    .slice(0, 8);

  const files = await getAllProjectFiles();
  const snapshot: Snapshot = {
    id,
    timestamp,
    description,
    files: await Promise.all(
      files.map(async (filePath) => ({
        path: filePath,
        hash: await getFileHash(filePath),
        content: await fs.promises.readFile(filePath, 'utf-8'),
      }))
    ),
  };

  await ensureDirectory(SNAPSHOTS_DIR);
  await saveSnapshot(snapshot);
  await updateSnapshotIndex(snapshot);

  return id;
};

export const restoreSnapshot = async (snapshotId: string): Promise<void> => {
  const snapshot = await loadSnapshot(snapshotId);
  if (!snapshot) throw new Error(`Snapshot ${snapshotId} not found`);

  for (const file of snapshot.files) {
    const filePath = path.resolve(process.cwd(), file.path);
    await ensureDirectory(path.dirname(filePath));
    await fs.promises.writeFile(filePath, file.content, 'utf-8');
  }
};

export const listSnapshots = async () => getSnapshotIndex();