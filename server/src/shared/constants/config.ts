const CONFIG = Object.freeze({
  SERVER: Object.freeze({
    PORT: process.env.PORT || 4000
  }),
  REDIS: Object.freeze({
    URL: process.env.REDIS_URL,
    PASSWORD: process.env.REDIS_PASSWORD,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT as number | undefined
  })
});

export default CONFIG;
