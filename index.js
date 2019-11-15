const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res, next) => {
    res.send('hello world')
})

app.listen(port, () => console.log(`Listening on port ${port}`));