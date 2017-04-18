// Using ES6 Destrcturing Object 
 const {MongoClient , ObjectID} = require('mongodb') ;



MongoClient.connect('mongodb://localhost:27017/todoApp' , (err , db) => {
    
    if(err){
         throw new Error ('Error Happen when Connecting to DataBase ' + err);
        return false ;
    }
    
    console.log('successFully Connected To server');
    
    
    
    
    var usersCol = db.collection('Users');
    
    usersCol.findOneAndUpdate(
        {"name" : "Muhammed Adel"},
        
        {
            $set : { "location" : "elasher" } ,
            $mul : { 'age' : 2 },
            $unset : {'lvl3' : true}
        },
        
        
        {
            returnOriginal : false ,
        })
    .then((docs) => {
        console.log(JSON.stringify(docs , false , 2 ));
    }).catch(error => {
        console.log(error);
    })
    
    
    db.close();
});
