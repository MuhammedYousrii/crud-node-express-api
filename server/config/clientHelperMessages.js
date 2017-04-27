const apiMethods = ['GET' , 'POST' , 'DELETE' , 'PATCH'];





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










module.exports = {
    apiMethods ,
    bugsMessages
}