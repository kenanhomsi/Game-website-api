require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
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

// routes

app.use('/api/v1/playerclass',PlayerClassRouter);
app.use('/api/v1/games',GamesRouter);
app.use('/api/v1/Customer',CustomerRouter);
app.use('/api/v1/MainPage',MainPageRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:5173', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());


const port = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
