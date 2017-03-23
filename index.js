"use strict"

var express = require('express');
const bunyan = require('bunyan');
const bodyParser = require("body-parser");
const nodemailer = require('./lib/nodemailer');
const https = require('https');

var app = module.exports = express();

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// end of bodyParser

var allowCrossDomain = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'POST');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// intercept OPTIONS method
if ('OPTIONS' == req.method) {
    res.sendStatus(200);
} else {
    next();
}
};

app.use(allowCrossDomain);

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    // auth: {
    //     user: 'dstrvntr@gmail.com',
    //     pass:  'inidistra'
    // },
    auth: {
        type: 'OAuth2',
        user: 'dstrvntr@gmail.com',
        clientId: '984872888741-8bo9b9ltdjd42cm45jd0gi1rlpj7uo5c.apps.googleusercontent.com',
        clientSecret: 'JyMrCK9bOdVjz1ZQXoc5b-M3',
        refreshToken: '1/ntyg-y-ciNqrLtEsfARBUahtNi0gNsqqU2qth4InrDg',
        accessToken: 'ya29.GlsXBFaOkHWZ0p-4sIOTGacbx4P9rJmXZp9SWjPonz0SKvHzLLHuHc2LvB94Cd_TQ5gu-fQuYqUOUDXUhXUVtbrPqNs6DnBCi1WcrAEDHhyCLnylMVHcyQLJ8TiZ',
        expires: 12345
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Admin <no-reply@balizee.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

app.use('/api', function(req, res, next){
  var key = req.query['api-key'];

  if (!key) return next(error(400, 'api key required'));

  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  req.key = key;
  next();
});

app.post('/email', function(req, res, next){

  let message = {
      // 'distravantari <distravantari@gmail.com>'
      to: req.body.to,
      // 'Balizee is unicode friendly ✔ #'
      subject: req.body.subject, //
      // 'Hello ncy!'
      text: req.body.text
  };

  transporter.sendMail(message, (error, info) => {
      if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return;
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);

      res.send({ success: 'hai' });
      transporter.close();
  });

});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});

// var server = https.createServer(app);

if (!module.parent) {
  app.listen(80, function() {
    console.log("listening on 80");
  });
  // server.listen(80, function(){
  //     console.log("server running at port 80")
  // });
}
