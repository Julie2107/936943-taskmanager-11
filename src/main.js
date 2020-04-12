import {TASK_COUNT, TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "./components/const.js";
import createBoard from "./components/board/board.js";
import createControl from "./components/control.js";
import createFilter from "./components/filter.js";
import createTasksList from "./components/board/taskslist.js";
import {render} from "./components/utils.js";
import {generateTasks} from "./mocks/board/task.js";

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);
const tasks = generateTasks(TASK_COUNT);

const init = () => {
  render(headerElement, createControl());
  render(mainElement, createFilter());
  render(mainElement, createBoard(tasks[0], tasks.slice(1, TASK_FIRST_COUNT)));
};

init();

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);
const loadMoreButton = boardElement.querySelector(`.load-more`);

const loadMoreTasks = () => {
  const loadedTasks = boardElement.querySelectorAll(`.card`);
  const nextLoadingCount = loadedTasks.length + LOAD_MORE_COUNT;
  const nextTasksList = tasks.slice(loadedTasks.length, nextLoadingCount);

  render(taskListElement, createTasksList(nextTasksList));

  if (nextLoadingCount >= tasks.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, loadMoreTasks);
