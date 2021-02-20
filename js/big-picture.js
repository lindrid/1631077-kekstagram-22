const bigPicture = document.querySelector('.big-picture');

const setTextContent = function (className, value) {
  bigPicture.querySelector(className).textContent = value;
}

const getNewElement = function (tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add('className');
  return element;
}

const getSocialComment = function (comment) {
  const liElement = getNewElement('li', 'social__comment');
  
  const imgElement = getNewElement('img', 'social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;
  liElement.appendChild(imgElement);

  const pElement = getNewElement('p', 'social__text');
  pElement.textContent = comment.message;
  liElement.appendChild(pElement);

  return liElement;
}

const addClassToElement  = function (selector, addClassName, container = bigPicture) {
  const element = container.querySelector(selector);
  element.classList.add(addClassName);
}

const drawWindow = function (photo) {
  const fragment = document.createDocumentFragment();
  const commentList = bigPicture.querySelector('.social__comments');
  commentList.innerHTML = '';

  const divElement = bigPicture.querySelector('.big-picture__img');
  const imgElement = divElement.querySelector('img');
  imgElement.src = photo.url;

  setTextContent('.likes-count', photo.likes);
  setTextContent('.comments-count', photo.comments.length);
  setTextContent('.social__caption', photo.description);
  
  photo.comments.forEach(comment => {
    const commentElement = getSocialComment(comment);
    fragment.appendChild(commentElement);
  });
  commentList.appendChild(fragment);

  bigPicture.classList.remove('hidden');

  addClassToElement('.social__comment-count', 'hidden');
  addClassToElement('.comments-loader', 'hidden');
  addClassToElement('body', 'modal-open', document);

  const cancelButton = bigPicture.querySelector('.big-picture__cancel');
  cancelButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  })
}

export {drawWindow};