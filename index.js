const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json()); //allow us to access the req.body

//Routes

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1", [id]);
    // const getTodo=await pool.query('SELECT * FROM todo')
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(err.message);
  }
});
//create
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTODO = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTODO.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("TODO updated");
  } catch (error) {
    console.log(err.message);
  }
});
//delete
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json("TODO deleted ");
  } catch (error) {
    console.log(err.message);
  }
});
app.listen(5000, () => {
  console.log("first");
});

export default app;
