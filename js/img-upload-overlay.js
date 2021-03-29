/* global noUiSlider */
import {isEscPressed} from './util.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_DIFF = 25;

const ORIGINAL_FILTER_EFFECT = 'none';
const MARVIN_FILTER_EFFECT = 'marvin';
const PHOBOS_FILTER_EFFECT = 'phobos';

const MAX_COMMENT_LENGTH = 140;

const fileElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const previewImageElement = document.querySelector('.img-upload__preview')
const bodyElement = document.querySelector('body');
bodyElement.classList.remove('modal-open');

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');
scaleControlElement.value = `${DEFAULT_SCALE_VALUE}%`;

const effectLevelElement = overlayElement.querySelector('.effect-level__value');
const sliderDivElement = overlayElement.querySelector('.effect-level__slider');

const sliderOptions = {
  'chrome': {range: {min: 0,max: 1}, step: 0.1, start: 1},
  'sepia': {range: {min: 0,max: 1}, step: 0.1, start: 1},
  'marvin': {range: {min: 0,max: 100}, step: 1, start: 100},
  'phobos': {range: {min: 0,max: 3}, step: 0.1, start: 3},
  'heat': {range: {min: 1,max: 3}, step: 0.1, start: 3},
}

const filter = {
  'chrome': 'filter: grayscale',
  'sepia':  'filter: sepia',
  'marvin': 'filter: invert',
  'phobos': 'filter: blur',
  'heat':   'filter: brightness',
}

const hideSlider = () => sliderDivElement.classList.add('hidden');
const showSlider = () => sliderDivElement.classList.remove('hidden');
const isSliderHidden = () => sliderDivElement.classList.contains('hidden');

noUiSlider.create(sliderDivElement, {start:0, range: {min: 0,max: 1}});
let slider, effect;

const displayOverlayOnUpload = function (doOnSuccess) {
  fileElement.addEventListener('change', () => {
    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    slider = sliderDivElement.noUiSlider;
    hideSlider();
    
    slider.on('update.one',() => {
      const value = +slider.get();
      effectLevelElement.value = value;
      let measure = '';
      if (effect === MARVIN_FILTER_EFFECT) {
        measure = '%';
      }
      else if (effect === PHOBOS_FILTER_EFFECT) {
        measure = 'px';
      }
      imgElement.style = `${filter[effect]}(${value}${measure})`;
    });

    doOnSuccess();
  });
}

const onMinusButtonClick = function () {
  const scaleValue = scaleControlElement.value.slice(0, -1);
  if (+scaleValue === MIN_SCALE_VALUE) {
    return;
  }
  const newValue = +scaleValue - SCALE_DIFF;
  scaleControlElement.value = `${newValue}%`; 
  previewImageElement.style = `transform: scale(${newValue / 100})`; 
}

const setMinusButtonListener = function () { 
  smallerButtonElement.addEventListener('click', onMinusButtonClick);
}

const onPlusButtonClick = function () {
  const scaleValue = scaleControlElement.value.slice(0, -1);
  if (+scaleValue === MAX_SCALE_VALUE) {
    return;
  }
  const newValue = +scaleValue + SCALE_DIFF;
  scaleControlElement.value = `${newValue}%`; 
  previewImageElement.style = `transform: scale(${newValue / 100})`; 
}

const setPlusButtonListener = function () { 
  biggerButtonElement.addEventListener('click', onPlusButtonClick);
}

const imgElement = previewImageElement.querySelector('img');
let effectClass;

const onEffectsRadioButtonClick = function (evt) {
  const element = evt.target;
  if (element.name === 'effect') {
    imgElement.classList.remove(effectClass);
    effect = element.value;
    effectClass = 'effects__preview--' + effect;
    imgElement.classList.add(effectClass);

    if (effect === ORIGINAL_FILTER_EFFECT) {
      hideSlider();
      imgElement.style = '';
    }
    else {
      slider.updateOptions(sliderOptions[effect]);
      if (isSliderHidden()) {
        showSlider();
      }
    }
  }
}

const effectsListElement = document.querySelector('.effects__list');

const setEffectsListClickListener = function () {
  effectsListElement.addEventListener('click', onEffectsRadioButtonClick);
}

const hashtagsElement = overlayElement.querySelector('.text__hashtags');
const regex = /^(#[а-яА-ЯёЁ0-9a-zA-Z]+)$/;

const onHashtagsElementInput = function () {
  const value = hashtagsElement.value;
  const array = value.split(/\s/); 
  let hashtagsNumber = 0;
  for (let str of array) {
    if (str[0] === '#') {
      if (str.length === 1) {
        hashtagsElement.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        break;
      }
      const match = regex.exec(str);
      if (!match) {
        hashtagsElement.setCustomValidity(`Неправильный хэштег ${str}. Строка после решётки может состоять только из букв ` +
          '(русских и английских) и чисел');
        break;
      }
    }
    else if (str !== '') {
      hashtagsElement.setCustomValidity('хэш-тег начинается с символа #');
      break;
    }

    if (str.length > 20) {
      hashtagsElement.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      break;
    }

    if (str !== '') {
      hashtagsNumber++;
      hashtagsElement.setCustomValidity('');
    }
  }

  if (hashtagsNumber > 5) {
    hashtagsElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }

  hashtagsElement.reportValidity();
}

const setHashtagsInputValidation = function () {
  hashtagsElement.addEventListener('input', onHashtagsElementInput);
}

const commentElement = overlayElement.querySelector('.text__description');

const onCommentElementInput = function () {
  if (commentElement.value.length > MAX_COMMENT_LENGTH) {
    commentElement.setCustomValidity('длина комментария не может составлять больше 140 символов');
  }
  else {
    commentElement.setCustomValidity('');
  }
  commentElement.reportValidity();
}

const setCommentInputValidation = function () {
  commentElement.addEventListener('input', onCommentElementInput);
}


const uploadCancelButton = overlayElement.querySelector('.img-upload__cancel');
let closeOverlay;

const onWindowEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    const name = evt.target.name;
    if (name !== 'hashtags' && name !== 'description') {
      closeOverlay();
    }
  }
}

const onUploadCancelButtonClick = () => {
  closeOverlay();
}

closeOverlay = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  smallerButtonElement.removeEventListener('click', onMinusButtonClick);
  biggerButtonElement.removeEventListener('click', onPlusButtonClick);
  effectsListElement.removeEventListener('click', onEffectsRadioButtonClick);
  hashtagsElement.removeEventListener('input', onHashtagsElementInput);
  commentElement.removeEventListener('input', onCommentElementInput);
  window.removeEventListener('keydown', onWindowEscKeydown);
  uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
}

const setOverlayCloseListeners = function () {
  window.addEventListener('keydown', onWindowEscKeydown);
  uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
}

export {
  displayOverlayOnUpload,
  setMinusButtonListener,
  setPlusButtonListener,
  setHashtagsInputValidation,
  setEffectsListClickListener,
  setCommentInputValidation,
  setOverlayCloseListeners
};