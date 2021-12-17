'use strict';

const http = require('http');

const PORT = 8000;

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http.createServer(async (req, res) => {
  const url = req.url;
  if (url === '/api/service1') res.end('Hi! This is service1');
  else httpError(res, 404, 'service is not found');
}).listen(PORT);

console.log('service1 is listenting on ', PORT);
