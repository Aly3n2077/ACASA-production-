#!/usr/bin/env node

import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

console.log('Building for Netlify deployment...');

// Build the frontend
console.log('Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// Create functions directory if it doesn't exist
if (!existsSync('dist/netlify/functions')) {
  mkdirSync('dist/netlify/functions', { recursive: true });
}

// Build the Netlify functions
console.log('Building Netlify functions...');
execSync('esbuild netlify/functions/*.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/netlify/functions', { stdio: 'inherit' });

console.log('Build completed successfully!');