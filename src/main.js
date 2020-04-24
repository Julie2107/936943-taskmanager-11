import {TASK_COUNT} from "./components/const.js";
import BoardComponent from "./components/board.js";
import ControlsComponent from "./components/control.js";
import FilterComponent from "./components/filter.js";
import {getBoard} from "./components/board/board-utils.js";
import {render} from "./components/utils.js";
import {generateTasks} from "./mocks/board/task.js";
import {generateFilters} from "./mocks/filters.js";


const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const init = () => {
  const boardComponent = new BoardComponent();

  render(headerElement, new ControlsComponent().getElement());
  render(mainElement, new FilterComponent(filters).getElement());
  render(mainElement, boardComponent.getElement());
  getBoard(boardComponent, tasks);
};

init();
