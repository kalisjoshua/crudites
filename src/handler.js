const {parse : parseQS} = require("querystring");

const parseHeaders = require("./headers");
const routesFactory = require("./routes");

const {addRoute, getRouteHandler} = routesFactory();

function handler(ev, context, callback) {
  const {body, headers, httpMethod, path, queryStringParameters} = ev;

  const respondWith = ({body, headers = {}, statusCode}) =>
    callback(null, body
      ? {headers, statusCode, body}
      : {headers, statusCode});

  const requestArguments = [
    body,
    parseQS(queryStringParameters)
  ];

  try {
    requestArguments
      .push(parseHeaders(headers));
  } catch (e) {
    respondWith({statusCode: 400, body: "Unparsable headers."});

    return;
  }

  try {
    getRouteHandler(path, httpMethod)(...requestArguments)
      .then(respondWith, respondWith);
  } catch(e) {
    respondWith({statusCode: 404, body: "Not found."});

    return;
  }
}

exports.addRoute = addRoute;
exports.handler = handler;
