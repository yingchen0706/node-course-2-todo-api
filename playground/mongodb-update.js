// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('596334c56315a56df0439fb3')
    }, {
        $set: {
            name: 'Ying'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: true
    }).then((res)=> {
        console.log(res);
    });

    db.close();
});
