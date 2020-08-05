module.exports = {
  configureWebpack: {
    devServer: {
        proxy: 'http://localhost:8080/',
    }
    // devServer: {
    //   //headers: { "Access-Control-Allow-Origin": "*" },
    //   //proxy: 'http://localhost:8080/',
    //   // host: 'http://localhost:8080',
    //   // port: '8080'
    //   proxy: {
    //     '/api': {
    //         target: 'http://localhost:8080',
    //         ws: true,
    //         changeOrigin: true
    //     }
    //   }
    // }
  }
};