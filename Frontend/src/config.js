const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV !== "production",
    isBrowser: typeof window !== "undefined",
    apiUrl: ""
  },
  test: {},
  development: {},
  production: {}
};

module.exports = {
  ...config.all,
  ...config[config.all.env]
};
