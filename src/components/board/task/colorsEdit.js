export const createColorsMarkup = (colors, currentColor) => {
  return colors
    .map((color, index) => {
      const isChecked = currentColor === color ? `checked` : ``;
      return (
        `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
        ${isChecked}
        />
        <label
          for="color-${color}-${index}"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(`\n`);
};
