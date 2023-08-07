// EXTERNAL IMPORTS
import 'module-alias/register';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

const api = express();
const server = http.createServer(api);

api.get('/', (request, response) => {
  response.status(200).json({
    message: 'hello'
  });
});

(() => {
  server.listen(3001, () => {
    console.info(`Server is running at 3001`);
  });
})();
