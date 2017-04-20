// third-part Modules requireation 
const express = require('express');
const TodoApp = express();
const {ObjectID} = require('mongodb');
const _ = require('lodash');



// Import & Fire Configruation methods
const {serverConfig ,apiMethods , bugsMessages } = require('./config/config')
serverConfig(TodoApp , express);
const port =  process.env.PORT;

// Our MongooseDB , Models Config Importaion
const {mongoose , Schema} = require('./db-config/mongoose');
const {USER} = require('./models/user');
const {TODO} = require('./models/todo');








// i've To Host With Two Environment one To Develop and Another For Production  
// production one -->  still-island-16985.herokuapp.com
// develop one --> localhost


// Create Utility Decitions To Determine Sites that Can Use those apis
TodoApp.use((req , res , next) => {
    if (req.protocol == "http" || req.protocol == "https"){
        if (apiMethods.indexOf(req.method) !== -1){
            if(req.hostname == "localhost" || req.hostname == "still-island-16985.herokuapp.com"){
                return next();
            }
        }
    }

    
    res.status(503).json(bugsMessages.apiBreakDown);
    


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
                return res.status(404).json(bugsMessages.notFound);
            }
            return res.status(200).send({todo});
        }).catch(e =>  { 
            return res.status(400).send(e)
        })
    }
    else {
        return res.status(400).json(bugsMessages.inValidId)
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
        return res.status(400).json(bugsMessages.inValidId)
    }
    
    TODO.findByIdAndRemove(todoID).then(docs => {
       if(!docs){
           return res.status(404).json(bugsMessages.notFound);
       }
       res.status(200).send(docs); 
        
        
    }).catch(err => {
        return res.status(400).send(err);
    })
}) 




//Update by Spefic id 
TodoApp.patch('/todos/:id?' , (req , res) => {
    var id = req.params.id ;
    
    var reqBody = _.pick(req.body , ['text' , 'completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(400).json(bugsMessages.inValidId)
    }
    
    if(_.isBoolean(reqBody.completed) && reqBody.completed){
        reqBody.completedAt = new Date().getTime() ;
    }else {
        reqBody.complete = false ;
        reqBody.completedAt = null ;
    }
    
    
    
    
    TODO.findByIdAndUpdate(id , {$set : reqBody} , {new : true}).then(doc => {
        if(!doc){
            return res.status(404).json(bugsMessages.notFound);
        }
        
        
        res.status(200).send({doc})
    }).catch(e => {
        return res.status(500).send(e);
    })
    
})








// Listening Port 
TodoApp.listen(port , () => {
    console.log(`Server is Listening On Port ${port}  SuccessFully`);
})
    
    
    
    
    
    

//Export TodoApp To Be Avaliable For TestMethods On it 
module.exports = {TodoApp} ;