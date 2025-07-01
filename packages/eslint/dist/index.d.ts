import * as eslint from 'eslint';

interface CommonConfigParams {
    type: 'browser' | 'node';
    typescript: boolean;
}
interface BrowserConfigParams extends CommonConfigParams {
    type: 'browser';
    react: boolean;
}
interface NodeConfigParams extends CommonConfigParams {
    type: 'node';
}
type ConfigParams = BrowserConfigParams | NodeConfigParams;

declare const defineConfig: (configParams?: ConfigParams) => eslint.Linter.Config<eslint.Linter.RulesRecord>[];

export { defineConfig };
