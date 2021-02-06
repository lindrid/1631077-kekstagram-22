'use strict';

const GENERATED_OBJECTS_NUMBER = 25;
const COMMENT_MAX_LENGTH = 140;

const isWrongRange = (min,max) => (min > max || min < 0 || max < 0);

/**
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE 
 */
const getRandomInt = function (min, max) {
  if (isWrongRange(min, max)) {
    return NaN;
  }
  if (min === max) {
    return max;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const stringHasMaxLength = (str, maxLength) => str.length <= maxLength;

getRandomInt(1, 10);
stringHasMaxLength('aaa', 2);

let id = 1;
const generateObjects = function (quantity) {
  const MAX_COMMENTS_NUMBER = 20;

  let commentsIds = [];

  return new Array(quantity).fill(0).map(() => {
    const url = `photos/${id}.jpg`;
    const description = `Фотография #${id}`;
    const commentsNumber = getRandomInt(1, MAX_COMMENTS_NUMBER);
    const likes = getRandomInt(15, 200);
    
    const messages = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ' +
        'В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота ' +
        'и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно ' + 
        'было поймать такой неудачный момент?!',
    ];
    const names = [
      'Артем',
      'Роман',
      'Аркадий',
      'Александр',
      'Василий',
      'Алиса',
      'Екатерина',
      'Полина',
      'Ирина',
      'Людмила',
    ];

    const canMessageStayWithName = function (messageIndex, nameIndex) {
      return !(messageIndex === 4 && nameIndex > 4);
    }

    const comments = new Array(commentsNumber).fill(0).map(() => {
      let id;
      do {
        id = getRandomInt(1, quantity * MAX_COMMENTS_NUMBER);
      } while (commentsIds.includes(id));
      commentsIds.push(id);

      const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
      
      let message, i;
      do {
        i = getRandomInt(0, messages.length - 1);
      } while (!stringHasMaxLength(messages[i], COMMENT_MAX_LENGTH));
      message = messages[i];

      let j;
      do {
        j = getRandomInt(0, names.length - 1);
      }
      while (!canMessageStayWithName(i, j))
      const name = names[j];

      return {
        id: id,
        avatar: avatar,
        message: message,
        name: name,
      };
    });

    return {
      id: id++,
      url: url,
      description: description,
      likes: likes,
      comments: comments,
    };
  });
}

generateObjects(GENERATED_OBJECTS_NUMBER);