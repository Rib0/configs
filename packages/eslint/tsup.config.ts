import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/lib/index.ts'],
    dts: true,
    format: 'esm',
    clean: true,
});
