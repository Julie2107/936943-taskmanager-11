import {TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "../const.js";
import TaskComponent from "./task/task.js";
import TaskEditComponent from "./task/taskEdit.js";
import TasksComponent from "./tasks.js";
import LoadMoreButtonComponent from "./loadMoreButton.js";
import SorterComponent from "./sort.js";
import NoTasksComponent from "./no-tasks.js";
import {render, isEscKey} from "../utils.js";

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const renderTask = (taskListElement, task) => {
  const editButtonHandler = () => {
    replace(taskEditComponent, taskComponent);
  };

  const editFormSubmitHandler = () => {
    replace(taskComponent, taskEditComponent);
  };

  const escKeyHandler = (evt) => {
    if (isEscKey(evt)) {
      editFormSubmitHandler();
      document.removeEventListener(`keydown`, escKeyHandler);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    editButtonHandler();
    document.addEventListener(`keydown`, escKeyHandler);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    editFormSubmitHandler();
    document.removeEventListener(`keydown`, escKeyHandler);
  });

  render(taskListElement, taskComponent);
};

const loadMoreHandler = (boardComponent, tasks, container, button) => {
  const loadedTasks = boardComponent.getElement().querySelectorAll(`.card`);
  const nextLoadingCount = loadedTasks.length + LOAD_MORE_COUNT;
  const nextTasksList = tasks.slice(loadedTasks.length, nextLoadingCount);

  nextTasksList.forEach((task) => {
    renderTask(container, task);
  });

  if (nextLoadingCount >= tasks.length) {
    remove(button);
  }
};

const renderBoard = (boardComponent, tasks) => {

  render(boardComponent.getElement(), new SorterComponent());
  render(boardComponent.getElement(), new TasksComponent());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = TASK_FIRST_COUNT;

  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButton = new LoadMoreButtonComponent();

  render(boardComponent.getElement(), loadMoreButton);


  loadMoreButton.getElement().addEventListener(`click`, () => {
    loadMoreHandler(boardComponent, tasks, taskListElement, loadMoreButton);
  });
};

export const getBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent());
    return;
  }
  renderBoard(boardComponent, tasks);
};
