import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // pour des assertions supplémentaires
import TodoItem from '../TodoItem';

describe('TodoItem Component', () => {
  const mockToggleTodo = jest.fn();

  const setup = (props = {}) => {
    return render(
      <TodoItem
        todo={{ id: 1, text: 'Test Task', completed: false }}
        toggleTodo={mockToggleTodo}
        {...props}
      />
    );
  };

  test('affiche correctement le texte de la tâche', () => {
    setup();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('rendu de la case à cocher avec l\'état correct (non cochée)', () => {
    setup();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('rendu de la case à cocher avec l\'état correct (cochée)', () => {
    setup({ todo: { id: 1, text: 'Test Task', completed: true } });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('appelle la fonction toggleTodo lorsque la case à cocher est cliquée', () => {
    setup();
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleTodo).toHaveBeenCalledWith(1); // Vérifie que la fonction a été appelée avec l'id de la tâche
  });
});
