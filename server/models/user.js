const {mongoose , Schema} = require('../db-config/mongoose.js');
const USERSCHEMA = new Schema ({
    email : {
        type : String ,
        required : true ,
        trim : true ,
        minlength : 1 ,
        maxlength : 50 ,
    },
    
});


var USER = mongoose.model("USER" , USERSCHEMA);


module.exports = {USER}