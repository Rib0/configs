var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/@eslint/config-helpers/dist/cjs/index.cjs
var require_cjs = __commonJS({
  "../../node_modules/@eslint/config-helpers/dist/cjs/index.cjs"(exports) {
    "use strict";
    var eslintrcKeys = [
      "env",
      "extends",
      "globals",
      "ignorePatterns",
      "noInlineConfig",
      "overrides",
      "parser",
      "parserOptions",
      "reportUnusedDisableDirectives",
      "root"
    ];
    var allowedGlobalIgnoreKeys = /* @__PURE__ */ new Set(["ignores", "name"]);
    function getConfigName(config, indexPath) {
      if (config.name) {
        return config.name;
      }
      return `UserConfig${indexPath}`;
    }
    function getExtensionName(extension, indexPath) {
      if (typeof extension === "string") {
        return extension;
      }
      if (extension.name) {
        return extension.name;
      }
      return `ExtendedConfig${indexPath}`;
    }
    function isLegacyConfig(config) {
      for (const key of eslintrcKeys) {
        if (key in config) {
          return true;
        }
      }
      return false;
    }
    function isGlobalIgnores(config) {
      return Object.keys(config).every((key) => allowedGlobalIgnoreKeys.has(key));
    }
    function getPluginMember(id) {
      const firstSlashIndex = id.indexOf("/");
      if (firstSlashIndex === -1) {
        return { namespace: "", name: id };
      }
      let namespace = id.slice(0, firstSlashIndex);
      if (namespace[0] === "@" && namespace !== "@") {
        const secondSlashIndex = id.indexOf("/", firstSlashIndex + 1);
        if (secondSlashIndex !== -1) {
          namespace = id.slice(0, secondSlashIndex);
          return { namespace, name: id.slice(secondSlashIndex + 1) };
        }
      }
      const name = id.slice(firstSlashIndex + 1);
      return { namespace, name };
    }
    function normalizePluginConfig(userNamespace, plugin, config) {
      var _a;
      const pluginNamespace = (_a = plugin.meta) == null ? void 0 : _a.namespace;
      if (!pluginNamespace || pluginNamespace === userNamespace || !config.rules && !config.processor && !config.language) {
        return config;
      }
      const result = { ...config };
      if (result.rules) {
        const ruleIds = Object.keys(result.rules);
        const newRules = {};
        for (let i = 0; i < ruleIds.length; i++) {
          const ruleId = ruleIds[i];
          const { namespace: ruleNamespace, name: ruleName } = getPluginMember(ruleId);
          if (ruleNamespace === pluginNamespace) {
            newRules[`${userNamespace}/${ruleName}`] = result.rules[ruleId];
          } else {
            newRules[ruleId] = result.rules[ruleId];
          }
        }
        result.rules = newRules;
      }
      if (typeof result.processor === "string") {
        const { namespace: processorNamespace, name: processorName } = getPluginMember(result.processor);
        if (processorNamespace) {
          if (processorNamespace === pluginNamespace) {
            result.processor = `${userNamespace}/${processorName}`;
          }
        }
      }
      if (typeof result.language === "string") {
        const { namespace: languageNamespace, name: languageName } = getPluginMember(result.language);
        if (languageNamespace === pluginNamespace) {
          result.language = `${userNamespace}/${languageName}`;
        }
      }
      return result;
    }
    function deepNormalizePluginConfig(userPluginNamespace, plugin, pluginConfig, pluginConfigName) {
      if (Array.isArray(pluginConfig)) {
        return pluginConfig.map(
          (pluginSubConfig) => deepNormalizePluginConfig(
            userPluginNamespace,
            plugin,
            pluginSubConfig,
            pluginConfigName
          )
        );
      }
      if (isLegacyConfig(pluginConfig)) {
        throw new TypeError(
          `Plugin config "${pluginConfigName}" is an eslintrc config and cannot be used in this context.`
        );
      }
      return normalizePluginConfig(userPluginNamespace, plugin, pluginConfig);
    }
    function findPluginConfig(config, pluginConfigName) {
      var _a, _b, _c;
      const { namespace: userPluginNamespace, name: configName } = getPluginMember(pluginConfigName);
      const plugin = (_a = config.plugins) == null ? void 0 : _a[userPluginNamespace];
      if (!plugin) {
        throw new TypeError(`Plugin "${userPluginNamespace}" not found.`);
      }
      const directConfig = (_b = plugin.configs) == null ? void 0 : _b[configName];
      if (directConfig) {
        if (Array.isArray(directConfig) || !isLegacyConfig(directConfig)) {
          return deepNormalizePluginConfig(
            userPluginNamespace,
            plugin,
            directConfig,
            pluginConfigName
          );
        }
        const flatConfig = (_c = plugin.configs) == null ? void 0 : _c[`flat/${configName}`];
        if (flatConfig && (Array.isArray(flatConfig) || !isLegacyConfig(flatConfig))) {
          return deepNormalizePluginConfig(
            userPluginNamespace,
            plugin,
            flatConfig,
            pluginConfigName
          );
        }
        throw new TypeError(
          `Plugin config "${configName}" in plugin "${userPluginNamespace}" is an eslintrc config and cannot be used in this context.`
        );
      }
      throw new TypeError(
        `Plugin config "${configName}" not found in plugin "${userPluginNamespace}".`
      );
    }
    function* flatTraverse(configList, indexPath = "") {
      for (let i = 0; i < configList.length; i++) {
        const newIndexPath = indexPath ? `${indexPath}[${i}]` : `[${i}]`;
        if (Array.isArray(configList[i])) {
          yield* flatTraverse(configList[i], newIndexPath);
          continue;
        }
        yield { indexPath: newIndexPath, value: configList[i] };
      }
    }
    function extendConfigFiles(baseFiles = [], extensionFiles = []) {
      if (!extensionFiles.length) {
        return baseFiles.concat();
      }
      if (!baseFiles.length) {
        return extensionFiles.concat();
      }
      const result = [];
      for (const baseFile of baseFiles) {
        for (const extensionFile of extensionFiles) {
          const entry = [];
          if (Array.isArray(baseFile)) {
            entry.push(...baseFile);
          } else {
            entry.push(baseFile);
          }
          if (Array.isArray(extensionFile)) {
            entry.push(...extensionFile);
          } else {
            entry.push(extensionFile);
          }
          result.push(entry);
        }
      }
      return result;
    }
    function extendConfig(baseConfig, baseConfigName, extension, extensionName) {
      const result = { ...extension };
      if (!isGlobalIgnores(extension)) {
        if (baseConfig.files) {
          result.files = extendConfigFiles(baseConfig.files, extension.files);
        }
        if (baseConfig.ignores) {
          result.ignores = baseConfig.ignores.concat(extension.ignores ?? []);
        }
      }
      result.name = `${baseConfigName} > ${extensionName}`;
      return result;
    }
    function processExtends(config, configNames) {
      if (!config.extends) {
        return [config];
      }
      if (!Array.isArray(config.extends)) {
        throw new TypeError("The `extends` property must be an array.");
      }
      const {
        /** @type {Config[]} */
        extends: extendsList,
        /** @type {Config} */
        ...configObject
      } = config;
      const extensionNames = /* @__PURE__ */ new WeakMap();
      const objectExtends = extendsList.map((extendsElement) => {
        if (typeof extendsElement === "string") {
          const pluginConfig = findPluginConfig(config, extendsElement);
          if (Array.isArray(pluginConfig)) {
            pluginConfig.forEach((pluginConfigElement, index) => {
              extensionNames.set(
                pluginConfigElement,
                `${extendsElement}[${index}]`
              );
            });
          } else {
            extensionNames.set(pluginConfig, extendsElement);
          }
          return pluginConfig;
        }
        return (
          /** @type {Config} */
          extendsElement
        );
      });
      const result = [];
      for (const { indexPath, value: extendsElement } of flatTraverse(
        objectExtends
      )) {
        const extension = (
          /** @type {Config} */
          extendsElement
        );
        if ("extends" in extension) {
          throw new TypeError("Nested 'extends' is not allowed.");
        }
        const baseConfigName = (
          /** @type {string} */
          configNames.get(config)
        );
        const extensionName = extensionNames.get(extendsElement) ?? getExtensionName(extendsElement, indexPath);
        result.push(
          extendConfig(
            configObject,
            baseConfigName,
            extension,
            extensionName
          )
        );
      }
      if (!isGlobalIgnores(configObject)) {
        result.push(configObject);
      }
      return result.flat();
    }
    function processConfigList(configList, configNames) {
      return configList.flatMap((config) => processExtends(config, configNames));
    }
    function defineConfig2(...args) {
      const configNames = /* @__PURE__ */ new WeakMap();
      const configs = [];
      if (args.length === 0) {
        throw new TypeError("Expected one or more arguments.");
      }
      for (const { indexPath, value } of flatTraverse(args)) {
        if (typeof value !== "object" || value === null) {
          throw new TypeError(
            `Expected an object but received ${String(value)}.`
          );
        }
        const config = (
          /** @type {ConfigWithExtends} */
          value
        );
        configNames.set(config, getConfigName(config, indexPath));
        configs.push(config);
      }
      return processConfigList(configs, configNames);
    }
    var globalIgnoreCount = 0;
    function globalIgnores(ignorePatterns, name) {
      if (!Array.isArray(ignorePatterns)) {
        throw new TypeError("ignorePatterns must be an array");
      }
      if (ignorePatterns.length === 0) {
        throw new TypeError("ignorePatterns must contain at least one pattern");
      }
      const id = globalIgnoreCount++;
      return {
        name: name || `globalIgnores ${id}`,
        ignores: ignorePatterns
      };
    }
    exports.defineConfig = defineConfig2;
    exports.globalIgnores = globalIgnores;
  }
});

// ../../node_modules/eslint/lib/config-api.js
var require_config_api = __commonJS({
  "../../node_modules/eslint/lib/config-api.js"(exports, module) {
    "use strict";
    var { defineConfig: defineConfig2, globalIgnores } = require_cjs();
    module.exports = {
      defineConfig: defineConfig2,
      globalIgnores
    };
  }
});

// src/lib/index.ts
var import_config = __toESM(require_config_api(), 1);

// src/lib/configs/eslint-standart-js.ts
import js from "@eslint/js";
var eslintConfigStandartJs = {
  name: "rib0/eslint-config/standart-js",
  // name for debugging
  plugins: { js },
  extends: ["js/recommended"],
  rules: {
    "array-callback-return": ["error", { checkForEach: true }],
    "no-await-in-loop": "error",
    "no-constructor-return": "error",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-inner-declarations": "error",
    "no-fallthrough": ["error", { allowEmptyCase: true, reportUnusedFallthroughComment: true }],
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
    "no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: true }],
    "no-unused-vars": [
      "error",
      { destructuredArrayIgnorePattern: "^_", ignoreRestSiblings: true }
    ],
    // 'no-use-before-define': 'error',
    "no-useless-assignment": "error",
    "require-atomic-updates": "error",
    "valid-typeof": ["error", { requireStringLiterals: true }],
    "accessor-pairs": ["error", { enforceForClassMembers: true }],
    "arrow-body-style": "error",
    // 'block-scoped-var': 'error',
    camelcase: "error",
    "capitalized-comments": [
      "error",
      "always",
      {
        line: {
          ignoreConsecutiveComments: true
        },
        block: {
          ignoreInlineComments: true,
          ignoreConsecutiveComments: true
        }
      }
    ],
    "class-methods-use-this": "error",
    complexity: "error",
    "consistent-return": "error",
    // 'consistent-this': 'error',
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "func-name-matching": ["error", "always"],
    // 'func-names': 'error',
    "func-style": ["error", "expression"],
    "grouped-accessor-pairs": "error",
    // 'guard-for-in': 'error',
    // 'id-denylist': [],
    // 'id-length': 'error',
    // 'id-match': 'error'
    // 'init-declarations': 'error',
    "logical-assignment-operators": "error",
    "max-classes-per-file": ["error", { ignoreExpressions: true }],
    "max-depth": "error",
    "max-lines": ["error", { max: 300, skipBlankLines: true }],
    "max-lines-per-function": "error",
    "max-nested-callbacks": "error",
    "max-params": "error",
    "max-statements": "error",
    "new-cap": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-console": "error",
    // NOTE: disable for nodejs ENV
    "no-continue": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    // 'no-eq-null': 'error', NOTE: disabled due to eqeqeq rule
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-boolean-cast": ["error", { enforceForInnerExpressions: true }],
    "no-implicit-coercion": ["error", { disallowTemplateShorthand: true }],
    // 'no-implicit-globals: 'off'
    "no-implied-eval": "error",
    "no-inline-comments": ["error", { ignorePattern: "webpackChunkName:\\s.+" }],
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": ["error", { ignore: [1], ignoreClassFieldInitialValues: true }],
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-object-constructor": "error",
    "no-octal-escape": "error",
    "no-param-reassign": ["error", { props: true }],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-proto": "error",
    "no-restricted-exports": [
      "error",
      {
        restrictDefaultExports: {
          direct: true,
          named: true,
          defaultFrom: true,
          namedFrom: true,
          namespaceFrom: true
        }
      }
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "moment",
            message: "Please use 'date-fns' instead"
          },
          {
            name: "lodash",
            message: 'Import specific parts of "lodash" explicitly, for example: `import isEqual from "lodash/isEqual"`. This will help ensure greater consistency in builds and make it easier to align versions across projects'
          }
        ],
        patterns: [
          {
            group: ["lodash.*"],
            message: 'Import specific parts of "lodash" explicitly, for example: `import isEqual from "lodash/isEqual"`. This will help ensure greater consistency in builds and make it easier to align versions across projects'
          }
        ]
      }
    ],
    "no-restricted-properties": [
      "error",
      {
        object: "it",
        property: "only",
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: "describe",
        property: "only",
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: "context",
        property: "only",
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: "test",
        property: "only",
        message: "Did you forget to remove 'only' from this test?"
      }
    ],
    "no-restricted-syntax": [
      // TODO: мб добавить что-то еще
      "error",
      {
        selector: "FunctionExpression",
        message: "Function expressions are not allowed."
      },
      {
        selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
        message: "setTimeout must always be invoked with two arguments."
      }
    ],
    "no-return-assign": ["error", "always"],
    "no-script-url": "error",
    "no-sequences": ["error", { allowInParentheses: false }],
    "no-shadow": [
      "error",
      { builtinGlobals: true, hoist: "functions", allow: [], ignoreOnInitialization: false }
    ],
    // 'no-ternary': 'error'
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-underscore-dangle": "error",
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "object-shorthand": [
      "error",
      "always",
      {
        avoidExplicitReturnArrows: true
      }
    ],
    "operator-assignment": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    "prefer-destructuring": [
      "error",
      { array: true, object: true },
      {
        enforceForRenamedProperties: true
      }
    ],
    "prefer-exponentiation-operator": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
    "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    radix: "error",
    "require-await": "error",
    // 'strict': 'error' NOTE: мб нужно для commonJS модулей в nodeJS
    "symbol-description": "error",
    yoda: "error"
  }
};

// src/lib/configs/language-options.ts
import globals from "globals";
import TSParser from "@typescript-eslint/parser";
var languageOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  globals: {
    ...globals.builtin,
    ...globals.browser,
    ...globals.node
    // TODO: вынести только для ноды c помощью переменных параметров
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      ecmaVersion: "latest",
      sourceType: "module"
    }
  }
};
var languageOptionsTS = {
  files: ["**/*.ts", "**/*.cts", "**.*.mts"],
  languageOptions: {
    parser: TSParser,
    // TODO: доделть как в js, прочитать про options тут https://typescript-eslint.io/packages/eslint-plugin, зачем вообще он нужен, особенно про это https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.url
    }
  }
};

// src/lib/index.ts
var defineConfig = (configParams = {}) => {
  const { type = "browser", typescript } = configParams;
  const isBrowser = type === "browser";
  const isNode = type === "node";
  const commonConfigs = [
    {
      languageOptions,
      linterOptions: {
        reportUnusedInlineConfigs: "warn"
      }
    },
    eslintConfigStandartJs,
    {
      name: "rib0/eslint-config/airbnb-whitespaces"
      // + arbnb whitespaces / base
    },
    {
      name: "rib0/eslint-config/airbnb-base"
      // + arbnb whitespaces / base
    },
    {
      name: "rib0/eslint-config/react"
    }
  ];
  const typescriptConfigs = [languageOptionsTS];
  const configs = [...commonConfigs, typescript && typescriptConfigs].filter(Boolean);
  return (0, import_config.defineConfig)(configs);
};
export {
  defineConfig
};
