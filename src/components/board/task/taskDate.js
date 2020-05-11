import {formatTime, formatDate} from "../../../mocks/board/task.js";

const getDate = (currentDate) => {
  const isDateShowing = !!currentDate;
  return isDateShowing ? `${formatDate(currentDate)}` : ``;
};

const getTime = (currentDate) => {
  const isDateShowing = !!currentDate;
  return isDateShowing ? formatTime(currentDate) : ``;
};

export const taskDatesMarkup = (dueDate) => {
  const date = getDate(dueDate);
  const time = getTime(dueDate);
  return (
    `<div class="card__dates">
    <div class="card__date-deadline">
    <p class="card__input-deadline-wrap">
    <span class="card__date">${date}</span>
    <span class="card__time">${time}</span>
    </p>
    </div>
    </div>`
  );
};

export const deadlineToggleMarkup = (date) => {
  const isDate = !!date;
  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDate ? `yes` : `no`}</span>
    </button>`
  );
};

export const editDatesMarkup = (dueDate) => {
  const date = getDate(dueDate);
  const time = getTime(dueDate);
  const isDate = !!dueDate;
  return (isDate ?
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${date} ${time}"
        />
      </label>
    </fieldset>` : ``
  );
};
