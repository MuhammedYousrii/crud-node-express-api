// Impport Mongoose Config 
const {mongoose , Schema} = require('../db-config/mongoose');



//create New Schema With Name TodoSchema Via Constructor Function  
const TODOSCHEMA = new Schema ({
    // Setup our validators for Text Field
    text : {
        // type
        type : String ,
        // should be filled in 
        required : true ,
        // at leaset 2 chars
        minlength : 2 ,
        // max 50 chars
        maxlength : 50 ,
        // remove with spaces
        trim : true ,
    },
    // Setup our validators for completed Field
    completed : {
        type : Boolean , 
        default : false ,
    },
    // Setup our validators for completeAt Field
    completedAt : {
        type : Number , 
        default : null ,
}
});



    
    


// declare new model with our custom Schema
var TODO = mongoose.model("TODO" , TODOSCHEMA);

//Export it to Outside
module.exports = {TODO}