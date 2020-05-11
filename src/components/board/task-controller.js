import TaskComponent from "./task/task.js";
import TaskEditComponent from "./task/taskEdit.js";
import {render, isEscKey, remove, replace} from "../utils.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._escKeyHandler = this._escKeyHandler.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);
    this._taskComponent.setEditButtonHandler(() => {
      this._openEditFormHandler();
    });

    this._taskComponent.setFavoritesButtonHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }))
    });

    this._taskComponent.setArchiveButtonHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }))
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._saveEditFormHandler();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._saveEditFormHandler();
    }
  }

  _escKeyHandler(evt) {
    if (isEscKey(evt)) {
      this._saveEditFormHandler();
      document.removeEventListener(`keydown`, this._escKeyHandler);
    }
  };

  _openEditFormHandler() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyHandler);
    this._mode = Mode.EDIT;
  }

  _saveEditFormHandler() {
    document.removeEventListener(`keydown`, this._escKeyHandler);
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }
}
