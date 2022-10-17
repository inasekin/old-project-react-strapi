module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // proxy: true,
  admin: {
    // url: 'http://localhost:1337/admin',
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e0a65159f478cbf8441d141e20e43797'),
    }
  },
  // url: 'http://localhost:1337/'
});
