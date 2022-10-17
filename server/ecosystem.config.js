module.exports = {
  apps: [
    {
      name: 'odobreno-strapi',
      script: 'npm',
      args: 'start',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      watch: ['api', 'build', 'components', 'config', 'extensions', 'helpers'],
      watch_delay: 1000,
      ignore_watch: ['public/uploads'],
      watch_options: {
        'followSymlinks': false
      }
    }
  ],
};