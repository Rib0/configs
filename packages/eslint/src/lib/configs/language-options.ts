import { type Linter } from 'eslint';
import globals from 'globals';
import TSParser from '@typescript-eslint/parser';

export const languageOptions: Linter.LanguageOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.node, // TODO: вынести только для ноды c помощью переменных параметроввe
    },
    parserOptions: {
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
};

export const languageOptionsTS: Linter.Config = {
    files: ['**/*.ts', '**/*.cts', '**.*.mts'],
    languageOptions: {
        parser: TSParser, // TODO: доделть как в js, прочитать про options тут https://typescript-eslint.io/packages/eslint-plugin, зачем вообще он нужен, особенно про это https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.url,
        },
    },
};
