'use strict';

const http = require('http');

const PORT = 8003;

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http.createServer(async (req, res) => {
  const url = req.url;
  if (url === '/api/service1') res.end('Hi! This is serviceTest');
  else httpError(res, 404, 'service is not found');
}).listen(PORT);

console.log('service1 is listenting on ', PORT);
