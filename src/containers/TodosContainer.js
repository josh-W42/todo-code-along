import { useState, useEffect } from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'
import CreateTodoForm from '../components/CreateTodoForm'

export default function TodosContainer(){
    const [todos, setTodos] = useState([])

    // put empty array to run once after initial render
    useEffect(()=> {
        const fetchData = async()=> {
            const res = await TodoModel.all()
            console.log(res)
            setTodos(res.data)
        }
        fetchData()
    }, [])

    const createTodo = async(todo) => {
        console.log(todo)
        let newTodo = {
            body: todo,
            completed: false
        }
        const anotherTodo = await TodoModel.create(newTodo)
        console.log(anotherTodo)
        // taking our current todos, spreading and
        // putting new one at the end
        setTodos([...todos, anotherTodo.data])
    }

    const deleteTodo = async(todo)=> {
        console.log(todo)
        // talk to database
        const deletedTodo = await TodoModel.delete(todo)
        // filter is going to check and remove the todo with the id that was passed in
        let tempTodos = [...todos].filter((eachTodo)=> {
            return eachTodo._id !== deletedTodo.data._id
        })
        //we will have to update state
        setTodos(tempTodos)
    }



    return (
        <div className='todosContainer'>
            <CreateTodoForm createTodo={createTodo} />
            <Todos todos={todos}  deleteTodo={deleteTodo} />
            <h1>TodosContainer</h1>
        </div>
    );
}

