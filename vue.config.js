
// let dev = 'xianshang'
// let prod = 'xianxia'
// let api = process.env.NODE_ENV === 'development' ? dev : prod
module.exports = {

    publicPath: './',
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/api': {
                target: 'https://services.jiama.online/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: { 
                    '^/api': ''
                  }
            },
            // '/invokMessage': {  
            //     target: 'http://192.168.30.78:6603/api/',
            //     pathRewrite: {
            //         '^/invokMessage': ''
            //     }
            // },
            '/oauth': {
                target: 'https://oauth.jiama.online/api/',
                pathRewrite: { 
                    '^/oauth': ''
                }
            },
        }
    }
}