const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-polyfill');
require('babel-core/register')(babelrc);
require('../src/server');
