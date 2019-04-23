// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive! But is it sentient...?");
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.json({ error: err, message: "The users information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
        db.insert(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err, message: "There was an error while saving the user to the database" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    };
})

server.get('/api/users/:id', (req, res) => {    
    const userId = req.params.id;
    console.log(db.findById(userId));
    db.findById(userId)
    .then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user information could not be retrieved." })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
    .then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user could not be removed" })
    })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const changes = req.body;
    if (changes.name && changes.bio) {
        db.update(userId, changes)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err, message: "The user information could not be modified." })
        })
    } else if (!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(400).json({ errorMessage:"Please provide name and bio for the user." })
    }
    
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
});