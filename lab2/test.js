const { exec } = require("child_process");
const http = require('http');

const getTime = url => new Promise((resolve, reject) => {
  http.get(url, response => {
    const start = Date.now();
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      resolve(Date.now() - start);
    });
  });
});

exec("minikube ip", (error, stdout, stderr) => {
  const ip = stdout;
  console.log(`Minikube ip: ${ip}`);
  const timesPromises = [];
  for (let i = 0; i < 100; i++) {
    timesPromises.push(getTime('http://' + ip + '/api/root'));
  }
  Promise.all(timesPromises)
    .then(times => {
      const sum = times.reduce((a, b) => a + b, 0);
      console.log(`Average time: ${sum / times.length}`);
    });
});