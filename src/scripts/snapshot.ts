import { createSnapshot, restoreSnapshot, listSnapshots } from '../utils/snapshot';

const command = process.argv[2];
// Combine all remaining arguments as the description
const description = process.argv.slice(3).join(' ');

async function main() {
  try {
    switch (command) {
      case 'create':
        if (!description) throw new Error('Description required for creating snapshot');
        const id = await createSnapshot(description);
        console.log(`Created snapshot: ${id}`);
        break;

      case 'restore':
        if (!description) throw new Error('Snapshot ID required for restoration');
        await restoreSnapshot(description);
        console.log(`Restored snapshot: ${description}`);
        break;

      case 'list':
        const snapshots = await listSnapshots();
        if (snapshots.length === 0) {
          console.log('No snapshots found');
        } else {
          console.log('\nAvailable snapshots:\n');
          snapshots.forEach(({ id, description, timestamp }) => {
            const date = new Date(timestamp).toLocaleString();
            console.log(`${id} - ${description} (${date})`);
          });
        }
        break;

      default:
        console.log(`
Usage:
  npm run snapshot create "description"  Create a new snapshot
  npm run snapshot restore <id>         Restore a snapshot
  npm run snapshot list                 List all snapshots
        `);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});