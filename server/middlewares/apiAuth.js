// Import BugsMessage ,, Api Avaliable Methods From Config
const {apiMethods , bugsMessages} = require('./../config/config');

// Create Utility Decitions To Determine Sites that Can Use those apis
const apiAuth = (req , res , next) => {
    // Check If Protocol EQ To HTTP , HTTPS
    if (req.protocol == "http" || req.protocol == "https"){
        // Check If Used Method One Of Avalible
        if (apiMethods.indexOf(req.method) !== -1){
            // Check IF Host name One OF Those To Limit access
            if(req.hostname == "localhost" || req.hostname == "still-island-16985.herokuapp.com"){
                // If All Those Condition True go on 
                return next();
            }
        }
    }

    
    // else return service unavalibale
    res.status(503).json(bugsMessages.apiBreakDown);
    


};


module.exports = {
    apiAuth
}



