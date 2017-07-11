var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user')
var {Todo} = require('./models/todo')

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res)=> {
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (err)=> {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res)=> {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if (todo) {
            return res.status(200).send({todo});
        } else {
            return res.status(404).send();
        }
    }).catch((e)=> {
        res.status(400).send(e);
    });
});

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
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
module.exports = {app};
