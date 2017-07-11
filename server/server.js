var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user')
var {Todo} = require('./models/todo')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=> {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// app.get('/todo', (req, res)=> {

// });

app.listen(3000, ()=> {
    console.log('Started on port 3000');
})


// var newTodo = new Todo({
//     text: 'Cook dinner'

// });

// newTodo.save().then((doc)=> {
//     console.log('Saved todo', doc);
// }, (e)=> {
//     console.log('Unable to save todo');
// });

// var anotherTodo = new Todo({
//     text: 'Shopping'
// });

// anotherTodo.save().then((doc)=> {
//     console.log('Saved todo', doc);
// }, (e)=> {
//     console.log('Unable to save');
// });



// var oneUser = new User({
//     email: 'test@oracle.com'
// });

// oneUser.save().then((doc)=> {
//      console.log('Saved oneUser', doc);
//  }, (e)=> {
//      console.log('Unable to save', e);
//  });
