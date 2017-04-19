const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const dbUsername = 'muhammedyousrii';
const dbPassword = '251365478';

mongoose.Promise = global.Promise ;
if(mongoose.connect(process.env.MONGOURI ||'mongodb://localhost:27017/todoApp'))
{
    console.log('connected')
    console.log(process.env.MONGOURI);
}





module.exports = {
    mongoose ,
    Schema 
}