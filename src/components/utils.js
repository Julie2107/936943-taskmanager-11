import {Position} from "./const.js";

export const getRandomInteger = (min = 0, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const render = (container, template, place = Position.BEFOREEND) => container.insertAdjacentHTML(place, template);

export default render;
