const picturesElement = document.querySelector('.pictures');

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
const drawThumbnails = function (photos, onPictureClick) {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content
    .querySelector('.picture');

  photos.forEach(photo => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = photo.url;

    const likesElement = pictureElement.querySelector('.picture__likes');
    likesElement.textConent = photo.likes;

    const commentsElement = pictureElement.querySelector('.picture__comments');
    commentsElement.textContent = photo.comments.length;

    pictureElement.photo = photo;
    pictureElement.addEventListener('click', onPictureClick);
    
    fragment.appendChild(pictureElement);
  });

  return picturesElement.appendChild(fragment);
}

export {drawThumbnails};