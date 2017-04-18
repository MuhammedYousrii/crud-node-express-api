// Using ES6 Destrcturing Object 
 const {MongoClient , ObjectID} = require('mongodb') ;



MongoClient.connect('mongodb://localhost:27017/todoApp' , (err , db) => {
    
    if(err){
         throw new Error ('Error Happen when Connecting to DataBase ' + err);
        return false ;
    }
    
    
    
//    /* Process On Data Base By mongoNativeDriver Method*/
//    db.collection('todos').insertOne({
//        text : 'i will watch good moive ' ,
//        completed : false ,
//    }
//      ,(err , res) => {
//        if(err){
//            return new Error ('unable to insert this document' + err);
//            
//        }
//        console.log(JSON.stringify(res.ops , false , 2));
//    });
//    
    
    db.collection('Users').insertOne({
        name : "Muhammed Adel" ,
        location : "Shubra" ,
        age : 21 ,
        lvl3 : true , 
        hti : true ,
    }, (err , res) => {
        
        if(err){
            return new Error(`Unable To Insert New record ${err}`);
        }    
        
        console.log(JSON.stringify(res.ops , false , 2));
    
    
    });
    
    
    db.close();
});
