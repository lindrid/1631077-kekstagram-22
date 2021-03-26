const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;


const fileElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const previewImageElement = document.querySelector('.img-upload__preview')
const bodyElement = document.querySelector('body');
bodyElement.classList.remove('modal-open');


const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');
scaleControlElement.value = `${DEFAULT_SCALE_VALUE}%`;

const displayOverlayOnUpload = function () {
  fileElement.addEventListener('change', () => {
    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
  });
}

const setMinusButtonListener = function () { 
  smallerButtonElement.addEventListener('click', () => {
    const scaleValue = scaleControlElement.value.slice(0, -1);
    if (+scaleValue === MIN_SCALE_VALUE) {
      return;
    }
    const newValue = +scaleValue - 25;
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
    const newValue = +scaleValue + 25;
    scaleControlElement.value = `${newValue}%`; 
    previewImageElement.style = `transform: scale(${newValue / 100})`; 
  });
}

export {
  displayOverlayOnUpload,
  setMinusButtonListener,
  setPlusButtonListener
};