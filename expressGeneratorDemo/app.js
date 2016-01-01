var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');//ejs jade
app.engine('.html',require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session 配置
app.use(session({
  secret: 'xxoo',
  name: 'ivan',   //这里的name值得是cookie的name，将会作为cookie随请求发给客户端，默认cookie的name是：connect.sid
  cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true
}));


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件,注意应用级中间件的顺序
app.use(function (req, res, next) {
  console.log('应用级Time:', Date.now());
  if(req.session){
    console.log('session 存在');
  }else{
    console.log('session 不存在');
  }
  if(req.session.sessionName){
    console.log('sessionName page was: '+req.session.sessionName);
  }
  //设置session
  req.session.sessionName='sessionName';
  //销毁session
  // req.session.destroy(function(err) {
  //   // cannot access session here
  // });

  next();
});

app.use('/', routes);
app.use('/users', users);




// app.get('/login',function(req,res){
//   res.setHeader('AuthorityId', 'xxoo1100');
//   res.send('hello login');
//   //console.log(res);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
