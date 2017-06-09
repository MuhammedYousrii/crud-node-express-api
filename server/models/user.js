//import Mongoose Config
const {mongoose , Schema} = require('../db-config/mongoose.js');
//Import Validator Package from Node_modules
const validator = require('validator');
//Import JWT Package From Node_modules
const jwt = require('jsonwebtoken');
//Import Lodash Utitlites Lib From Node_modules
const _ = require('lodash');
//Import bctyptJs From Node_modules
const bcryptJS = require('bcryptjs');




//UserModel Doc Fields Validtaions
const USERSCHEMA = new Schema ({
    // Setup our validators for email Field
    email : {
        //type
        type : String ,
        // mustbe filled in
        required : true ,
        //remove white spaces
        trim : true ,
        //at least 2 chars
        minlength : 1 ,
        //max 50 chars
        maxlength : 50 ,
        //not equal any mail
        unique : true ,
        //custom validation by using Mongoose Validate Obj
        validate : {
            validator : (value) => {
                return validator.isEmail(value) ;
            },
            message : `{value} is Not Valid Email`
        }
    },
    
    password : {
        type : String ,
        required : true ,
        minlength : 5 ,
        trim : true ,
        unique : true ,
    },

    //setup Our Tokens That Guard Routes 
    tokens : [{




        access : {
            type : String ,
            required : true
        },
        
        token : {
            type : String ,
            required : true ,
            unique : true ,
            trim : true
        }
        
    }]
    
});



//UserModel Custom Helper Methods For Creating  Tokens And Send Spefic Data To Client
USERSCHEMA.methods.toJSON = function (){
    //Self Refer To Any instance Will Created Of This model
    const self = this ;

    // convert Json Into JsObj
    var selfObj = self.toObject();
    
    //Using Lodash Custom Method To pick Spefic Data
    var clientObj = _.pick(selfObj , ['email' , '_id']);
    
    //Return it
    return clientObj ;
    
}


// Generate Tokens For New signedup users 
USERSCHEMA.methods.genAuthToken = function(){
    // self refer to the instances created of user model
    let self = this ;
    // Set Access Type To auth
    const access = 'auth' ;
    // Create Token On  random _id Value
    const token = jwt.sign({"_id" : self._id.toHexString() , access } , 'abc123').toString();
    
    //Push It Into Instance Tokens Arr
    self.tokens.push({access , token})
    
    //save This User To Database
    return self.save().then(() => {
        return token;
    });
};



//Setup Static Method To be avaliable Only For Master Model
USERSCHEMA.statics.findByToken = function (token){
    //This Refer To USER MODEL
    var USER = this ;
    var decoded ;
    
    try {
        //decode or decrypt sentTokens From Client with My Secert Keyword 
        decoded = jwt.verify(token , 'abc123') ;
    }catch(e){
        // if decode fail it's not valid tokens
        return  Promise.reject('Invalid Token , Faild Auth')
    }
    
    

    // finde user by it's Token Data
    var authUser = USER.findOne({
        '_id' : decoded._id ,
        'tokens.token' : token ,
        'tokens.access' : decoded.access 
        
    });
    
    
    
    
    
    return authUser ;
}





// Model Middlewares That Get ecxuted Before Query run
// it's feature Produced by mongoose
USERSCHEMA.pre('save' , function(next){
    //self refer to instance of USER MODEL
    const self = this ;
    var modfied = self.isModified('password');
    
    
    if(modfied){
        bcryptJS.genSalt(10 , (err , salt) => {
            if(err){return next(err);}
            
            bcryptJS.hash(self.password , salt , (err , hashedPasswored) => {
             
                if (err){return next(err);}   
                self.password = hashedPasswored ;
                next();
            })
        })
    }else {
        next();    
    }
    
    
})






//Declare User Model EQ To UserSchema
var USER = mongoose.model("USER" , USERSCHEMA);



//Export It to Outside
module.exports = {USER}