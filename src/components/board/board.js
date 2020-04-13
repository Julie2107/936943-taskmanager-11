import createTaskEdit from "./task/taskEdit.js";
import createTasksList from "./taskslist.js";
import createLoadMoreButton from "./loadMoreButton.js";

const createBoard = (taskEdit, tasksList) => {
  return (
    `<section class="board container">
      <div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>

      <div class="board__tasks">
        ${createTaskEdit(taskEdit)}
        ${createTasksList(tasksList)}
      </div>
      ${createLoadMoreButton()}
    </section>`
  );
};

export default createBoard;
