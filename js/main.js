'use strict';
import {generateObjects as generatePhotoObjects} from './data.js';
import { drawThumbnails } from './thumbnail.js';

const GENERATED_OBJECTS_NUMBER = 25;

const photos = generatePhotoObjects(GENERATED_OBJECTS_NUMBER);

drawThumbnails(photos);
