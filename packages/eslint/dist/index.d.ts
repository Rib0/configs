import * as eslint from 'eslint';

type ConfigParams = {
    type: 'browser' | 'node';
    typescript: boolean;
    stylistic: boolean;
    react: boolean;
};

declare const defineConfig: (configParams?: ConfigParams) => eslint.Linter.Config<eslint.Linter.RulesRecord>[];

export { defineConfig };
