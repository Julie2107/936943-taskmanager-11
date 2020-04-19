import {createSorter} from "./board/sort.js";
import {createElement} from "./utils.js";
import {createTasksBoard} from "./board/tasks.js";

const createBoard = () => {
  return (
    `<section class="board container">
      ${createSorter()}
    </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoard();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
