const API_URL = 'http://localhost:5000/api';

export const getAllTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  return response.json();
};

export const createTodo = async (text) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
};