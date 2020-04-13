import {Position} from "./const.js";

export const getRandomInteger = (max, min = 0) => min + Math.floor(Math.random() * (max - min));

export const getRandomBoolean = () => Math.random() > 0.5;

export const render = (container, template, place = Position.BEFOREEND) => container.insertAdjacentHTML(place, template);
