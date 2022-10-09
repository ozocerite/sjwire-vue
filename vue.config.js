const { defineConfig } = require('@vue/cli-service');
const webpack = require("webpack");

module.exports = defineConfig({
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === 'production'?'/sjwire-vue':'/',
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    //  jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
});
