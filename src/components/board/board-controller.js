import {TASK_FIRST_COUNT, LOAD_MORE_COUNT} from "../const.js";
import TasksComponent from "./tasks.js";
import LoadMoreButtonComponent from "./loadMoreButton.js";
import SorterComponent from "./sort.js";
import NoTasksComponent from "./no-tasks.js";
import TaskController from "./task-controller.js";

import {render, remove} from "../utils.js";

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks) => {
  return {
    'date-down': [...tasks].sort((currentTask, nextTask) => currentTask.dueDate - nextTask.dueDate),
    'date-up': [...tasks].sort((currentTask, nextTask) => nextTask.dueDate - currentTask.dueDate),
    'default': tasks
  };
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = TASK_FIRST_COUNT;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SorterComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._getSortHandler = this._getSortHandler.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._getSortHandler);
  }

  render(tasks) {
    this._tasks = tasks;
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(this._container, this._noTasksComponent);
      return;
    }

    render(this._container.getElement(), this._sortComponent);
    render(this._container.getElement(), this._tasksComponent);
    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);

    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreBtn(this._tasks, taskListElement);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._getSortHandler(sortType);
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _renderLoadMoreBtn(tasks, element) {
    const loadMoreButton = this._loadMoreButtonComponent;
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    if (loadMoreButton.getElement()) {
      remove(loadMoreButton);
    }
    render(this._container.getElement(), loadMoreButton);

    loadMoreButton.setClickHandler(() => {
      this._loadMoreHandler(this._container, tasks, element, loadMoreButton);
    });
  }

  _getSortHandler(sortType) {
    const taskListElement = this._tasksComponent.getElement();

    const sortedTasks = getSortedTasks(this._tasks)[sortType];
    taskListElement.innerHTML = ``;

    const sortedNewTasks = renderTasks(taskListElement, sortedTasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = sortedNewTasks;

    this._renderLoadMoreBtn(sortedTasks, taskListElement);
  }

  _loadMoreHandler(boardComponent, tasks, container, button) {
    const loadedTasks = boardComponent.getElement().querySelectorAll(`.card`);
    const nextLoadingCount = loadedTasks.length + LOAD_MORE_COUNT;
    const nextTasksList = tasks.slice(loadedTasks.length, nextLoadingCount);

    const nextTasks = renderTasks(container, nextTasksList, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(nextTasks);
    if (nextLoadingCount >= tasks.length) {
      remove(button);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}
