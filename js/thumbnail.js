import {drawWindow as drawPictureWindow} from './big-picture.js';

const pictures = document.querySelector('.pictures');

const onPictureClick = function (evt) {
  if (evt.target.className === 'picture__img') {
    console.log(evt.currentTarget.photo);
    drawPictureWindow(evt.currentTarget.photo);
  }
}

/*
 * example of array:
 * photos = [
 *   [
 *     comments: (3) [{…}, {…}, {…}]
       description: "Фотография #25"
       id: 25
       likes: 137
       url: "photos/25.jpg"
 *   ]
 *   ...
 *   [
 *     ...
 *   ]
 * ]
 * 
 */
const drawThumbnails = function (photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const pictureTemplate = document.querySelector('#picture').content;
    const elementTemplate = pictureTemplate.querySelector('.picture');
    const picture = elementTemplate.cloneNode(true);

    const image = picture.querySelector('.picture__img');
    image.src = photo.url;

    const likes = picture.querySelector('.picture__likes');
    likes.textConent = photo.likes;

    const comments = picture.querySelector('.picture__comments');
    comments.textContent = photo.comments.length;

    picture.photo = photo;
    picture.addEventListener('click', onPictureClick);
    fragment.appendChild(picture);
  });

  return pictures.appendChild(fragment);
}

export {drawThumbnails};