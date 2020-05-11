// DESCRIPTIONS
import {getRandomInteger, getRandomBoolean} from "../../components/utils.js";
import {COLORS, DAYS} from "../../components/const.js";
import moment from "moment";

const DESCRIPTIONS = [
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
const NEGATIVE = -1;
const POSITIVE = 1;

export const generateDescription = (desc) => desc[getRandomInteger(0, desc.length)];

// colors
export const generateColor = (colors) => colors[getRandomInteger(0, colors.length)];

// date

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? POSITIVE : NEGATIVE;
  const diffValue = sign * getRandomInteger(0, WEEK_PERIOD);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
// повторяющиеся дни

const setDay = (days, day) => {
  days[day] = getRandomBoolean();
  return days;
};

const generateRepeatingDays = () => {
  return DAYS.reduce(setDay, {});
};

// генерация тасков
const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    description: generateDescription(DESCRIPTIONS),
    dueDate,
    color: generateColor(COLORS),
    repeatingDays: dueDate ? false : generateRepeatingDays(),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

const generateTasks = (count) => new Array(count)
    .fill(``)
    .map(generateTask);

export {generateTask, generateTasks};
