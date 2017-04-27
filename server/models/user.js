const {mongoose , Schema} = require('../db-config/mongoose.js');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptJS = require('bcryptjs');




//UserModel Doc Fields Validtaions
const USERSCHEMA = new Schema ({
    
    email : {
        type : String ,
        required : true ,
        trim : true ,
        minlength : 1 ,
        maxlength : 50 ,
        unique : true ,
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
    const self = this ;
    var selfObj = self.toObject();
    
    var clientObj = _.pick(selfObj , ['email' , '_id']);
    
    return clientObj ;
    
}



USERSCHEMA.methods.genAuthToken = function(){
    // self Mean The new User Document Sended From Client And Set To USERMODEL
    let self = this ;
    const access = 'auth' ;
    const token = jwt.sign({"_id" : self._id.toHexString() , access } , 'abc123').toString();
    
    
    self.tokens.push({access , token})
    
    return self.save().then(() => {
        return token;
    });
};



USERSCHEMA.statics.findByToken = function (token){
    var USER = this ;
    var decoded ;
    
    try {
        decoded = jwt.verify(token , 'abc123') ;
    }catch(e){
     
        return  Promise.reject('Invalid Token , Faild Auth')
    }
    
    

    
    var authUser = USER.findOne({
        '_id' : decoded._id ,
        'tokens.token' : token ,
        'tokens.access' : decoded.access 
        
    });
    
    
    
    
    
    return authUser ;
}



USERSCHEMA.pre('save' , function(next){
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







var USER = mongoose.model("USER" , USERSCHEMA);




module.exports = {USER}