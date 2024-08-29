const mongoose = require('mongoose');
const Todo = require('../src/models/Todo'); 
describe('Todo Model Test', () => {
    
    // Connect to the MongoDB Memory Server before running tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ecf', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Clean up the database after each test
    afterEach(async () => {
        await Todo.deleteMany({});
    });

    // Disconnect from MongoDB after running tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('créer un Todo valide avec tous les champs obligatoires', async () => {
        const validTodo = new Todo({
            text: 'Test Todo',
            completed: false
        });

        const savedTodo = await validTodo.save();

        expect(savedTodo._id).toBeDefined();
        expect(savedTodo.text).toBe('Test Todo');
        expect(savedTodo.completed).toBe(false);
    });

    // Test for validating that 'text' field is required
    it('exiger le champ de texte', async () => {
        const invalidTodo = new Todo({
            completed: false
        });

        let err;
        try {
            await invalidTodo.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.text).toBeDefined();
        expect(err.errors.text.message).toBe('Path `text` is required.');
    });

    // Test to check that the 'completed' field defaults to false
    it('être défini sur false par défaut', async () => {
        const validTodo = new Todo({
            text: 'Test Todo'
        });

        const savedTodo = await validTodo.save();
        expect(savedTodo.completed).toBe(false);
    });

    // Test to check that 'createdAt' is automatically set to the current date
    it('définir CreateAt sur la date actuelle lors de la création', async () => {
        const validTodo = new Todo({
            text: 'Test Todo',
        });

        const savedTodo = await validTodo.save();

        // Ensure that the 'createdAt' field is close to the current time
        expect(savedTodo.createdAt).toBeDefined();
        const now = new Date();
        const diff = Math.abs(now - savedTodo.createdAt);
        expect(diff).toBeLessThan(1000); // Should be less than 1 second difference
    });
});

