import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { IGNORED_PATHS } from './config';

export const getAllProjectFiles = async (): Promise<string[]> => {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (IGNORED_PATHS.some(i => relativePath.startsWith(i))) continue;

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

export const getFileHash = async (filePath: string): Promise<string> => {
  const content = await fs.promises.readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
};

export const ensureDirectory = async (dir: string): Promise<void> => {
  await fs.promises.mkdir(dir, { recursive: true });
};