require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
//consectdb
const connectDB=require('./db/connect')
//routers

const PlayerClassRouter=require('./routes/playerClass')
const GamesRouter=require('./routes/games')
const CustomerRouter=require('./routes/CustomerRequires')
const MainPageRouter=require('./routes/MainPage')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());
const helmet=require('helmet');
const cros=require('cors');
const xss=require('xss-clean');

// routes
app.get('/el3b-server/', (req, res) => {

  res.send('Hello World!')
})

app.use('/el3b-server/api/v1/playerclass',PlayerClassRouter);
app.use('/el3b-server/api/v1/games',GamesRouter);
app.use('/el3b-server/api/v1/Customer',CustomerRouter);
app.use('/el3b-server/api/v1/MainPage',MainPageRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



app.use(helmet());
app.use(cros());


app.use(xss());

const port = process.env.PORT || 10000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
};

start();
