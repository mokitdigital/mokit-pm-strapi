export default ({ env }) => ({
  'config-sync': {
    enabled: true,
    config: {
      syncDir: 'config/sync',
      minify: false,
      importOnBootstrap: false,
      include: ['core-store', 'plugins', 'roles', 'admin', 'i18n', 'strapi'],
      exclude: [],
      importSensitiveData: false,
    },
  },
});
