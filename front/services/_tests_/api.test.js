import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../../services/_tests_/api'; 
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('API Service', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    // Test pour getAllTodos
    it('envoyer une requête GET à /api/todos', async () => {
        fetch.mockResponseOnce(JSON.stringify([])); // Simuler une réponse vide

        await getAllTodos();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/todos', { method: 'GET' });
    });

    // Test pour createTodo
    it('envoyer une requete POST au bon body', async () => {
        const newTodo = { text: 'New Todo' };
        fetch.mockResponseOnce(JSON.stringify(newTodo)); // Simuler la réponse

        await createTodo(newTodo);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });
    });

    // Test pour updateTodo
    it('should send a PUT request with the correct ID and update data', async () => {
        const updatedTodo = { completed: true };
        const todoId = '123';
        fetch.mockResponseOnce(JSON.stringify({ ...updatedTodo, _id: todoId })); // Simuler la réponse

        await updateTodo(todoId, updatedTodo);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`/api/todos/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
        });
    });

    // Test pour deleteTodo
    it('should send a DELETE request with the correct ID', async () => {
        const todoId = '123';
        fetch.mockResponseOnce(JSON.stringify({ message: 'Todo deleted successfully' })); // Simuler la réponse

        await deleteTodo(todoId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`/api/todos/${todoId}`, { method: 'DELETE' });
    });
});
