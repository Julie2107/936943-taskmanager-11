import createTask from "./task.js";

const createTasksList = (count) => {
  let tasksList = ``;
  for (let i = 0; i < count; i++) {
    tasksList += createTask();
  }
  return tasksList;
};

export default createTasksList;
