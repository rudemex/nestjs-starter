const isBuild = process.env.APP_BUILD === 'build';

module.exports = (options) => {
  return {
    ...options,
    entry: {
      main: './src/main.ts',
      serverless: './src/serverless.ts',
    },
    output: {
      filename: '[name].js',
    },
    mode: isBuild ? 'production' : 'none',
    optimization: {
      ...options.optimization,
      minimize: isBuild,
      nodeEnv: isBuild ? 'production' : false,
    },
  };
};
