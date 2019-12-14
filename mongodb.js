const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');
    }
    const db = client.db('task-manager');
    // db.collection('users').insertOne({
    //     name: 'Jagdish',
    //     age: 23
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'joker',
    //         age: 35
    //     }, {
    //         name: 'batman',
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'have lunch',
    //         completed: false
    //     }, {
    //         description: 'have breakfast',
    //         completed: true
    //     }, {
    //         description: 'something important',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').findOne({ _id: new ObjectId("5db933ccb5f6b86594a7d5e9") }, (error, user) => {
    //     if(error){
    //         return console.log('Unable to find user!');
    //     }
    //     console.log(user);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, users) => {
    //     if(error){
    //         return console.log('Unable to find users!');
    //     }
    //     console.log(users);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({
        description: "have breakfast"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});