const express = require('express');
const path = require('path');
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function() {
  console.log('server is running : ', PORT);
});
