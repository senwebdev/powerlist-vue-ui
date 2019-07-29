module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/pl/ui/',
  chainWebpack: config => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
          }
        ]);
    }
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
  }
}
