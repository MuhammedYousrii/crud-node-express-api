const {ObjectID} = require('mongodb');
//TODO Coll Simulations
module.exports.todoos = [
    {
        // create random id by using Monog ObjectID
        _id : new ObjectID ,
        "text" : "FIRST TODO IN COLL" ,
        "completed" : false 
    },
    
    {
        _id : new ObjectID ,
        "text" : 'SECOND TODO IN COLL' ,
        "completed" : false 
    }
];