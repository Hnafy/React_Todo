import { useEffect, useRef, useState } from "react";
import "./todoList.css";

const todoSaved =JSON.parse(window.localStorage.getItem("myTodo"))
let nexId= 1
export default function Todo() {
    let [input,setInput]=useState("")
    let [todo,setTodo]=useState((todoSaved!==null)?todoSaved:[])
    useEffect(()=>{
        window.localStorage.setItem("myTodo",JSON.stringify(todo))
    },[todo])
    function addTodo(){
        setTodo([...todo,{id:nexId++,todo:input,completed:false}])
        addInput.current.value=""
        addInput.current.focus()
    }
    function handelComplete(index){
        let newTodos = [...todo]
        newTodos[index].completed = !newTodos[index].completed
        setTodo(newTodos)
    }
    let todos = todo.map((item)=>{
        return(
            <div className="todo" key={item.id}>
                <li onClick={()=>{handelComplete(item.id - 1)}} className={(item.completed)?"liActive":""}>{item.todo}</li>
                <button onClick={()=>setTodo(todo.filter((e)=>e.id !== item.id))}>X</button>
            </div>
        )
    })
    const addInput = useRef()
    useEffect(()=>{
        addInput.current.focus()
    },[])
    return (
        <div className="container">
            <h2>To Do List</h2>
            <ul>
                {todos}
            </ul>
            <div className="box">
                <input type="text" placeholder="Add a new todo" onChange={(e)=>setInput(e.target.value)} ref={addInput}/>
                <button onClick={addTodo}>Add</button>
            </div>
        </div>
    );
}
