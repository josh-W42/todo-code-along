import { useState, useEffect } from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'

export default function TodosContainer(){
    const [todos, setTodos] = useState([])

    useEffect(()=> {
        const fetchData = async()=> {
            const res = await TodoModel.all()
            console.log(res)
            setTodos(res.data)
        }
        fetchData()
    }, [])
    

    return (
        <div className='todosContainer'>
            <Todos todos={todos} />
            <h1>TodosContainer</h1>
        </div>
    );
}

