var express = require('express');
var logger = require('morgan');
var debug = require('debug')('app');

var errorRoutes = require('./routes/error.js');

var configuration = require('./configuration.js');

var backend = require('./services/backend-api.js')(configuration.apiBaseUri);

debug(configuration);

var app = express();
app.set('views', './server/templates');
app.set('view engine', 'html');
app.set('layout', 'layout');
if(configuration.cacheTemplates) {
  app.enable('view cache');
}
app.engine('html', require('hogan-express'));
app.use(logger(configuration.httpLogging));
app.use(express.static('client'));

app.get('/', (req,res)=> {
  res.locals.name='world';
  res.render('index', {message: 'this is a message'});
});

app.get('/api/latest', (req, res) => {
  backend.latest()
    .then((response)=> res.json(response.data));
});

app.use(errorRoutes);

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;
  debug('Example app listening at http://%s:%s', host, port);
});
