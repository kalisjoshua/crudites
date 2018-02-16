const route = "/books";

function GET(body, qs, headers) {

  return Promise.resolve({statusCode: 204});
}

module.exports = {
  methods: [
    GET
  ],
  route
};
