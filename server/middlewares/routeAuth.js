const {USER} = require('./../models/user');
const {bugsMessages} = require('./../config/config.js');
const _ = require('lodash');



const routeAuth = (req , res , next) => {

    const token = req.header('x-auth');
    
    
    USER.findByToken(token).then(user => {
       
        
        if(!user){
            return Promise.reject();
        }
        
        

        
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