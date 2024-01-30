// const {MongoClient} = require('mongodb')

// let db
// function connectToDb(startServer) { //connection establishment // strtserver callback func aa act aagudhu
//     // let db = 
//     MongoClient.connect('mongodb://localhost:27017/ExpenseTracker')
//     .then(function(client){ //async func aa handle pandradhuku na .then use pani irukken (also promise use pannala but here it is simple naala i use .then)
//         db = client.db() //client.db() accessing db using client //after connect with client 
//         return startServer()
//         // console.log(db)
//     }).catch(function(error) {  // catch the error if occurs while connection establishment
//         return startServer(error)
//     })
// }

// function getDb() {
//     return db
// }

// module.exports = {connectToDb, getDb}

// //------------------------------------------------------------------------------------------------------------------------------------------------------

// const {MongoClient}=require('mongodb');
// let db;

// function connectToDb(startServer){
//     MongoClient.connect('mongodb://localhost:27017/ExpenseTracker').then(function(client){  //its a async function so using .then
//         db=client.db();
//         return startServer();
//     }).catch(function(error){
//         startServer(error)
//     });   //this is used for connecting to the database 
// }

// function getDb(){
//     return db;
//     // console.log(db);
// }

// module.exports={connectToDb,getDb};

// ----------------------------------------------------------------------------------------------------------

const {MongoClient} = require('mongodb')

let db
function connectToDb(startServer) {
    MongoClient.connect('mongodb+srv://Kowsika_P:clusters_123@cluster.qjozvh4.mongodb.net/test?retryWrites=true&w=majority').then(function(client) {
        db = client.db()
        return startServer()
    }).catch(function(error) {
        return startServer(error)
    })
}

function getDb() {
    return db
}

module.exports = {connectToDb, getDb}