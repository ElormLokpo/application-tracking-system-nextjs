import rootConfig from "../../eslint.config.js";

export default [
  ...rootConfig,
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
      },
    },
  },
];
