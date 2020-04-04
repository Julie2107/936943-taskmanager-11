import {Position} from "./const.js";

const render = (container, template, place = Position.BEFOREEND) => container.insertAdjacentHTML(place, template);

export default render;
