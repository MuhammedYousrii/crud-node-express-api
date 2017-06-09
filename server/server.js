// Import Express Module From Node_modules
const express = require('express');
// declare App EQ To Express MainFunction That Give it access To all features
const TodoApp = express();
//Import ObjectID Class From MongoDB Drive
const {ObjectID} = require('mongodb');
//Import Lodash utilites From Node_Modules
const _ = require('lodash');




// Import & Fire Configruation methods
const { envConfig ,
        expressConfig ,
        apiMethods ,
        bugsMessages } = require('./config/config');

//Fire Environment Configuration Controller
envConfig();
//Fire Express Server Configuration Controller
expressConfig(TodoApp , express);


const port =  process.env.PORT;


// Our MongooseDB , Models Config Importaion
const {mongoose , Schema} = require('./db-config/mongoose');
const {USER} = require('./models/user');
const {TODO} = require('./models/todo');


//Import Our Middleware Functions 
const {apiAuth} = require('./middlewares/apiAuth');
const {routeAuth} = require('./middlewares/routeAuth');


//Use APiAUth As Default Middleware To protect Our services
TodoApp.use(apiAuth);







TodoApp.get('/' , (req , res) => {
    res.status(200).render('index');
})


TodoApp.get('/error-page' , (req , res) => {
    res.status(503).render('error-page' , bugsMessages.notFound);
})




// Queries Depends on Routes
//Recive Post Req From Client    
TodoApp.post('/todos' , (req , res) => {
    //Create New Todo Modle From Master TODO Model With ClientReq Data 
    let newTodo = new TODO ({
        "text" : req.body.text ,
        "completed" : req.body.completed ,
        "completedAt" : req.body.completedAt
    });
    
    
    //Save It To DB
    newTodo.save().then(docs => {
        //If Done Send Ok Message
        res.status(200).send({docs});
    }).catch(e => {
        //Else erros send BadReq Massege
        res.status(400).send(e);
    })
});






//Get All Todos From Database
//Recive Get Req From Client
TodoApp.get('/todos' , (req , res) => {
    //Find All Todos In Collections 
    TODO.find({}).then(docs => {
        // If Done Send Ok Messages
        res.status(200).send({docs});
    }).catch(e => {
        //else errors Send badreq 
        res.status(400).send(e);
    })
    
});



// Get speific Todo with it's id
//recive Get Req With Id Params
TodoApp.get('/todos/:id?' , (req , res) => {
    //pick Param Val
    var id = req.params.id ;
    //check if ID Valid
    var checkIdValid = ObjectID.isValid(id);
    
    //If Valid
    if(checkIdValid){
        // Go Search into Coll's find Todo With this id  
        TODO.findById(id).then(todo => {
            //If Not Found
            if(!todo){
                //respond With NotFound Message
                return res.status(404).json(bugsMessages.notFound);
            }
            //If Done respond With Ok Message
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





TodoApp.post('/users' , (req , res) => {
    var reqBody = _.pick(req.body , ['email' , 'password']);
    
    var newUser = new USER({
        "email" : reqBody.email ,
        "password" : reqBody.password 
    });
    
    newUser.save().then(() => {
        return newUser.genAuthToken();
    }).then(token => {
        res.header('x-auth' , token).send({newUser})
    }).catch(e => {
        res.status(400).send(e)
    })
})

TodoApp.get('/users/me' , routeAuth  ,(req , res) => {
    
        res.status(200).send(req.user);
        
})





// Listening Port 
TodoApp.listen(port , () => {
    console.log(`Server is Listening On Port ${port}  SuccessFully`);
})
    
    
    
    
    
    

//Export TodoApp To Be Avaliable For TestMethods On it 
module.exports = {TodoApp} ;