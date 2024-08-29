import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ajouter une nouvelle tâche"
      />
      <button className="btn btn-primary" type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;