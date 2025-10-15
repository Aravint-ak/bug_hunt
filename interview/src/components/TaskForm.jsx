import { useState } from 'react';

function TaskForm({ onAddTask, disabled }) {
  const [draft, setDraft] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setDraft(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!draft.trim() || isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      await onAddTask(draft.trim());
      setDraft('');
    } catch (err) {
      console.error('Error adding task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="task-label">Task name</label>
      <input
        id="task-input"
        className="task-input"
        type="text"
        placeholder="Describe the task"
        value={draft}
        onChange={handleChange}
        disabled={disabled || isSubmitting}
        aria-describedby="task-error"
        data-testid="task-input"
      />
      <button type="submit" disabled={disabled || isSubmitting} data-testid="add-task-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;