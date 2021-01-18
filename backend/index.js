
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const pool = require("./db");

// Database connectivity
const port = 8000;
app.listen(port,() =>{
    console.log(`app is running at ${port}`);
})

//Middlewares
app.use(bodyParser.json())

//actual routes
//create a todo
app.post("/create",async(req,res)=>{
  try {
    const{title,todo_priority,todo_date} = req.body;
    const newTodo = await pool.query("INSERT INTO todo(title,todo_priority,todo_date) VALUES($1,$2,$3) RETURNING *",
    [title,todo_priority,todo_date] );
    res.json(newTodo.rows[0])
  } catch (error) 
  {
    console.error(error.message); 
  }
})
//get all todos
app.get("/getAllTodos",async(req,res)=>{
  try {
    const getAllTodos = await pool.query("SELECT * from todo");
    res.json(getAllTodos.rows)
  } catch (error) 
  {
    console.error(error.message); 
  }
})

// get a todo

app.get("/getTodo/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const getTodo = await pool.query("SELECT * from todo WHERE todo_id = $1",[id]);
    res.json(getTodo.rows[0])
  } catch (error) 
  {
    console.error(error.message); 
  }
})
// update a todo
app.put("/updateTodo/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const {title,todo_priority,todo_date,status} = req.body;
    const getTodo = await pool.query("UPDATE todo SET title=$1, todo_priority=$2,todo_date = $3,status=$4 WHERE todo_id = $5",
    [title,todo_priority,todo_date,status,id]);
    res.json("TODO Updated Successfully!!!")
  } catch (error) 
  {
    console.error(error.message); 
  }
})

//delete a todo
app.delete("/deleteTodo/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE  from todo WHERE todo_id = $1",[id]);
    res.json("TODO Deleted Successfully!!!")
  } catch (error) 
  {
    console.error(error.message); 
  }
})
//search todo
app.get("/searchTodo",async(req,res)=>{
  try {
    const {title,todo_priority,todo_date,status} = req.body;
    const searchTodo = await pool.query("SELECT * from todo WHERE title = $1 OR todo_priority =$2 OR todo_date =$3 OR status =$4",
    [title,todo_priority,todo_date,status]);
    res.json(searchTodo.rows[0])
  } catch (error) 
  {
    console.error(error.message); 
  }
})