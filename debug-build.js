
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

try {
  await build({
    plugins: [react(), tailwindcss()],
    logLevel: 'error',
  });
  console.log('Build successful');
} catch (e) {
  console.error('Build failed with error:');
  console.error(e);
  if (e.errors) {
    console.error('Detailed errors:', JSON.stringify(e.errors, null, 2));
  }
}
