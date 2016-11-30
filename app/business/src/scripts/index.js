'use strict';

var sub = require('./views/sub');
var app = document.createElement('div');
app.innerHTML = '<h1>Hello World Princeraul, webpack dev server</h1>';
app.appendChild(sub());
document.body.appendChild(app);
