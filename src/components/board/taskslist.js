import createTask from "./task/task.js";

const createTasksList = (tasks) => tasks.reduce((tasksList, task) => {
   tasksList += createTask(task);
   return tasksList;
}, ``);

export default createTasksList;
