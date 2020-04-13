export const repeatingBlockEdit = (markup) => {
  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${markup}
      </div>
    </fieldset>`
  );
};
