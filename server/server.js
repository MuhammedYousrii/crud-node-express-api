// third-part Modules requireation 
const express = require('express');
const TodoApp = express();
const {ObjectID} = require('mongodb');




// Our MongooseDB , Models Config Importaion
const {mongoose , Schema} = require('./db-config/mongoose');
const {USER} = require('./models/user');
const {TODO} = require('./models/todo');




// Import & Fire Configruation methods
const config = require('./config/config')
config.serverConfig(TodoApp , express);
const port =  process.env.PORT   ;







// Create Utility Decitions To Determine Sites that Can Use those apis
TodoApp.use((req , res , next) => {
    if (req.protocol == "http" || req.protocol == "https"){
        if (config.apiMethods.indexOf(req.method) !== -1){
            console.log(req.hostname);
            return next();
        }
    }

    
    res.status(400).send({
        "error " : true ,
        "message" : `Api Didn't Support this Method ${req.method}`,
        "help" : `you should One Of those Methods Only ${apiMethods}`,
    });
    


});





// Queries Depends on Routes    
TodoApp.post('/todos' , (req , res) => {
    var newTodo = new TODO ({
        "text" : req.body.text ,
        "completed" : req.body.completed ,
        "completedAt" : req.body.completedAt
    });
    
    
    newTodo.save().then(docs => {
        res.send(docs);
    })
        .catch(e => {
        res.status(400).send(e);
    })
});






//Get All Todos From Database
TodoApp.get('/todos' , (req , res) => {
    
    TODO.find({}).then(docs => {
        res.send({docs});
    }).catch(e => {
        res.status(400).send(e);
    })
    
});
// Get speific Todo with it's id
TodoApp.get('/todos/:id?' , (req , res) => {
    var id = req.params.id ;
    var checkIdValid = ObjectID.isValid(id);
    
    if(checkIdValid){
        TODO.findById(id).then(todo => {
            if(!todo){
                return res.status(404).send ({
                    "error" : true ,
                    "message" : "Element With this Id Not Found At DB"  ,
                    "help" : "Check Your Id Then tryAgain"
                });
            }
            return res.status(200).send({todo});
        }).catch(e =>  { 
            return res.status(400).send(e)
        })
    }
    else {
        return res.status(400).send({
            "error" : true ,
            "message" : "Not Valid Id Strcture" ,
            "help" : "Try Another Time With another one ",
        })
    }
    
})
    






//Delete All Todos In Data Base 
TodoApp.delete('/todos' , (req , res) => {
    TODO.remove({}).then(docs => {
        if(! docs){
            return res.status(404).send({
                "error" : false ,
                "warning" : true ,
                "message" : "unabel To find Those Todos To Remove" ,
                "help" : "Try Again",
             })
        }
        res.status(200).send({docs});
    }).catch(err => {
        res.status(400).send(err);
    })
})
//Delete By specfied Id 
TodoApp.delete('/todos/:id' , (req , res ) => {
    var todoID = req.params.id ;
    var checkValid = ObjectID.isValid(todoID);
    
    if(!checkValid){
        return res.status(400).send({
            "error" : true ,
            "message" : "Todo Id Is Not Valid" ,
            "help" : "Try Again with Different id ",
        })
    }
    
    TODO.findByIdAndRemove(todoID).then(docs => {
       if(!docs){
           return res.status(404).send({
               "error" : false ,
               "warning" : true ,
               "Message" : "We Can't Find Todos With This id" ,
           })
       }
       res.status(200).send(docs); 
        
        
    }).catch(err => {
        return res.status(400).send(err);
    })
}) 









// Listening Port 
TodoApp.listen(port , () => {
    console.log(`Server is Listening On Port ${port}  SuccessFully`);
})
    
    
    
    
    
    

//Export TodoApp To Be Avaliable For TestMethods On it 
module.exports = {TodoApp} ;