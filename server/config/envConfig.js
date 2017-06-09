// Import EnvConfig.JSON
var configList = require('./config.json');


// Create Controller For Dynamic Config
const envConfig = () => {
    

// i've To Host With Three Environment one To Develop and Another For Production  
    // production one -->  still-island-16985.herokuapp.com
    // develop one --> localhost
    // test one --> localhost
    // Config The Env And Specfie  right URL For It ..

    // Get Value Of Current Env type Or Set it to Development 
    var env = process.env.NODE_ENV || "development" ;
    
    
    //Log The Current Config
    console.log(`Current Env is ****** ${env}`);

    

    // If Env EQ To Any Of those
    if(env === "development" || env === "test" || env === "production"){
        
        //So My Current Env go Into Json Search For It's Data 
        var envConfig = configList[env];
        
        
        //Loop throught Keys Of Current Env Obj
        Object.keys(envConfig)
            .forEach((key) => {
            process.env[key] = envConfig[key];
        })
        
        
    }
    
    
    

};

//export it to Outside
module.exports = {
    envConfig ,
}