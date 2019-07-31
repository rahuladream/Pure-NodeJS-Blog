const path = require('path')
const express = require('express')
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');

const app = new express()


app.use(express.static('public'));
app.use(expressEdge)
app.set('views',__dirname+'/views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req,res) => {
    res.render('index')
});

app.get('/posts/new', (req,res) => {
    res.render('create')
});

app.post('/posts/store', (req,res) => {
    Post.create(req.body, (error,post) => {
        res.redirect('/')
    })
});

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

// Starting the app the definite port
app.listen(4000, () => {
    console.log('App listening on port 4000')
})



