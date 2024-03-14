import { getRandomArrayElement, getRandomInteger } from './util.js';

const COMMENT_ID_MEANINGS = 999;
const FOTO_DESCRIPTION = [
  'Котик на пляже',
  'Четкие пацаны на районе',
  'Отпуск в горах',
  'Любимый ресторан'
];
const NAMES = [
  'Артём',
  'Егор',
  'Виктор',
  'Наталья',
  'Константин',
  'Ольга'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_FOTO_COUNT = 25;

const getTotalMessage = () => {
  const NUMBER_OF_MESSAGES = getRandomInteger(1, 2);
  const totalMessage = new Set();

  for (let i = 1; i <= NUMBER_OF_MESSAGES; i++) {
    totalMessage.add(getRandomArrayElement(MESSAGES));
  }
  return totalMessage;
};

const getCreatingComment = () => {
  const RANDOM_NAME = getRandomArrayElement(NAMES);

  return {
    id: getRandomInteger(1, COMMENT_ID_MEANINGS),
    avatar: `img/avatar-${NAMES.findIndex((title) => title.includes(RANDOM_NAME))}.svg`,
    message: getTotalMessage(),
    name: RANDOM_NAME
  };
};

const getRandomChecker = () => {
  let lastGeneratedId = 0;
  return () => {

    lastGeneratedId += 1;

    return lastGeneratedId;
  };
};

const randomId = getRandomChecker();

const getCreateFotoDescription = () => {
  const randomIdIndex = randomId();

  return {
    id: randomIdIndex,
    url: `photos/${randomIdIndex}.jpg`,
    descriptions: getRandomArrayElement(FOTO_DESCRIPTION),
    likes: getRandomInteger(15, 250),
    comments: Array.from({length: getRandomInteger(1, 5)}, getCreatingComment)
  };
};

const getPictures = () => Array.from({length: SIMILAR_FOTO_COUNT}, getCreateFotoDescription);

export { getPictures };
