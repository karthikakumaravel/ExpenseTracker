// // npm install mongodb
// // npm install body-parser

// /* end points
// * 1.get-entries: fetching all teh entry data
// * 2.add-entry: new entries vandha add pandradhukkaaga
// * 3.delete-entry:
// * 4.edit-entry: 
// */

const express = require('express')
const bodyParser = require('body-parser')
// importing required functions
const {connectToDb, getDb} = require('./db.cjs')
const {ObjectId} = require('mongodb')

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))

// // connecting to the db
// connectToDb(){
//     //starting the server
//     app.listen(9000)
// }


let db
// Connecting to the DB
connectToDb(function(error) {
    if(!error) {
        // Starting the server
        const port = process.env.PORT || 9000
        app.listen(port)
        console.log(`Listening on port ${port}...`)
        db = getDb()
    } else {
        // Server would not start
        console.log(error)
    }
})

/** end points
 * get-entries : fetching all the entry data
 * add-entry
 * delete-entry
 * edit-entry
 */

// Adding a new entry
app.post('/add-entry', function(request, response) {
    db.collection('ExpenseData')
    .insertOne(request.body).then(function() { //it is an asyn func so add .then
        response.status(201).json({
            'status' : 'data successfully entered'
        })
    }).catch(function(error) {
        response.status(500).json({
            'error' : error
        })
    })
})

// Getting all the entries in the DB
app.get('/get-data', function(request, response) {
    const entries = []
    db.collection('ExpenseData') //.fetch() use panna koodadhu
    .find()
    .forEach(entry => entries.push(entry))  // entry-successive entries aa point out pannu // run until all collection gets over
    .then(function() {
        response.status(200).json(entries)
    }).catch(function(error) {
        response.status(404).json({
            'error' : error
        })
    })
})

app.delete('/delete-entry', function(request, response) {
    // db.collection('').deleteOne({_id: new ObjectId()})
    if(ObjectId.isValid(request.body.id)){
        db.collection('ExpenseData').deleteOne({
            _id : new ObjectId(request.body.id)
        }).then(function() {
            response.status(201).json({
                'status' : 'data successfully deleted'
            })
        }).catch(function(error) {
            response.status(500).json({
                'error' : error
            })
        })
    } else {
        response.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})

app.patch('/update-entry', function(request, response) {
    if(ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData')  // body la enna id send pannanum oh adha send panni iurkkanu
        .updateOne( 
            {_id: new ObjectId(request.body.id)},  //mongodb la most aa id default aa iurkku so we r using it
            {$set : request.body.data} // keyword should be data anga(from other file) send pannum podhu //what data shld come here is put here
        ).then(function() {
            response.status(201).json({ // use status code 201 - when adding/creating a new file 
                'status' : 'data successfully updated'
            })
        }).catch(function(error) {
            response.status(500).json({ // status code 500 - not completed
                'error' : error
            })
        })
    } else {
        response.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})

// postman use: idhuvairikku panna ellam correct aa nu check panna 
// delete-> localhost:9000/delete-entry->body->raw->file is json ->{"id": "take id from mongodbcompass" }

//.then la response send pannnanu

