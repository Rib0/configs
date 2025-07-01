import { defineConfig } from 'eslint/config';

export type ConfigWithExtendsArray = Parameters<typeof defineConfig>[0];
