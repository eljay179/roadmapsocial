import { mkdir, copyFile, appendFile, readdir, cp } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function copyRecursive(src, dest) {
  try {
    await cp(src, dest, { recursive: true });
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = join(__dirname, '../backups', timestamp);
  
  try {
    // Create backup directory
    await mkdir(backupDir, { recursive: true });
    
    // List of directories to backup
    const dirsToBackup = ['src', 'public'];
    
    // List of files to backup
    const filesToBackup = [
      'package.json',
      'tsconfig.json',
      'tsconfig.app.json',
      'tsconfig.node.json',
      'vite.config.ts',
      'index.html',
      'postcss.config.js',
      'tailwind.config.js',
      'eslint.config.js'
    ];

    // Copy directories recursively
    for (const dir of dirsToBackup) {
      const srcDir = join(__dirname, '..', dir);
      const destDir = join(backupDir, dir);
      await copyRecursive(srcDir, destDir);
    }

    // Copy individual files
    for (const file of filesToBackup) {
      const srcFile = join(__dirname, '..', file);
      const destFile = join(backupDir, file);
      await copyFile(srcFile, destFile).catch(() => {
        console.log(`Skipping ${file} - file not found`);
      });
    }

    // Create metadata file with description
    const description = process.argv[2] || 'Automatic backup';
    const metadataFile = join(backupDir, 'backup-info.json');
    const metadata = {
      timestamp,
      description,
      createdAt: new Date().toISOString()
    };
    await appendFile(metadataFile, JSON.stringify(metadata, null, 2));

    console.log(`Backup created successfully at: backups/${timestamp}`);
    console.log(`Description: ${description}`);
    
    // Create a restore point file with timestamp and description
    const restorePointFile = join(__dirname, '../backups/restore-points.txt');
    await appendFile(restorePointFile, `${timestamp} - ${description}\n`);
    
  } catch (error) {
    console.error('Error creating backup:', error);
    process.exit(1);
  }
}

createBackup();