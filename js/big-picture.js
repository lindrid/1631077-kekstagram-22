const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;

const bigPictureElement = document.querySelector('.big-picture');

const setTextContent = function (className, value) {
  bigPictureElement.querySelector(className).textContent = value;
}

const getNewElement = function (tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

const getSocialComment = function (comment) {
  const liElement = getNewElement('li', 'social__comment');
  
  const imgElement = getNewElement('img', 'social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = COMMENT_AVATAR_WIDTH;
  imgElement.height = COMMENT_AVATAR_HEIGHT;
  liElement.appendChild(imgElement);

  const pElement = getNewElement('p', 'social__text');
  pElement.textContent = comment.message;
  liElement.appendChild(pElement);

  return liElement;
}

const addClassToElement  = function (selector, addClassName, container = bigPictureElement) {
  const element = container.querySelector(selector);
  element.classList.add(addClassName);
}

const drawWindow = function (photo) {
  const fragment = document.createDocumentFragment();
  const commentsList = bigPictureElement.querySelector('.social__comments');
  commentsList.innerHTML = '';

  const divElement = bigPictureElement.querySelector('.big-picture__img');
  const imgElement = divElement.querySelector('img');
  imgElement.src = photo.url;

  setTextContent('.likes-count', photo.likes);
  setTextContent('.comments-count', photo.comments.length);
  setTextContent('.social__caption', photo.description);
  
  photo.comments.forEach(comment => {
    const commentElement = getSocialComment(comment);
    fragment.appendChild(commentElement);
  });
  commentsList.appendChild(fragment);

  bigPictureElement.classList.remove('hidden');

  addClassToElement('.social__comment-count', 'hidden');
  addClassToElement('.comments-loader', 'hidden');
  addClassToElement('body', 'modal-open', document);

  const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');
  cancelButton.addEventListener('click', () => {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  })
}

export {drawWindow};