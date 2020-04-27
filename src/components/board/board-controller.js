import TaskComponent from "./task/task.js";
import TaskEditComponent from "./task/taskEdit.js";
import {TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "../const.js";
import TasksComponent from "./tasks.js";
import LoadMoreButtonComponent from "./loadMoreButton.js";
import SorterComponent from "./sort.js";
import NoTasksComponent from "./no-tasks.js";

import {render, isEscKey} from "../utils.js";

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = Boolean(parentElement && newElement && oldElement);

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
  taskComponent.setEditButtonClickHandler(() => {
    editButtonHandler();
    document.addEventListener(`keydown`, escKeyHandler);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(() => {
    editFormSubmitHandler();
    document.removeEventListener(`keydown`, escKeyHandler);
  });

  render(taskListElement, taskComponent);
};

const loadMoreHandler = (boardComponent, tasks, container, button) => {
  const loadedTasks = boardComponent.querySelectorAll(`.card`);
  const nextLoadingCount = loadedTasks.length + LOAD_MORE_COUNT;
  const nextTasksList = tasks.slice(loadedTasks.length, nextLoadingCount);

  nextTasksList.forEach((task) => {
    renderTask(container, task);
  });

  if (nextLoadingCount >= tasks.length) {
    remove(button);
  }
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SorterComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  renderLoadMoreBtn(container, tasks, element) {
    const loadMoreButton = this._loadMoreButtonComponent;

    render(container, loadMoreButton);

    loadMoreButton.setClickHandler(() => {
      loadMoreHandler(container, tasks, element, loadMoreButton);
    });
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._tasksComponent);
    const taskListElement = this._tasksComponent.getElement();
    let showingTasksCount = TASK_FIRST_COUNT;

    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });
    this.renderLoadMoreBtn(container, tasks, taskListElement);
  }
}
