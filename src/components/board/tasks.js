import AbstractComponent from "../abstract-component.js";

const createTasks = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasks();
  }
}
