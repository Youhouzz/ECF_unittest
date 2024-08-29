const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Todo = require('../src/models/Todo'); 
const todoController = require('../src/controllers/todoController');
const app = express();
app.use(express.json());
app.get('/todos', todoController.getAllTodos);
app.post('/todos', todoController.createTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);

describe('Todo Controller', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await Todo.deleteMany({});
    });

    // Test pour getAllTodos
    it('renvoyer toutes les tâches triées par date de création par ordre décroissant', async () => {
        const todo1 = await Todo.create({ text: 'First Todo', createdAt: new Date('2023-01-01') });
        const todo2 = await Todo.create({ text: 'Second Todo', createdAt: new Date('2023-01-02') });

        const response = await request(app).get('/todos');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]._id).toBe(todo2.id);
        expect(response.body[1]._id).toBe(todo1.id);
    });

    // Test pour createTodo
    it('créer une nouvelle tâche et renvoyer le statut 201', async () => {
        const todoData = { text: 'New Todo' };
        const response = await request(app).post('/todos').send(todoData);

        expect(response.status).toBe(201);
        expect(response.body.text).toBe(todoData.text);
        expect(response.body.completed).toBe(false);

        const todo = await Todo.findOne({ text: 'New Todo' });
        expect(todo).not.toBeNull();
    });

    // Test pour updateTodo
    it('mettre à jour le statut terminé pour une tâche existante', async () => {
        const todo = await Todo.create({ text: 'Todo to be updated', completed: false });

        const response = await request(app).put(`/todos/${todo._id}`).send({ completed: true });

        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);

        const updatedTodo = await Todo.findById(todo._id);
        expect(updatedTodo.completed).toBe(true);
    });

    // Test pour deleteTodo
    it('should delete an existing todo and return a confirmation message', async () => {
        const todo = await Todo.create({ text: 'Todo to be deleted' });

        const response = await request(app).delete(`/todos/${todo._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Todo deleted successfully');

        const deletedTodo = await Todo.findById(todo._id);
        expect(deletedTodo).toBeNull();
    });
});
