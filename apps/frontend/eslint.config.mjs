// import { defineConfig, globalIgnores } from "eslint/config";
// import nextVitals from "eslint-config-next/core-web-vitals";
// import nextTs from "eslint-config-next/typescript";

// const eslintConfig = defineConfig([
//   ...nextVitals,
//   ...nextTs,
//   // Override default ignores of eslint-config-next.
//   globalIgnores([
//     // Default ignores of eslint-config-next:
//     ".next/**",
//     "out/**",
//     "build/**",
//     "next-env.d.ts",
//   ]),
// ]);

// export default eslintConfig;



import nextPlugin from '@next/eslint-plugin-next';
import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    },
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly'
      }
    }
  }
];