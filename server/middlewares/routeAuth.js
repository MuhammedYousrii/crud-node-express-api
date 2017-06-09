// Import User Model 
const {USER} = require('./../models/user');
//Import BugsMessages array
const {bugsMessages} = require('./../config/config.js');
//Import _lodash from Node_modules
const _ = require('lodash');



// Middleware That Check If User Login Before Or Not
const routeAuth = (req , res , next) => {

    // Get Our Token val From RequestHeader
    const token = req.header('x-auth');
    
    //Use USER Static Method To Check If This User Exist 
    USER.findByToken(token).then(user => {
       
        
        // If Not Found Return Reject
        if(!user){
            return Promise.reject();
        }
        
        

        // if Found that user 
        req.user = user ;
        req.token = token;  
        next();
        
    }).catch(e => {
        res.status(401).send(bugsMessages.notAuth);
    })
    
    
    
};



module.exports = {
    routeAuth 
}