const configuration = {
  moduleDirectories: ["node_modules", "src", __dirname],
  modulePaths: ["node_modules", "src", __dirname],
  preset: "ts-jest",
  testEnvironment: "jsdom",
};

module.exports = configuration;
