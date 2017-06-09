//require third-part Modules 
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
// const testTodos = require('./fakeTodos.json');


// console.log(testTodos);



// require our modules 
const {TodoApp} = require('./../server');
const {TODO} = require('./../models/todo');


//TODO Coll Simulations
const  todoos = [
    {
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



//Remove All Coll Docs Then Insert Our Simulate To Get Better Tesing Results
beforeEach((done) => {
    TODO.remove({}).then(() => {
        return TODO.insertMany(todoos);
    }).then(() => done());
});



                    //************Modular our test with Describe Keyword\\***********


//Post Route Testing
describe("POST /todos ROUTE" , () => {
    
    
    
    it("Should Save ReqBody TO DBS" , done => {
        var text = "Test Post Route With New TODO" ;
        request(TodoApp)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {            
            expect(res.body.docs.text)
                .toExist("it Shouldn't be null")
                .toBeAn('string' , "it should be String type")
                .toBe(text);
        })
        .end((err , res) => {

            if(err){
                return done(err);
            }
        
             TODO.find({text}).then(docs => {
                    expect(docs.length).toBe(1);
                    expect(docs[0].text).toBe(text);
                    done();
             }).catch((e) => done(e));
            
            
        })// End Of assertion
    
    })//End Of It
    
    
    it("should Not Create Any Todo With Invalid Body Data" , done => {
        var invalidText = 22222 ;
        request(TodoApp)
            .post('/todos')
            .send({invalidText})
            .expect(400) 
            .end((err , res) => {
            
            if(err){
                return  done(err);
            }
            
           
            TODO.find({}).then(docs => {
                expect(docs.length).toBe(2);
                done();
            }).catch(err => {
                return done(err);
            })
            
            
        })
        
    });/// END OF Second IT ...
    
})//End Of Describe

 
    

//Get Route Testing
describe("GET /todos ROUTE " , () => {
    
      const testID = todoos[0]._id.toHexString();
    
    // Test Get All
    it("GET All Collecrion Docs" , done => {
        request(TodoApp)
        .get('/todos')
        .expect(200)
        .end((err , res) => {
            
            if(err){
                return done(err)
            }
            
            TODO.find({}).then(docs => {
                expect(docs.length).toBe(2);
                done();
            }).catch(e => {
                return done(e);
            })
            
            
            
        })// End Of Assertion
    
    })// End Of it 
    
    
    
    //Test Get By Id  & ruten 200 when Found
    it("Get Todo By It's Id" , done => {
        
        request(TodoApp)
        .get(`/todos/${testID}`)
        .expect(200)
        .expect(res => {

            //Check Equality 
            expect(res.body.todo.text).toBe(todoos[0].text , "It Should Be Convineit With This id");
            expect(res.body.todo.completed).toBe(todoos[0].completed , "It Should Be Convineit With This id");
            
            
            //check DataType
            expect(res.body.todo.text).toBeAn('string' , "It Should Be string");
            expect(res.body.todo.completed).toBeAn('boolean', "It Should Be boolean");
            
            
        })
            .end((err , res) => {
            
            
            if(err){
                return done(err);
            }
            
            TODO.findById(testID).then(docs => {
                expect(docs._id.toHexString()).toEqual(testID); 
                done();
            }).catch(err => {
              return done(err);   
            })
            
            
            
        })
    })// END OF IT
    
    
    //Test Get By Id & Return 404 when Not Found
    it("Return Bad Request With Invalid Id" , done => {
        
        var invalidID = testID + 2 ;
        request(TodoApp)
        .get(`/todos/${invalidID}`)
        .expect(400)
        .end((err ,res) => {
            if(err){
                return done(err);
            }
            
            TODO.findById(invalidID).then(todo => {
                
                if (!todo){
                    done();
                }
                
            }).catch(e => {
                return done();
            })
            
        })
    }) 
    

})//End Of Describe



