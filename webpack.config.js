const path = require('path');

module.exports = {
  mode: 'development', // Set the mode to 'development' or 'production'
  entry: {
    bundle: './wallet.js', // Specify the entry file of your application (wallet.js)
    keyUtils: './keyUtils.js' // Specify the entry file of keyUtils.js
  },
  output: {
    filename: '[name].js', // Use [name] placeholder to generate separate bundle files
    path: path.resolve(__dirname, 'dist'), // Specify the output directory
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
    },
    alias: {
      elliptic: 'elliptic',
    },
  },
  module: {
    rules: [
      // Add any necessary loaders for your project (e.g., Babel, CSS, etc.)
    ],
  },
  target: 'web',
};
