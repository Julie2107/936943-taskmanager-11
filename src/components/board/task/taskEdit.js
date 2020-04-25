import {COLORS, DAYS} from "../../const.js";
import {createColorsMarkup} from "./colorsEdit.js";
import {repeatToggleMarkup, createRepeatingDaysMarkup} from "./repeatingDaysEdit.js";
import {editDatesMarkup, deadlineToggleMarkup} from "././taskDate.js";
import {repeatingBlockEdit} from "./repeatingBlockEdit.js";
import {getExpiredClass} from "./task.js";
import AbstractComponent from "../../abstract-component.js";

const createTaskEdit = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatMarkup = isRepeatingTask ? repeatingBlockEdit(createRepeatingDaysMarkup(DAYS, repeatingDays)) : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const colorsMarkup = createColorsMarkup(COLORS, color);

  return (
    `<article class="card card--edit card--${color} ${repeatClass}  ${getExpiredClass(dueDate)}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${deadlineToggleMarkup(dueDate)}
                ${editDatesMarkup(dueDate)}
                ${repeatToggleMarkup(isRepeatingTask)}
                ${repeatMarkup}
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
              ${colorsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskEdit(this._task);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}
