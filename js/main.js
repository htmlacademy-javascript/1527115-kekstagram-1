const ID_MEANINGS = 25;
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const getCreatingComment = function() {
  const RANDOM_ID_COMMENTS = getRandomInteger(1, COMMENT_ID_MEANINGS);
  const NUMBER_OF_MESSAGES = getRandomInteger(1, 2);
  const RANDOM_NAME = getRandomArrayElement(NAMES);
  let totalMessage = '';
  const counterMessage = [];

  for (let i = 1; i <= NUMBER_OF_MESSAGES; i++) {
    const randomMessage = getRandomInteger(0, MESSAGES.length - 1);

    //Если выпало 2 одинаковых сообщения - первое удаляется
    if (counterMessage.includes(randomMessage)) {
      totalMessage = '';
    }

    counterMessage.push(randomMessage);

    totalMessage += `${MESSAGES[randomMessage]} `;
  }

  return {
    id: RANDOM_ID_COMMENTS,
    avatar: `img/avatar-${NAMES.findIndex((title) => title.includes(RANDOM_NAME))}.svg`,
    message: totalMessage,
    name: RANDOM_NAME
  };
};

const getRandomChecker = (min, max) => {
  const accumulator = [];

  return () => {
    let value = getRandomInteger(min, max);

    while (accumulator.includes(value) !== false) {
      if(accumulator.includes(value)) {
        value = getRandomInteger(min, max);
      }
    }

    accumulator.push(value);
    return value;
  };
};

const randomId = getRandomChecker(1, ID_MEANINGS);

const getCreateFotoDescription = () => {
  const randomIdIndex = randomId();

  return {
    id: randomIdIndex,
    url: `photos/${randomIdIndex}.jpg`,
    descriptions: FOTO_DESCRIPTION[getRandomInteger(0, FOTO_DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 250),
    comments: Array.from({length: getRandomInteger(1, 5)}, getCreatingComment)
  };
};

const getPictures = () => Array.from({length: 25}, getCreateFotoDescription);

getPictures();
