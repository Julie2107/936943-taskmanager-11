import {TASK_COUNT} from "./components/const.js";
import BoardComponent from "./components/board.js";
import ControlsComponent from "./components/control.js";
import FilterComponent from "./components/filter.js";
import {render} from "./components/utils.js";
import {generateTasks} from "./mocks/board/task.js";
import {generateFilters} from "./mocks/filters.js";
import BoardController from "./components/board/board-controller.js";

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const init = () => {
  const boardComponent = new BoardComponent();
  const boardController = new BoardController(boardComponent);

  render(headerElement, new ControlsComponent());
  render(mainElement, new FilterComponent(filters));
  render(mainElement, boardComponent);
  boardController.render(tasks);
};

init();
