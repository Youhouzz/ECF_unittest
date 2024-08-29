import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../AddTodoForm'; 

describe('AddTodoForm Component', () => {
  test('should update state when user types into input', () => {
    render(<AddTodoForm addTodo={jest.fn()} />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });

    expect(input.value).toBe('New Todo');
  });

  test('should call addTodo with the correct text when form is submitted', () => {
    const addTodoMock = jest.fn();
    render(<AddTodoForm addTodo={addTodoMock} />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(form);

    expect(addTodoMock).toHaveBeenCalledTimes(1);
    expect(addTodoMock).toHaveBeenCalledWith('New Todo');
  });

  test('should clear input after form submission', () => {
    const addTodoMock = jest.fn();
    render(<AddTodoForm addTodo={addTodoMock} />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(input.value).toBe('');
  });
});
