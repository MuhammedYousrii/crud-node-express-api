// Using ES6 Destrcturing Object 
 const {MongoClient , ObjectID} = require('mongodb') ;



MongoClient.connect('mongodb://localhost:27017/todoApp' , (err , db) => {
    
    if(err){
         throw new Error ('Error Happen when Connecting to DataBase ' + err);
        return false ;
    }
    
    console.log('successFully Connected To server');
    var todosCol = db.collection('todos');
    var usersCol = db.collection('Users');
    /*Delete Many Method*/
//    todosCol
//        .deleteMany({text : 'i will go night'})
//        .then((res) => {
//            console.log(JSON.stringify(res , false , 3));    
//    })
//        .catch((err) =>{
//            consolo.log(err);         
//    })
    
        /*Delete One*/
//    todosCol.deleteOne({"text" : "go out" }).then((res) => {
//        console.log(JSON.stringify(res , false , 2));
//    }).catch((err) => {
//        console.log(err);
//    })
//    
    
    /* find One And Delete have good feature  that it return deleted doc with callback*/
    usersCol.findOneAndDelete({'lvl3' : false}).then((docs) => {
        console.log(JSON.stringify(docs , false , 8));
    }).catch(error => {
        console.log(error);
    })
     
    
    db.close();
});
