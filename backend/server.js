// importing modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//importing local components/functions
require('dotenv').config();

//app config
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// db config
const uri = 'mongodb+srv://eren:erenmongo@siperatdemodb.0h5ly.mongodb.net/siperat-database-demo?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//???

//api routes
const usersRouter = require('./routes/usersRoute');
const suratRouter = require('./routes/suratRoute');
const bukuTamuRouter = require('./routes/bukuTamuRoute');

app.use('/surat', suratRouter);
app.use('/users', usersRouter);
app.use('/bukuTamu', bukuTamuRouter);

//listen
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

