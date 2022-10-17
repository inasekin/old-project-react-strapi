module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        //TODO: закомментить для прода
        database: env('DATABASE_NAME', 'odobreno_prod'),
        //TODO: разкомментить для прода
        // database: env('DATABASE_NAME', 'odobreno'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'Postgres123456'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
