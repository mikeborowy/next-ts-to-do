const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  webpack(cfg) {
    cfg.module.rules.push({
      test: /\.graphql$/,
      loader: 'graphql-tag/loader',
      exclude: /node_modules/
    });
    return cfg
  }
});