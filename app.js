var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(
    function(req,res,next){
        console.log('Olen master middleware, minut suoritetaan aina koska olen ennen reitityksiä');
        next();
    }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    function(req,res,next){
        console.log('Olen secondary middleware. Minut suoritetaan, jos käytetään jotain muuta kuin public-kansiota');
        next();
    }
);

app.get('/hi/',
    function(request,response){
        response.send('Olen yleinen tervehtijä ilman parametrejä<br><br>Kiva että vierailet täällä!');
        console.log('Terhetijä suoritettiin');
    }
);

app.get('/hi/:firstname',
    function(request,response){
        response.send('Olen yhden parametrin tervehtijä!<br><br>Tervehdys ' + request.params.firstname);
        console.log('Terhetijä suoritettiin');
    }
);

app.get('/hi/:firstname/:lastname',
    function(request,response){
        response.send('Olen kahden parametrin tervehtijä!<br><br>Tervehdys ' + request.params.firstname + ' ' + request.params.lastname);
        console.log('Terhetijä suoritettiin');
    }
);

app.post('/posttest/',
    function(request,response){
        console.log('POST-pyyntö vastaanotettu:');
        console.log(request.body);
        response.json({message: 'Tietosi vastaanotettu onnistuneesti!', data: request.body });
    }
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
