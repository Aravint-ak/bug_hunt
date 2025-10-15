let tasks = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build Task Tamer", completed: false },
];
console.log('tasks: ', tasks);

export const getTasks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tasks;
};

export const createTask = async (title) => {
  console.log('createTask called with:', title);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
};