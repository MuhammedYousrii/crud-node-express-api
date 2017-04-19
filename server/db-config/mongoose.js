const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const dbUsername = "muhammedyousrii";
const dbPassword = 2251365478;
const dbURI = `mongodb://${dbUsername}:${dbPassword}@ds161410.mlab.com:61410/crudexpresstodoapi` ;



mongoose.Promise = global.Promise ;
mongoose.connect(dbURI || `mongodb://localhost:27017/todoApp`);



module.exports = {
    mongoose ,
    Schema 
}