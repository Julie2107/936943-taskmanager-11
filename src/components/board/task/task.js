import {taskControlsMarkup} from "./taskControls.js";
import {taskDatesMarkup} from "./taskDate.js";
import AbstractComponent from "../../abstract-component.js";

export const getExpiredClass = (currentDate) => {
  const isExpired = currentDate instanceof Date && currentDate < Date.now();
  return isExpired ? `card--deadline` : ``;
};

const createTask = (task) => {
/*  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;
*/

  const {repeatingDays} = task;
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;

  return (
    `<article class="card card--${task.color} ${repeatClass} ${getExpiredClass(task.dueDate)}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${taskControlsMarkup(task.isArchive, task.isFavorite)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${task.description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${taskDatesMarkup(task.dueDate)}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTask(this._task);
  }

  setEditButtonHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }

  setFavoritesButtonHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}
