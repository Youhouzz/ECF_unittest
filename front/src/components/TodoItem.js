import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo._id)}
        />
        <span className={todo.completed ? 'text-muted text-decoration-line-through' : ''}>
          {todo.text}
        </span>
      </div>
      <button 
        className="btn btn-danger btn-sm" 
        onClick={() => removeTodo(todo._id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;