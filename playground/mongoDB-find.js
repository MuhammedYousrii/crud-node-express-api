// Using ES6 Destrcturing Object 
 const {MongoClient , ObjectID} = require('mongodb') ;



MongoClient.connect('mongodb://localhost:27017/todoApp' , (err , db) => {
    
    if(err){
         throw new Error ('Error Happen when Connecting to DataBase ' + err);
        return false ;
    }
    
    console.log('successFully Connected To server');
    var usersCol = db.collection('Users');
    usersCol.find({name : "Muhammed Yousrii"}).toArray().then((col) => {
        console.log(JSON.stringify(col , false , 2));
    }).catch((err) => {
        console.log(err)
    });
    
    
    db.close();
});
