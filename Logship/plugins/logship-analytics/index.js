const path = require('path');

module.exports = function(context) {
  const isProd = process.env.NODE_ENV === 'production';
  
  return {
    name: 'logship-analytics-plugin',
    getClientModules() {
      // return [path.resolve(__dirname, './analytics')];
      return isProd ? [path.resolve(__dirname, './analytics')] : [];
    },
  };
};
