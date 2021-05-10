module.exports = {
  // 是否使用eslint
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 生产环境是否要生成 sourceMap(源码文件)
  productionSourceMap: false,
  // 部署应用包时的基本 URL
  publicPath: './',
  // build 时输出的文件目录
  outputDir: 'dist',
  // 放置静态文件夹目录
  assetsDir: 'assets',
  // webpack-dev-server 相关配置
  devServer: {
    // 开发运行时的端口
    port: 9528,
    // 开发运行时域名
    host: '0.0.0.0',
    // 是否启用 `https`
    https: false,
    // `npm run serve` 时是否直接打开浏览器
    open: true
  }
}
