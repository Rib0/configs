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

export type ConfigParams = BrowserConfigParams | NodeConfigParams;
