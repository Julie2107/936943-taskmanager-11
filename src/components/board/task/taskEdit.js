import {MONTHS, COLORS, DAYS} from "../../const.js";
import {formatTime} from "../../../mocks/board/task.js";
import {createColorsMarkup} from "./colorsEdit.js";
import {createRepeatingDaysMarkup} from "./repeatingDaysEdit.js";
import {dateShowMarkup} from "./dateShowEdit.js";
import {repeatingBlockEdit} from "./repeatingBlockEdit.js";

const createTaskEdit = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isDateShowing = !!dueDate;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;

  const expiredClass = isExpired ? `card--deadline` : ``;

  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass}  ${expiredClass}">
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
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                ${isDateShowing ? dateShowMarkup(date, time) : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                ${isRepeatingTask ? repeatingBlockEdit(repeatingDaysMarkup) : ``}
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

export default createTaskEdit;
