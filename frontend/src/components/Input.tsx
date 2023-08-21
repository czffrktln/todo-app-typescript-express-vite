import axios from "axios";
import { SetStateAction, useState } from "react"
import { Todo } from "../App";

interface Props {
  setTodos: React.Dispatch<SetStateAction<Todo[]>>
}

const Input: React.FC<Props> = (props) => {
  
  const [ todo, setTodo ] = useState("")

  console.log(todo);
  
  const addTodo = async () => {
    console.log(todo);
    
    const response = await axios.post("http://localhost:3000/add", {description: todo})
    console.log(response.data);
    console.log(response.status);
    if (response.status === 200) {
      props.setTodos(response.data)
      setTodo("")
    } else { console.log("nem jo");
    }

  }

  return (
    <>
      <div>
        <input value={todo} type="text" onChange={(e) => setTodo(e.target.value)}></input>
        <button onClick={addTodo}>ADD</button>
      </div>
    </>
  )
}
export default Input