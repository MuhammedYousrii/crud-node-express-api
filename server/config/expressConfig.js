const bodyParser = require('body-parser'); 
const hbs = require('hbs');






const expressConfig  = (app , framework) => {


   


    
    



    //Express MiddleWares Configs Expression To Set Defaults
    app.use(framework.static(__dirname + './../view/public' , {
            "dotfiles" :  "allow"  
        })
          
    );
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    
    
    
    
    app.set('views', __dirname + './../view');
    app.set('view engine', 'hbs');
    
    
    
    
}



module.exports = {
  expressConfig ,  
}