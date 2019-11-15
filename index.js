const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

const messages = [];

app.get('/message', (req, res, next) => {
  res.send(messages);
})

app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
