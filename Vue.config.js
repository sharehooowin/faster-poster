module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: './dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    productionSourceMap:false,
    configureWebpack: {
        externals:{
            vue:'Vue'
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api' : {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
            }
        }, // 设置代理
        before: function (app) {
            return app
        }
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
                data: `@import "@/assets/css/varuables.scss";`
            }
        }
    }
}