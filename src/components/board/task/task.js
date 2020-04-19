import {taskControlsMarkup} from "./taskControls.js";
import {taskDatesMarkup} from "./taskDate.js";
import {createElement} from "../../utils.js";

export const getExpiredClass = (currentDate) => {
  const isExpired = currentDate instanceof Date && currentDate < Date.now();
  return isExpired ? `card--deadline` : ``;
};

const createTask = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${getExpiredClass(dueDate)}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${taskControlsMarkup(isArchive, isFavorite)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${taskDatesMarkup(dueDate)}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createTask(this._task);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
