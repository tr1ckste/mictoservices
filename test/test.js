'use strict';

const { rejects } = require("assert");
const { exec } = require("child_process");
const http = require('http');
const { resolve } = require("path");

exec("minikube ip", (error, stdout, stderr) => {
  const ip = stdout;
  console.log(`Hi! This is root. IP: ${ip}`);
});

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

getRequestPromise('http://localhost:8000')
  .then(data => console.log(data));


const service1Promise = getRequestPromise('http://localhost:8000/api/service1');
  const service2Promise = getRequestPromise('http://localhost:8003');
  Promise.all([ service1Promise, service2Promise ])
    .then(responses => {
      const [ service1Res, service2Res ] = responses;
      console.log(`from service1: ${service1Res}\n from service2: ${service2Res}`);
    });