module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: [
    //
    "<rootDir>/tests/**/*.[jt]s?(x)",
    "<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testPathIgnorePatterns: [
    //
    "/node_modules/",
    "dist",
    "<rootDir>/tests/setup.ts",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{vue,ts}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["src/main.ts", "src/stores/index.ts", "src/api"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
