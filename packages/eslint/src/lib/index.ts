import { defineConfig as defineConfigBase } from 'eslint/config';

import { eslintConfigStandartJs } from '@/lib/configs/eslint-standart-js';
import { languageOptions, languageOptionsTS } from '@/lib/configs/language-options';
import { type ConfigParams } from '@/types/config';
import { ConfigWithExtendsArray } from '#types/eslint.js';
import { stylisticConfig } from './configs/stylistic';

//'plugin:@typescript-eslint/recommended-type-checked',
// eslint-plugin-n для node-js
// добавить https://www.npmjs.com/package/eslint-plugin-package-json

// TODO: посмотреть eslint плагины - https://github.com/antfu/eslint-config/blob/main/scripts/typegen.ts
// TODO: добавить overrides
// TODO: делать тесты при коммите и при публикации, билдить и публиковать пакет при коммите в git

// https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html
// Скорректировать настройку для корректной публикации пакета
// TODO: подключить утилиты для версионирования
// Понять что такое лицензия и добавить
// https://perfectionist.dev/rules/sort-imports.html
// Вынести в git - editor config
// TODO: сделать readme файл и научиться с ним работать
// TODO: https://docs.github.com/ru/actions/how-tos/monitoring-and-troubleshooting-workflows/monitoring-workflows/adding-a-workflow-status-badge
// Включить типы для js файла eslint.config.js

export const defineConfig = (configParams: ConfigParams = {} as ConfigParams) => {
    const { type = 'browser', typescript, stylistic, react } = configParams;

    const isBrowser = type === 'browser';

    const commonConfigs: ConfigWithExtendsArray = [
        {
            languageOptions,
            linterOptions: {
                reportUnusedInlineConfigs: 'warn',
            },
        },
        eslintConfigStandartJs,
        {
            name: 'rib0/eslint-config/airbnb-whitespaces',
            // + arbnb whitespaces / base
        },
        {
            name: 'rib0/eslint-config/airbnb-base',
            // + arbnb whitespaces / base
        },
        {
            name: 'rib0/eslint-config/react',
        },
    ];

    const typescriptConfigs = [languageOptionsTS];

    const configs = [
        ...commonConfigs,
        typescript && typescriptConfigs,
        stylistic && stylisticConfig,
    ].filter(Boolean);

    return defineConfigBase(configs);
};
