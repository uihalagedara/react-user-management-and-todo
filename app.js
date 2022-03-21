const express = require('express');
const app = express();
const passport = require('passport')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());

const port = 8000;

const URL = "mongodb+srv://upendra:U4541735@itpdemo.sorrs.mongodb.net/UserManagement?retryWrites=true&w=majority";

mongoose.connect(URL,{
    useNewUrlParser: true
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("mongodb Connectoin Success!");
})


const userRouter = require('./routes/User')
app.use('/user',userRouter)


app.listen(port, ()=>{
    console.log("Server is up and running on port: ", port);
    //console.log(port);
})