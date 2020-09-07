const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [{
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@primary-color': '#F6CB93'
          },
          javascriptEnabled: true,
        },
      },
    },
  }, ],
  
};

// "plugins": ["@babel/plugin-proposal-decorators"]