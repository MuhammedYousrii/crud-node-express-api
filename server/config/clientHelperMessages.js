//Provide Array Of Avalibles apis that Supported by this service
const apiMethods = ['GET' , 'POST' , 'DELETE' , 'PATCH'];




// List Of Bugs Messges That Sent To client in different cases to Provide good feedback
const bugsMessages = {
    "inValidId" : {
        "error" : true ,
        "warning" : false ,
        "errorMessage" : "Bad Req With Invaild Id ,, IT May Cause Problems" ,
        "help" : "Try Again With Valid One"
    },
    
    "notFound" : {
        "error" : false ,
        "warning" : true ,
        "warningMessage" : "Program Can't Find Todo With This Parameter",
        "help" : "Please Try Again With Correct One"
    },
    
    'notAuth' : {
        'danger' : true ,
        'error' : false ,
        'warning' : 'true',
        'dangerMessage' : 'not authorized , InvalidTokens'
    } ,
    
    "apiBreakDown" : {
        "error" : true ,
        "warning" : true ,
        "message" : `Api Didn't Support this Method`,
        "help" : `you should One Of those Methods Only ${apiMethods}`
    }
}









//Export those data To outside
module.exports = {
    apiMethods ,
    bugsMessages
}