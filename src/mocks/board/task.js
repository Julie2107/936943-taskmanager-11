// descriptions
import {getRandomInteger} from "../../components/utils.js";
import {COLORS, DAYS} from "../../components/const.js";

const Descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
  `дочитать выразительный JS`,
  `убрать в квартире`,
  `приготовить поесть`,
  `купить продукты`,
  `поспать больше 6 часов`
];

const WEEK_PERIOD = 8;

export const generateDescription = (desc) => desc[getRandomInteger(0, desc.length)];

// colors


export const generateColor = (colors) => colors[getRandomInteger(0, colors.length)];

// date

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, WEEK_PERIOD);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
// повторяющиеся дни

const generateRepeatingDays = () => {
  return DAYS.reduce(function (day, i) {
    day[i] = Math.random() > 0.5;
    return day;
  }, {});
};

// генерация тасков
const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    description: generateDescription(Descriptions),
    dueDate,
    color: generateColor(COLORS),
    repeatingDays: dueDate ? false : generateRepeatingDays(),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
