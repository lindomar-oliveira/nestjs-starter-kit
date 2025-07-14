/* eslint-disable */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');

const TYPEORM = 'npx typeorm-ts-node-commonjs -d src/data-source.ts';

const SEEDER = 'node -r tsconfig-paths/register -r ts-node/register node_modules/typeorm-extension/bin/cli.cjs';

const runCommand = (cmd) => {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error: Command failed: ${cmd}`);
    process.exit(1);
  }
};

yargs()
  .scriptName('db')
  .usage('$0 <cmd> [args]')

  .command(
    'migration:create <name>',
    'Create a new migration file',
    (yargs) => {
      yargs
        .positional('name', {
          type: 'string',
          describe: 'Migration name',
          demandOption: true
        })
        .option('empty', {
          alias: 'e',
          type: 'boolean',
          description: 'Create an empty migration',
          default: false
        });
    },
    (args) => {
      const { name, empty } = args;
      const command = empty
        ? `npx typeorm-ts-node-commonjs migration:create src/database/migrations/${name}`
        : `${TYPEORM} migration:generate src/database/migrations/${name}`;
      runCommand(command);
    }
  )

  .command(
    'migration:run',
    'Run all pending migrations',
    () => {},
    () => {
      runCommand(`${TYPEORM} migration:run`);
    }
  )

  .command(
    'migration:show',
    'Show all migrations and their run status',
    () => {},
    () => {
      runCommand(`${TYPEORM} migration:show`);
    }
  )

  .command(
    'migration:revert',
    'Revert the last executed migration',
    () => {},
    () => {
      runCommand(`${TYPEORM} migration:revert`);
    }
  )

  .command(
    'seed:create <name>',
    'Create a new seed file',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'Seed name',
        demandOption: true
      })
    },
    (args) => {
      const { name } = args;
      runCommand(`${SEEDER} seed:create -n src/database/seeds/${name}`)
    }
  )

  .command(
    'seed:run',
    'Run database seeds',
    () => {},
    () => {
      runCommand(`${SEEDER} seed:run`)
    }
  )

  .command(
    'schema:drop',
    'Drop the database schema (⚠️  irreversible — use with caution)',
    () => {},
    () => {
      runCommand(`${TYPEORM} schema:drop`);
    }
  )

  .demandCommand(1, 'Please provide a command. Use --help for help.')
  .strict()
  .help()
  .alias('h', 'help')
  .version(false)
  .parse(hideBin(process.argv));
