function TaskList({ tasks = [] }) {
  if (!tasks.length) {
    return <p className="empty-message" role="status">No tasks yet. Add your first one!</p>;
  }

  return (
    <ul className="task-list" role="list" aria-labelledby="tasks">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={task.completed ? 'task done' : 'task'}
          aria-label={`Task: ${task.title}, ${task.completed ? 'completed' : 'not completed'}`}
          data-testid="task-item"
        >
          <span data-testid={`task-title-${task.id}`}>{task.title}</span>
          {task.completed ? <span aria-label="completed">✔</span> : null}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;