//Import BodyParser From Node_modules
const bodyParser = require('body-parser'); 
//Import hbs 3d Party Module From Node_modules
const hbs = require('hbs');





// Our Controller to set Default config For Our Express Server
const expressConfig  = (app , framework) => {


   


    
    



    //Express MiddleWares Configs Expression To Set Defaults
    app.use(framework.static(__dirname + './../view/public' , {
            "dotfiles" :  "allow"  
        })
          
    );

    // Use bodyParser Package as Default one To Parse reqs , urls    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    
    
    
    //Set My View Dir 
    app.set('views', __dirname + './../view');
    //Set My Template Engine 
    app.set('view engine', 'hbs');
    
    
    
    
}


//Export it to outside
module.exports = {
  expressConfig ,  
}