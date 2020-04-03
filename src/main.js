import {TASK_COUNT} from "./components/const.js";
import createBoard from "./components/board.js";
import createControl from "./components/control.js";
import createFilter from "./components/filter.js";
import createLoadMoreButton from "./components/loadMoreButton.js";
import createTasksList from "./components/task.js";
import createTaskEdit from "./components/taskEdit.js";
import render from "./components/utils.js";

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createControl());
render(mainElement, createFilter());
render(mainElement, createBoard());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

const init = () => {
  render(taskListElement, createTaskEdit());
  render(taskListElement, createTasksList(TASK_COUNT));
  render(boardElement, createLoadMoreButton());
};

init();
