import createTaskEdit from "./task/taskEdit.js";
import createTasksList from "./taskslist.js";
import createLoadMoreButton from "./loadMoreButton.js";
import {createElement} from "../utils.js";

export const createTasksBoard = () => {
  return (
    `<div class="board__tasks">
      ${createTaskEdit(taskEdit)}
      ${createTasksList(tasksList)}
    </div>
    ${createLoadMoreButton()}`
  );
};

const createTasks = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasks();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
