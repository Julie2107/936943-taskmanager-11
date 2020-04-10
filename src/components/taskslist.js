import createTask from "./task.js";
import {generateTask} from "../mocks/board/task.js";
const createTasksList = (count) => {
  let tasksList = ``;
  for (let i = 0; i < count; i++) {
    const tasksData = generateTask();
    tasksList += createTask(tasksData);
  }
  return tasksList;
};

export default createTasksList;
