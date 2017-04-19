const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


console.log(`DB NAME ------>>>> *******  ${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise ;
mongoose.connect(process.env.MONGODB_URI);



module.exports = {
    mongoose ,
    Schema 
}