import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { Todo, TodoType } from './models/Todo.model'

dotenv.config()

const app = express()
const port = process.env.PORT
const mongouri = process.env.MONGO_URI as string


app.use(cors())
app.use(express.json())


app.get("/", async (req: Request, res: Response) => {
  const response: TodoType[] = await Todo.find()
  // console.log(response); 
  res.send(response)
})

app.post("/add", async (req: Request, res: Response) => {
  console.log("reqbody", req.body);
  
  const response = await Todo.create(req.body)
  console.log("newtodo", response);
  if (response) {
    const allTodos = await Todo.find()
    res.status(200).json(allTodos)
  } else {
    res.sendStatus(404)
  }
  
})

app.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const findTodo = await Todo.findById(id)
  if (findTodo) {
    findTodo.isDone = !findTodo.isDone
    await findTodo.save()
    console.log("updatestodo", findTodo);
    const updatedTodos = await Todo.find()
    res.status(200).json(updatedTodos) 
  } else {
    res.sendStatus(404)
  }
})

app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const findTodo = await Todo.findByIdAndDelete(id)
  console.log("findTodo", findTodo);
  if (findTodo) {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } else {
    res.sendStatus(404)
  }
})

mongoose.connect(mongouri, {})
  .then(() => { 
    console.log("Server connected to mongoDB");
    app.listen(port, () => { console.log(`Server runs on ${port}`);
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  })