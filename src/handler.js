const {parse: parseQS} = require('querystring')

const parseHeaders = require('./headers')
const routesFactory = require('./routes')

const {addRoute, getRouteHandler} = routesFactory()

function handler (ev, context, callback) {
  const {body, headers, httpMethod, path, queryStringParameters} = ev

  const respondWith = ({body, headers = {}, statusCode}) =>
    callback(null, body
      ? {headers, statusCode, body}
      : {headers, statusCode})

  const requestArguments = {
    body,
    method: httpMethod,
    uri: {
      path: (path || '').replace(/\?.*/, ''),
      search: parseQS(queryStringParameters),
    },
  }

  try {
    requestArguments.headers = parseHeaders(headers)
  } catch (e) {
    respondWith({statusCode: 400, body: 'Unparsable headers.'})

    return
  }

  let pending

  try {
    pending = getRouteHandler(requestArguments, ev)
  } catch (e) {
    const {message: body, statusCode} = e

    respondWith({body, statusCode})

    return
  }

  if (pending.then) {
    pending.then(respondWith, respondWith)
  } else {
    respondWith(pending)
  }
}

module.exports = {
  addRoute,
  handler
}
