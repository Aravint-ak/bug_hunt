import { createTask, getTasks } from '../api/fackApi';

export const taskService = {
  list: getTasks,
  create: createTask,
};
