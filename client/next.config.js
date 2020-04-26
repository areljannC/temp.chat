require('dotenv').config()
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    SERVER_PATH:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_SERVER_PATH
        : process.env.DEV_SERVER_PATH,
    WEBSOCKET_PATH:
      process.env.NODE_ENV === 'production'
      ? process.env.PROD_WEBSOCKET_PATH
      : process.env.DEV_WEBSOCKET_PATH,
    ENV: process.env.NODE_ENV || 'development'
  }
})