import { ConfigWithExtendsArray } from '#types/eslint.js';
import stylistic from '@stylistic/eslint-plugin';

export const stylisticConfig: ConfigWithExtendsArray = {
    name: 'rib0/stylistic-config',
    plugins: { '@stylistic': stylistic },
    extends: [stylistic.configs.recommended],
    rules: {
        // '@stylistic/semi': 'error',
    },
};
