import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { taskService } from './services/taskService.js';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  console.log('tasks on index: ', tasks);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setStatus('loading');
        const data = await taskService.list();
        setTasks(data);
        setStatus('success');
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    }
    loadTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      setStatus('loading');
      const created = await taskService.create(title);
      setTasks([...tasks, created]);
      setStatus('success');
      setError(null);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <main className="app-shell">
      <header>
        <h1>Task Tamer</h1>
        <p className="tagline">Wrestle your todo list into shape.</p>
      </header>

      <section aria-labelledby="tasks">
        <h2 id="tasks" className="visually-hidden">
          Tasks
        </h2>
        <TaskForm onAddTask={handleAddTask} disabled={status === 'loading'} />
        {status === 'loading' && <p role="status" aria-live="polite">Loading…</p>}
        {error && <p role="alert" aria-live="assertive">{error}</p>}
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
}

export default App;