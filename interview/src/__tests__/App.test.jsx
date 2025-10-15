import { describe, expect, beforeEach, vi, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const listMock = vi.fn(async () => [
  { id: 'a', title: 'Mock task A', completed: false },
  { id: 'b', title: 'Mock task B', completed: true },
]);

const createMock = vi.fn(async (title) => {
  if (typeof title !== 'string') {
    throw new TypeError('Task title must be text');
  }

  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error('Task title is required.');
  }

  return { id: 'new', title: trimmed, completed: false };
});

vi.mock('../services/taskService.js', () => ({
  taskService: {
    list: (...args) => listMock(...args),
    create: (...args) => createMock(...args),
  },
}));

describe('Task Tamer', () => {
  beforeEach(() => {
    listMock.mockClear();
    createMock.mockClear();
  });

  it('loads tasks from the service on mount', async () => {
    render(<App />);

    expect(listMock).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Mock task A')).toBeInTheDocument();
    expect(screen.getByText('Mock task B')).toBeInTheDocument();
  });

  it('associates the task label with the input for accessibility', () => {
    render(<App />);

    expect(() => screen.getByLabelText(/task name/i)).not.toThrow();
  });

  it('adds a new task via the form and clears the input', async () => {
    render(<App />);

    const input = await screen.findByLabelText(/task name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Ship the feature');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledWith('Ship the feature');
    }, { timeout: 2000 });

    expect(await screen.findByTestId('task-title-new')).toHaveTextContent('Ship the feature');
    expect(input).toHaveValue('');
  });
});