const {
    override,
    addWebpackAlias,
    addDecoratorsLegacy,
    overrideDevServer,
    fixBabelImports,
} = require('customize-cra');

const path = require('path');
const paths = require('react-scripts/config/paths')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const rewireUglifyjs = require('react-app-rewire-uglifyjs');

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

//配置路径以及压缩
const buildFile = () => config => {
    if (config.mode === 'production') {
        console.log('evn is production, change build path...');

        //打包路径需要设置为相同的名字，不然会报错
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'neteasecloudmusic')
        config.output.path = path.join(path.dirname(config.output.path), 'neteasecloudmusic')
        // 添加js打包gzip配置
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: /\.js$|\.scss$|\.css$/,
            threshold: 1024
          })
        )
    }
    return config;
}

//生产环境去除console.* functions
const dropConsole = () => {
    return config => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach(minimizer => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true
                }
            })
        }
        return config
    }
}

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
      }),
      buildFile(),
      dropConsole(),
      rewireUglifyjs
    ),
    // 开发环境服务器代理, 一般情况下不需要我们自己配
    devServer: overrideDevServer(addProxy()),
};