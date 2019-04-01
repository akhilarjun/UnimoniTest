const express = require('express');
const port = 9000;
const app = express();
const parser = require('body-parser');
const User = require('./user');
const cors = require('cors');

app.use(parser.json());
app.use(cors({origin: true}));

app.get('/users', (req, res) => {
    User.all((err, users) => res.status(200).json(users));
});

app.post('/user', (req, res) => {
    const newUser = req.body;
    User.add(newUser, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
        }
    });
});

app.post('/user/login', (req, res) => {
    const newUser = req.body;
    User.find(newUser, (err, data) => {
        if (err) {
            res.status(401).json({err: 'Incorrect Credentials'});
        } else if (data.length <= 0) {
            res.status(401).json({err: 'Incorrect Credentials'});
        } else {
            res.status(200).json(data);
        }
    });
})

app.put('/user', (req, res) => {
    const newUser = req.body;
    User.update(newUser, (err, data) => {
        if (err) {
            res.status(404).json({err: 'User is not found'});
        } else {
            res.status(204).send(data);
        }
    });
});

app.post('/user/delete', (req, res) => {
    const newUser = req.body;
    User.delete(newUser.emailId, (err, data) => {
        if (err) {
            res.status(404).json({err: 'User is not found'});
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(port);