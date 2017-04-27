var configList = require('./config.json');


const envConfig = () => {
    

// i've To Host With Three Environment one To Develop and Another For Production  
    // production one -->  still-island-16985.herokuapp.com
    // develop one --> localhost
    // test one --> localhost
    // Config The Env And Specfie  right URL For It .. 
    var env = process.env.NODE_ENV || "development" ;
    
    
    console.log(`Current Env is ****** ${env}`);

    
    if(env === "development" || env === "test" || env === "production"){
        
        var envConfig = configList[env];
        
        
        
        Object.keys(envConfig)
            .forEach((key) => {
            process.env[key] = envConfig[key];
        })
        
        
    }
    
    
    

};


module.exports = {
    envConfig ,
}