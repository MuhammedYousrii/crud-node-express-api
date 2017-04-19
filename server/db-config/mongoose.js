const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const dbUsername = 'muhammedyousrii';
const dbPassword = '251365478';

mongoose.Promise = global.Promise ;
mongoose.connect(`mongodb://<${dbUsername}>:<${dbPassword}>@ds161410.mlab.com:61410/crudexpresstodoapi `
                 ||
                 'mongodb://localhost:27017/todoApp');


module.exports = {
    mongoose ,
    Schema 
}