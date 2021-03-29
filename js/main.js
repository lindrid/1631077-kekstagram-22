'use strict';
import {generateObjects as generatePhotoObjects} from './data.js';
import {drawThumbnails} from './thumbnail.js';
import {drawWindow as drawPictureWindow} from './big-picture.js';
import {
  displayOverlayOnUpload,
  setMinusButtonListener,
  setPlusButtonListener,
  setHashtagsInputValidation,
  setEffectsListClickListener,
  setCommentInputValidation,
  setOverlayCloseListeners,
  setOverlayFormSubmitListener
} from './img-upload-overlay.js';

const GENERATED_OBJECTS_NUMBER = 25;

const photos = generatePhotoObjects(GENERATED_OBJECTS_NUMBER);

const onThumbnailClick = function (evt) {
  drawPictureWindow(evt.currentTarget.photo);
}

drawThumbnails(photos, onThumbnailClick);

const doOnSuccess = function () {
  setMinusButtonListener();
  setPlusButtonListener();
  setEffectsListClickListener();
  setHashtagsInputValidation();
  setCommentInputValidation();
  setOverlayCloseListeners();
}

displayOverlayOnUpload(doOnSuccess);