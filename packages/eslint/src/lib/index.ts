import { defineConfig as defineConfigBase } from 'eslint/config';

import { eslintConfigStandartJs } from '@/lib/configs/eslint-standart-js';
import { languageOptions, languageOptionsTS } from '@/lib/configs/language-options';
import { type ConfigParams } from '@/types/config';
import { ConfigWithExtendsArray } from '#types/eslint.js';

//'plugin:@typescript-eslint/recommended-type-checked',
// eslint-plugin-n для node-js
// добавить https://www.npmjs.com/package/eslint-plugin-package-json

// TODO: посмотреть eslint плагины
// TODO: добавить overrides
// TODO: делать тесты при коммите и при публикации, билдить и публиковать пакет при коммите в git

// https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html
// TODO: сделать readme файл и научиться с ним работать
// Скорректировать настройку для корректной публикации пакета
// TODO: подключить утилиты для версионирования
// Понять что такое лицензия и добавить
// Подключить commitlint
// @stylistic/eslint-plugin-js вместо prettier
// https://perfectionist.dev/rules/sort-imports.html
// Вынести в git - editor config

export const defineConfig = (configParams: ConfigParams = {} as ConfigParams) => {
    const { type = 'browser', typescript } = configParams;

    const isBrowser = type === 'browser';
    const isNode = type === 'node';

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

    const configs = [...commonConfigs, typescript && typescriptConfigs].filter(Boolean);

    return defineConfigBase(configs);
};
