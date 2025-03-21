import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

interface Snapshot {
  id: string;
  timestamp: number;
  description: string;
  files: {
    path: string;
    hash: string;
    content: string;
  }[];
}

const SNAPSHOTS_DIR = '.snapshots';
const SNAPSHOT_INDEX = 'snapshot-index.json';

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

  await ensureSnapshotsDir();
  await saveSnapshot(snapshot);
  await updateSnapshotIndex(snapshot);

  return id;
};

export const restoreSnapshot = async (snapshotId: string): Promise<void> => {
  const snapshot = await loadSnapshot(snapshotId);
  if (!snapshot) throw new Error(`Snapshot ${snapshotId} not found`);

  for (const file of snapshot.files) {
    const filePath = path.resolve(process.cwd(), file.path);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, file.content, 'utf-8');
  }
};

export const listSnapshots = async (): Promise<Array<{ id: string; description: string; timestamp: number }>> => {
  await ensureSnapshotsDir();
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

const getAllProjectFiles = async (): Promise<string[]> => {
  const ignore = [
    'node_modules',
    'dist',
    '.git',
    '.snapshots',
    '.DS_Store',
  ];

  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (ignore.some(i => relativePath.startsWith(i))) continue;

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        files.push(relativePath);
      }
    }
  }

  await walk(process.cwd());
  return files;
};

const getFileHash = async (filePath: string): Promise<string> => {
  const content = await fs.promises.readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
};

const ensureSnapshotsDir = async (): Promise<void> => {
  await fs.promises.mkdir(SNAPSHOTS_DIR, { recursive: true });
};

const saveSnapshot = async (snapshot: Snapshot): Promise<void> => {
  const snapshotPath = path.join(SNAPSHOTS_DIR, `${snapshot.id}.json`);
  await fs.promises.writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));
};

const loadSnapshot = async (id: string): Promise<Snapshot | null> => {
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

const updateSnapshotIndex = async (snapshot: Snapshot): Promise<void> => {
  const indexPath = path.join(SNAPSHOTS_DIR, SNAPSHOT_INDEX);
  let index: Array<{ id: string; description: string; timestamp: number }> = [];

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