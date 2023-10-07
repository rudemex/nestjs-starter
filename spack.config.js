import { config } from '@swc/core/spack';

module.exports = config({
  entry: {
    web: __dirname + '/src/main.ts',
  },
  output: {
    path: __dirname + '/dist2',
  },
  module: {},
});
