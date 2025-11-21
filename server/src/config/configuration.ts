export default () => ({
  app: {
    name: process.env.APP_NAME || 'My Nest App',
    url: process.env.APP_URL || 'http://localhost:5000',
    port: parseInt(process.env.PORT || '5000', 10),
    env: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  },
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    host: process.env.MAIL_HOST || 'smtp.mail.ru',
    port: parseInt(process.env.MAIL_PORT || '465', 10),
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
  feed: {
    popularPostsHours: process.env.POPULAR_POSTS_HOURS || 24,
  },
});
