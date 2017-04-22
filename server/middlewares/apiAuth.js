const {apiMethods , bugsMessages} = require('./../config/config');

// Create Utility Decitions To Determine Sites that Can Use those apis
const apiAuth = (req , res , next) => {
    if (req.protocol == "http" || req.protocol == "https"){
        if (apiMethods.indexOf(req.method) !== -1){
            if(req.hostname == "localhost" || req.hostname == "still-island-16985.herokuapp.com"){
                return next();
            }
        }
    }

    
    res.status(503).json(bugsMessages.apiBreakDown);
    


};


module.exports = {
    apiAuth
}



