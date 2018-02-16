const {addRoute, handler} = require("./handler");

function builder(resources) {
  // TODO: enable nested resources
  const api = resources
    .reduce((acc, {methods, route}) => {
      acc[route] = methods.map(method => {
        addRoute(route, method.name, method);

        return method.name;
      });

      return acc;
    }, {});

  return {api, handler};
}

module.exports = builder;
