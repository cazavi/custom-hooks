import { useReducer, useEffect } from "react";
import {todoReducer} from './todoReducer'

export const useTodo = () =>{
const initialState = [];

const init =()=>{
  return JSON.parse(localStorage.getItem('todos')) || [];
}

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => { // sólo se pueden grabar strings en el local storage
    //local storage no deja la pc hasta que le digamos explícitamente
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const handleNewTodo = (todo) =>{
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    }
    dispatch(action);
  }

  const handleDeleteTodo = (id) =>{
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  }

  const handleToggleTodo = (id) =>{
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  }
  return {
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo=> !todo.done).length,
    initialState,
    handleDeleteTodo, 
    handleNewTodo, 
    handleToggleTodo, 
    todos
  }
}