const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes //

// Create a user
app.post("/users", async(req, res) => {
    try {
        const { user_name } = req.body;
        const newUser = await pool.query(
            'INSERT INTO "user" (user_name) VALUES($1) RETURNING *',    // VALUES($1) refers to user_name as defined in the second arg
            [user_name]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// Get all users
app.get("/users", async(req, res) => {
    try {
        const allUsers = await pool.query(
            'SELECT * FROM "user"'
        );
        res.json(allUsers.rows);

    } catch(err) {
        console.error(err.message);
    }
});


// Get a user
app.get("/users/:user_id", async(req, res) => {
    try {
        const {user_id} = req.params;   //req.params refers to the :user_id in the URL
        const user = await pool.query(
            'SELECT * FROM "user" WHERE user_id = $1',
            [user_id]
        );
        res.json(user.rows[0]);

    } catch(err) {
        console.error(err.message);
    }
});


// Update a user
app.put("/users/:user_id", async(req, res) => {
    try {
        const {user_id} = req.params;
        const {user_name} = req.body;
        const updateUser = await pool.query(
            'UPDATE "user" SET user_name = $1 WHERE user_id = $2',
            [user_name, user_id]
        );
        res.json("User was updated");
        
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a user
app.delete("/users/:user_id", async(req, res) => {
    try {
        const {user_id} = req.params;
        const deleteUser = await pool.query(
            'DELETE FROM "user" WHERE user_id = $1',
            [user_id]
        );
        res.json("User was deleted");

    } catch(err) {
        console.error(err.message);
    }
});





app.listen(5000, () => {
    console.log('Server has started on port 5000');
});
