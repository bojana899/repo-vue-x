module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your API server
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
