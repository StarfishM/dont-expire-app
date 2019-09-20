const express = require('express');
const app = (exports.app = express());
const compression = require("compression");

const path = require('path');

app.use(compression());
//___________BOILER PLATE FOR REQ.BODY POST REQ NOT TO BE EMPTY____________
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

//////////////////////////////////////
///////////////Routes////////////////
////////////////////////////////////


app.listen(4711);
console.log('Open http://localhost:4711/ in Browser to start');
