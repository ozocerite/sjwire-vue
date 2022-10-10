const { defineConfig } = require('@vue/cli-service');
const webpack = require("webpack");

module.exports = defineConfig({
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === "production" ? "/sjwire-vue/" : "/",
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
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import "@/assets/scss/_reset.scss";
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_breakpoints.scss";
                    @import "@/assets/scss/_mixins.scss";
                `
      }
    }
  }
});
