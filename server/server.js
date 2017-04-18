// third-part Modules requireation 
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb'); 



// Our Modules Importaion
const {mongoose , Schema} = require('./db-config/mongoose');
const {USER} = require('./models/user');
const {TODO} = require('./models/todo');

//avalibales Methods For Dealing With this Api
const apiMethods = ['GET' , 'POST' , 'DELETE' , 'UPDATE'];


//Our Express APP
const TodoApp = express();




//Express MiddleWares Expression
TodoApp.use(bodyParser.json());
TodoApp.use((req , res , next) => {
    if (apiMethods.indexOf(req.method) == -1){
        return res.send(`Error Api Didn't Support this Method ${req.method}`);
    }
    
    next();
})




    
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



TodoApp.get('/todos' , (req , res) => {
    
    TODO.find({}).then(docs => {
        res.send({docs});
    }).catch(e => {
        res.status(400).send(e);
    })
    
});




TodoApp.get('/todos/:id' , (req , res) => {
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
    












// Listening Port 
TodoApp.listen(3000 , () => {
    console.log('Listening On Port 3000 SuccessFully');
})
    
    
    
    
    
    

//Export App Module To Test On it 
module.exports = {TodoApp} ;