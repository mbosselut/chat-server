const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Sse = require("json-sse");

app.use(jsonParser);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

const stream = new Sse();
const messages = [];

app.get('/stream', (req, res, next) => {
  const string = JSON.stringify(messages);
  stream.updateInit(string);
  stream.init(req, res);
})

app.get("/message", (req, res, next) => {
  res.send(messages);
});

app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
