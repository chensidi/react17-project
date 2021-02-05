const {
    override,
    addWebpackAlias,
    addDecoratorsLegacy,
    overrideDevServer,
    fixBabelImports,
} = require('customize-cra');
const path = require('path')

/**
 * 代理配置
 */
const addProxy = () => config => {
    return {
        ...config,
        proxy: {
            '/api': {
                // 环境设定后期会讲, 这里可以参考.env中的配置
                target: 'http://localhost:5000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    };
};

/* module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    })
) */

module.exports = {
    webpack: override(
      // 使用修饰器
      addDecoratorsLegacy(),
      fixBabelImports("import", {
        libraryName: "antd", 
        libraryDirectory: "es", 
        style: true // change importing css to less
      }),
      // 路径别名
      addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@api': path.resolve(__dirname, 'src/api'),
      })
    ),
    // 开发环境服务器代理, 一般情况下不需要我们自己配
    devServer: overrideDevServer(addProxy()),
};