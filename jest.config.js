module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/tests/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/tests/setup-test-env.js"],
};
