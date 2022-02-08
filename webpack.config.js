const isBuild = process.env.NODE_ENV === 'build';
module.exports = (options) => {
  return {
    ...options,
    mode: isBuild ? 'production' : 'none',
    output: {
      ...options.output,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    optimization: {
      ...options.optimization,
      minimize: isBuild,
      nodeEnv: isBuild ? 'production' : false,
    },
  };
};
