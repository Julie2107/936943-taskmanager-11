// разметка для таска
const repeatingDaysItem = (day, index, state) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${index}"
      name="repeat"
      value="${day}"
      ${state}
    />
    <label class="card__repeat-day" for="repeat-${day}-${index}"
      >${day}</label
    >`
  );
};
// разметка для редактирования
export const repeatToggleMarkup = (isRepeat) => {
  return (
    `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isRepeat ? `yes` : `no`}</span>
    </button>`
  );
};

export const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day, index) => {
      const isChecked = repeatingDays[day] ? `checked` : ``;
      return repeatingDaysItem(day, index, isChecked);
    })
    .join(`\n`);
};
