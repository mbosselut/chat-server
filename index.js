const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Sse = require('json-sse');
const cors = require('cors');

const corsMiddleware = cors();

app.use(corsMiddleware);

app.use(jsonParser);

app.get('/', (req, res, next) => {
	res.send('hello world');
});

const stream = new Sse();
// DB would be used instead of 'rooms' or 'messages'
const messages = {};

app.get('/stream', (req, res, next) => {
	const rooms = Object.keys(messages);
	const string = JSON.stringify(rooms);
	stream.updateInit(string);
	stream.init(req, res);
});

app.get('/rooms/:roomName', (req, res, next) => {
	const { roomName } = request.params;
	const stream = streams[roomName];
	// const messages = {fun : ['hi', 'hi there'], room2: ['coucou']}
	const data = messages[roomName];
	// data === ['hi', 'hi there']
	const string = JSON.stringify(data);
	stream.updateInit(string);
	stream.init(req, res);
});

function send(data) {
	const string = JSON.stringify(data);
	stream.send(string);
}

app.post('/room', (req, res, next) => {
	const { name } = req.body;
	send(name);
	rooms.push(name);
	messages[name] = [];
	streams[name] = new Sse();
	res.send(name);
});

app.get('/message', (req, res, next) => {
	res.send(messages);
});

app.post('/message/:roomName', (req, res, next) => {
	const { message } = req.body;
	const { roomName } = request.params;
	const room = messages[roomName];
	room.push(message);
	const stream = streams[roomName];
	const string = JSON.stringify(message);
	stream.send(string);
	// messages.push(message);
	res.send(message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
