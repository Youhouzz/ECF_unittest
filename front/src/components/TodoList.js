import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getAllTodos();
    setTodos(data);
  };

  const addTodo = async (text) => {
    const newTodo = await createTodo(text);
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(todo => todo._id === id);
    const updatedTodo = await updateTodo(id, { completed: !todoToToggle.completed });
    setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4">Todo List</h2>
        <AddTodoForm addTodo={addTodo} />
        <ul className="list-group mt-4">
          {todos.map(todo => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              toggleTodo={toggleTodo} 
              removeTodo={removeTodo} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;