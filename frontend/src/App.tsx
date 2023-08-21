import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Input from './components/Input'

export type Todo = {
  _id: String,
  description: String,
  isDone: Boolean
}

function App() {
  
  const [ todos, setTodos ] = useState <Todo[]>([])
  console.log(todos);
  

  const getTodos = async () => {
    const response: {data: Todo[]} = await axios.get("http://localhost:3000/")
    setTodos(response.data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  const todoStatusToggle = async (id: String) => {
    console.log(id);
    const response: {status: number, data: Todo[]} = await axios.put(`http://localhost:3000/${id}`)
    console.log(response.status);
    setTodos(response.data)
  }

  const deleteTodo = async (id: String) => {
    const response = await axios.delete(`http://localhost:3000/${id}`)
    setTodos(response.data)
  }

  return (
    <>
      <Input setTodos={setTodos}/>
      <div>
        {todos.map(todo => {
          return (
            <div className='todos'>
              <h2>{todo.description}</h2>
              <button onClick={() => todoStatusToggle(todo._id)}>{todo.isDone ? "Undone" : "Done"}</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
