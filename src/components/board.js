import AbstractComponent from "./abstract-component.js";

const createBoard = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoard();
  }
}
