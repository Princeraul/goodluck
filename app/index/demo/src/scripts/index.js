import '../styles/app.scss';

import './views/Plugin';
import $ from 'jquery';
import generateText  from './views/sub';

let app  = document.createElement('div');

$('p').greenify();

document.body.appendChild(app);
app.appendChild(generateText());
