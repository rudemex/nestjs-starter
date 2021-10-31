const isBuild = process.env.APP_BUILD === 'build';

module.exports = (options) => {
  return {
    ...options,
    mode: isBuild ? 'production' : 'none',
    optimization: {
      ...options.optimization,
      minimize: isBuild,
      nodeEnv: isBuild ? 'production' : false,
    },
  };
};
