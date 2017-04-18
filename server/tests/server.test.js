//require third-part Modules 
const expect = require('expect');
const request = require('supertest');


// require our modules 
const {TodoApp} = require('./../server');
const {TODO} = require('./../models/todo');


const  todoos = [
    {
        "text" : "First TODO Is Here" ,
    },
    {
        "text" : 'Second TODO IS Here' ,
    }
];

beforeEach((done) => {
    TODO.remove({}).then(() => {
        return TODO.insertMany(todoos);
    }).then(() => done());
});


//Modular our test with DescribeKeyword 
describe("POST /todos" , () => {
    
    it("should Get Data from Req Then save It To DB" , (done) => {
       
        var text = "ahmed" ;
        
        
        
        request(TodoApp)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text)
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
            
                
            })// ENDFunc end

    })//it end ..
    
    
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
    
    
    
})//describe end ..


describe('GET /todos' , () => {
    
    it("Should return All Todos Inside Of DB" , done => {
        request(TodoApp)
            .get('/todos')
            .expect(200)
            .expect(res => {
            expect(res.body.docs.length).toBe(2);
        }).end(done)
    })// End Of IT ..
    
})//END of Get Describe 


