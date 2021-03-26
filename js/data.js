import {getRandomInt} from './util.js';

const MAX_COMMENTS_NUMBER = 20;
const PHOTOS_URL = 'photos/';
const AVATARS_URL = 'img/avatar-';
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const LAST_MALE_NAME_INDEX = 4;
const INDEX_OF_MESSAGE_FOR_MALE = 4;

const generateObjects = function (quantity) {
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

  const pushUniqueRandomId = function (ids, randomMax) {
    let id;
    do {
      id = getRandomInt(1, randomMax);
    } while (ids.includes(id));
    ids.push(id);
    return id;
  }

  const canMessageStayWithName = function (messageIndex, nameIndex) {
    return !(messageIndex === INDEX_OF_MESSAGE_FOR_MALE && nameIndex > LAST_MALE_NAME_INDEX);
  }

  let objectsIds = [];
  let commentsIds = [];

  return new Array(quantity).fill(0).map(() => {
    const id = pushUniqueRandomId(objectsIds, quantity);
    const url = `${PHOTOS_URL}${id}.jpg`;
    const description = `Фотография #${id}`;
    const commentsLength = getRandomInt(1, MAX_COMMENTS_NUMBER);
    const likes = getRandomInt(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER);

    const comments = new Array(commentsLength).fill(0).map(() => {
      let id = pushUniqueRandomId(commentsIds, quantity * MAX_COMMENTS_NUMBER);
      const avatar = `${AVATARS_URL}${getRandomInt(1, 6)}.svg`;
      
      const i = getRandomInt(0, messages.length - 1);
      const message = messages[i];

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
      id: id,
      url: url,
      description: description,
      likes: likes,
      comments: comments,
    };
  });
}

export {generateObjects};