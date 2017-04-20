//Default Data Picker
const bodyParser = require('body-parser'); 
//Default View Engine
const hbs = require('hbs');


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
    
    "apiBreakDown" : {
        "error" : true ,
        "warning" : true ,
        "message" : `Api Didn't Support this Method`,
        "help" : `you should One Of those Methods Only ${apiMethods}`
    }
}






const serverConfig  = (app , framework) => {

    
    
    // Config The Env And Specfie  right URL For It .. 
    var env = process.env.NODE_ENV || "development" ;
    
    
    console.log(`Current Env is ****** ${env}`);

    
    if(env === "development" || env === "test" || env === "production"){
        var configList = require('./config.json');
        var envConfig = configList[env];
        
        Object.keys(envConfig)
            .forEach((key) => {
            process.env[key] = envConfig[key];
        })
    }
   


    
    



    //Express MiddleWares Configs Expression To Set Defaults
    app.use(framework.static(__dirname + '/public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    
    
    
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    
    
    
    
}





module.exports = {
    serverConfig ,
    apiMethods ,
    bugsMessages
};