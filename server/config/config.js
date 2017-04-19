//Default Data Picker
const bodyParser = require('body-parser'); 
//Default View Engine
const hbs = require('hbs');




const apiMethods = ['GET' , 'POST' , 'DELETE' , 'UPDATE'];







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
    apiMethods 
};