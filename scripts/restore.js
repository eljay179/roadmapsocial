import { readdir, readFile, copyFile, mkdir, cp } from 'fs/promises';
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

async function listBackups() {
  const backupsDir = join(__dirname, '../backups');
  try {
    const backups = await readdir(backupsDir);
    const backupList = [];

    // Filter out non-directory items and read metadata
    for (const backup of backups.filter(b => !b.includes('.'))) {
      try {
        const metadataFile = join(backupsDir, backup, 'backup-info.json');
        const metadata = JSON.parse(await readFile(metadataFile, 'utf-8'));
        backupList.push({
          id: backup,
          ...metadata
        });
      } catch (error) {
        backupList.push({
          id: backup,
          timestamp: backup,
          description: 'No description available'
        });
      }
    }

    return backupList;
  } catch (error) {
    console.error('Error listing backups:', error);
    return [];
  }
}

async function restoreBackup(timestamp) {
  const backupDir = join(__dirname, '../backups', timestamp);
  const projectDir = join(__dirname, '..');
  
  try {
    // Verify backup exists
    const backups = await listBackups();
    if (!backups.find(b => b.id === timestamp)) {
      throw new Error(`Backup ${timestamp} not found`);
    }

    // List of directories to restore
    const dirsToRestore = ['src', 'public'];
    
    // List of files to restore
    const filesToRestore = [
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

    // Restore directories recursively
    for (const dir of dirsToRestore) {
      const srcDir = join(backupDir, dir);
      const destDir = join(projectDir, dir);
      await copyRecursive(srcDir, destDir);
    }

    // Restore individual files
    for (const file of filesToRestore) {
      const srcFile = join(backupDir, file);
      const destFile = join(projectDir, file);
      await copyFile(srcFile, destFile).catch(() => {
        console.log(`Skipping ${file} - file not found in backup`);
      });
    }

    console.log(`Successfully restored backup from ${timestamp}`);
    
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw error;
  }
}

// Command line interface
const command = process.argv[2];
const timestamp = process.argv[3];

async function main() {
  if (command === 'list') {
    const backups = await listBackups();
    if (backups.length === 0) {
      console.log('\nNo backups available');
    } else {
      console.log('\nAvailable backups:');
      backups.forEach(b => {
        console.log(`- ${b.id}`);
        console.log(`  Description: ${b.description}`);
        console.log(`  Created: ${new Date(b.createdAt).toLocaleString()}\n`);
      });
    }
  } else if (command === 'restore' && timestamp) {
    await restoreBackup(timestamp);
  } else {
    console.log(`
Usage:
  npm run restore list                List all available backups
  npm run restore restore [timestamp] Restore a specific backup
    `);
  }
}

main().catch(console.error);