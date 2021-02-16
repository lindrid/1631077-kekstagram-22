import {getRandomInt, stringHasMaxLength} from './util.js';

const COMMENT_MAX_LENGTH = 140;
const MAX_COMMENTS_NUMBER = 20;

const generateObjects = function (quantity) {
  const generateUniqueId = function (ids, maxRandom) {
    let id;
    do {
      id = getRandomInt(1, maxRandom);
    } while (ids.includes(id));
    ids.push(id);
    return id;
  }

  let objectsIds = [];
  let commentsIds = [];

  return new Array(quantity).fill(0).map(() => {
    const id = generateUniqueId(objectsIds, 25);
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
      let id = generateUniqueId(commentsIds, quantity * MAX_COMMENTS_NUMBER);
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
      id: id,
      url: url,
      description: description,
      likes: likes,
      comments: comments,
    };
  });
}

export {generateObjects};