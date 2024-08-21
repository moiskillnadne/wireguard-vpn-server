const esbuild = require('esbuild');
const { dependencies } = require('./package.json');

const env = {
  'process.env.ENV': JSON.stringify(process.env.ENV),
  'process.env.PORT': JSON.stringify(process.env.PORT),
  'process.env.SERVER_IP': JSON.stringify(process.env.SERVER_IP),
  'process.env.DB_HOST': JSON.stringify(process.env.DB_HOST),
  'process.env.DB_USERNAME': JSON.stringify(process.env.DB_USERNAME),
  'process.env.DB_PASSWORD': JSON.stringify(process.env.DB_PASSWORD),
  'process.env.DB_NAME': JSON.stringify(process.env.DB_NAME),
  'process.env.DB_LOGGING': JSON.stringify(process.env.DB_LOGGING),
  'process.env.SERVICE_AUTH_TOKEN': JSON.stringify(
    process.env.SERVICE_AUTH_TOKEN,
  ),
};

esbuild
  .build({
    entryPoints: ['./src/index.ts'], // Entry point
    bundle: true,
    platform: 'node',
    outdir: 'dist', // Outdir
    target: 'node22', // Node version
    tsconfig: './tsconfig.json', // Path to tsconfig
    alias: {
      '~': './src', // Alias
    },
    external: Object.keys(dependencies), // External dependencies
    define: {
      ...env,
    },
    minify: true,
  })
  .catch(() => process.exit(1));
