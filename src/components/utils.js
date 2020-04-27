import {Position, EscKeys} from "./const.js";

export const getRandomInteger = (max, min = 0) => min + Math.floor(Math.random() * (max - min));

export const getRandomBoolean = () => Math.random() > 0.5;

export const render = (container, component, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Position.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const isEscKey = (evt) => evt.key === EscKeys.ESCAPE || evt.key === EscKeys.ESC;
