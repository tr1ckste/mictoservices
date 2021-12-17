'use strict';

const http = require('http');
const { exec } = require("child_process");

const PORT = 8000;

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

const getRequestPromise = url => new Promise((resolve, reject) => {
  http.get(url, response => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      resolve(data);
    });
  })
  .on('error', error => {
    reject(error);
  });
});



http.createServer(async (req, res) => {
  const url = req.url;
  if (url === '/api/root') {
    const service1Promise = getRequestPromise('http://service1-service/api/service1');
    const service2Promise = getRequestPromise('http://service2-service/api/service2');
    Promise.all([ service1Promise, service2Promise ])
      .then(responses => {
        const [ service1Res, service2Res ] = responses;
        res.end(`from service1: ${service1Res}\n from service2: ${service2Res}`);
      });
  } else {
    httpError(res, 404, 'service is not found');
  }
}).listen(PORT);

console.log('root is listenting on ', PORT);