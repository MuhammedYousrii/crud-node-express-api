const {mongoose , Schema} = require('../db-config/mongoose');




const TODOSCHEMA = new Schema ({
    text : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 50 ,
        trim : true ,
    },
    completed : {
        type : Boolean , 
        default : false ,
    },
    completedAt : {
        type : Number , 
        default : null ,
}
});



    
    



var TODO = mongoose.model("TODO" , TODOSCHEMA);

module.exports = {TODO}