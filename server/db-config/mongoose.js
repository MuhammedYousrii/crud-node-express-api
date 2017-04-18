const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


mongoose.Promise = global.Promise ;
mongoose.connect('mongodb://localhost:27017/todoApp');


module.exports = {
    mongoose ,
    Schema 
}