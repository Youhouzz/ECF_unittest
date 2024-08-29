import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo App</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;