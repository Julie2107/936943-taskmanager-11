export const taskControlsMarkup = (archive, favorite) => {

  const isArchiveButton = archive ? `` : `card__btn--disabled`;
  const isFavoriteButton = favorite ? `` : `card__btn--disabled`;

  return (
    `<button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive ${isArchiveButton}">
      archive
    </button>
    <button
      type="button"
      class="card__btn card__btn--favorites ${isFavoriteButton}"
    >
      favorites
    </button>`
  );
};
