const mongoose = require('mongoose');

var conn = mongoose.connect("mongodb+srv://jasmeetgaba77:fr0m5hZ7uBmCZU4a@cluster0.t1h7ujb.mongodb.net/demo?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=>console.log("connected successfully..."))
    .catch((err)=>console.log(err));

    module.exports = conn;