module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://services.jiama.online/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: { 
                    '^/api': ''
                  }
            },
            '/invokMessage': {
                target: 'http://192.168.30.78:6603',
                pathRewrite: {
                    '^/invokMessage': ''
                  }
            },
            '/oauth': {
                target: 'https://oauth.jiama.online/api/',
                pathRewrite: { 
                    '^/oauth': ''
                  }
            },
        }
    }
}