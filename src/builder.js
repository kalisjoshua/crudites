const {addRoute, handler} = require("./handler");

function builder(resources) {
  // TODO: enable nested resources
  const api = resources
    .reduce((acc, config) => {
      const {route} = config;
      delete config.route;

      acc[route] = Object.keys(config);

      Object.keys(config)
        .forEach(name => addRoute(route, name, config[name]));

      return acc;
    }, {});

  return {api, handler};
}

module.exports = builder;
