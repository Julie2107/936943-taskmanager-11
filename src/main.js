import {TASK_COUNT, TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "./components/const.js";
import BoardComponent from "./components/board.js";
import ControlsComponent from "./components/control.js";
import FilterComponent from "./components/filter.js";
import TaskComponent from "./components/board/task/task.js";
import TaskEditComponent from "./components/board/task/taskEdit.js";
import TasksComponent from "./components/board/tasks.js";

import {render, Position} from "./components/utils.js";
import {generateTasks} from "./mocks/board/task.js";
import {generateFilters} from "./mocks/filters.js";


const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const editButtonHandler = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const editFormSubmitHandler = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  console.log(taskComponent.getElement());
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, editButtonHandler);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, editFormSubmitHandler);

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = TASK_FIRST_COUNT;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });
};

const tasks = generateTasks(TASK_COUNT);
console.log(tasks);
const filters = generateFilters()

render(headerElement, new ControlsComponent().getElement());
render(mainElement, new FilterComponent(filters).getElement());
const boardComponent = new BoardComponent();
render(mainElement, boardComponent.getElement());
renderBoard(boardComponent, tasks);
/*
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
*/
