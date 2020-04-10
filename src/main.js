import {TASK_COUNT, TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "./components/const.js";
import createBoard from "./components/board.js";
import createControl from "./components/control.js";
import createFilter from "./components/filter.js";
import createLoadMoreButton from "./components/loadMoreButton.js";
import createTasksList from "./components/taskslist.js";
import createTaskEdit from "./components/taskEdit.js";
import render from "./components/utils.js";
const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);
import {generateTask, generateTasks} from "./mocks/board/task.js";

const tasks = generateTasks(TASK_COUNT);
console.log(tasks);
render(headerElement, createControl());
render(mainElement, createFilter());
render(mainElement, createBoard());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

const init = () => {
  render(taskListElement, createTaskEdit(tasks[0]));
  render(taskListElement, createTasksList(tasks.slice(1, TASK_FIRST_COUNT)));
  render(boardElement, createLoadMoreButton());
};

init();

const loadMoreButton = boardElement.querySelector('.load-more');
loadMoreButton.addEventListener('click', function () {
  const loadedTasks = boardElement.querySelectorAll('.card');
  render(taskListElement, createTasksList(tasks.slice(loadedTasks.length, loadedTasks.length+LOAD_MORE_COUNT)));
  if (loadedTasks.length+LOAD_MORE_COUNT >= tasks.length) {
    loadMoreButton.remove();
  };
});
