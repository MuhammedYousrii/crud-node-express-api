const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


console.log(`DB NAME ------>>>> *******  ${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise ;
mongoose.connect(process.env.MONGODB_URI || `mongodb://muhammedyousrii:2251365478@ds161410.mlab.com:61410/crudexpresstodoapi `);



module.exports = {
    mongoose ,
    Schema 
}