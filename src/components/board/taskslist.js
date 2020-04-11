import createTask from "./task/task.js";

const createTasksList = (tasks) => {
  let tasksList = ``;
  tasks.forEach((task) => {
    tasksList += createTask(task);
  });
  return tasksList;
};

export default createTasksList;
