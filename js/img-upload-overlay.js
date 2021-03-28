/* global noUISlider */

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_DIFF = 25;

const ORIGINAL_FILTER_EFFECT = 'none';
const MARVIN_FILTER_EFFECT = 'marvin';
const PHOBOS_FILTER_EFFECT = 'phobos';

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
  'chrome': {range: {min: 0,max: 1}, step: 0.1, start: 1,},
  'sepia': {range: {min: 0,max: 1}, step: 0.1, start: 1,},
  'marvin': {range: {min: 0,max: 100}, step: 1, start: 100,},
  'phobos': {range: {min: 0,max: 3}, step: 0.1, start: 3,},
  'heat': {range: {min: 1,max: 3}, step: 0.1, start: 3,},
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

const displayOverlayOnUpload = function () {
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
      console.log(`${filter[effect]}(${value}${measure})`)
    });
  });
}

const setMinusButtonListener = function () { 
  smallerButtonElement.addEventListener('click', () => {
    const scaleValue = scaleControlElement.value.slice(0, -1);
    if (+scaleValue === MIN_SCALE_VALUE) {
      return;
    }
    const newValue = +scaleValue - SCALE_DIFF;
    scaleControlElement.value = `${newValue}%`; 
    previewImageElement.style = `transform: scale(${newValue / 100})`; 
  });
}

const setPlusButtonListener = function () { 
  biggerButtonElement.addEventListener('click', () => {
    const scaleValue = scaleControlElement.value.slice(0, -1);
    if (+scaleValue === MAX_SCALE_VALUE) {
      return;
    }
    const newValue = +scaleValue + SCALE_DIFF;
    scaleControlElement.value = `${newValue}%`; 
    previewImageElement.style = `transform: scale(${newValue / 100})`; 
  });
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

effectsListElement.addEventListener('click', (evt) => {
  onEffectsRadioButtonClick(evt);
});

const hashtagsElement = overlayElement.querySelector('.text__hashtags');
hashtagsElement.addEventListener('input', () => {
  const regex = /^(\#[а-яА-ЯёЁ0-9a-zA-Z]+)\s*(\#{0}|#{1}[а-яА-ЯёЁ0-9a-zA-Z]*)\s*(\#{0}|#{1}[а-яА-ЯёЁ0-9a-zA-Z]*)\s*(\#{0}|#{1}[а-яА-ЯёЁ0-9a-zA-Z]*)\s*(\#{0}|#{1}[а-яА-ЯёЁ0-9a-zA-Z]*)$/i;
  const match = regex.exec(hashtagsElement.value);  
  console.log(match);
});


export {
  displayOverlayOnUpload,
  setMinusButtonListener,
  setPlusButtonListener
};