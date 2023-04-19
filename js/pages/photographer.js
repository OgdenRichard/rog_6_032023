/* eslint-disable import/extensions */
import PhotographerFactory from '../factories/PhotographerFactory.js';
import PhotographerModel from '../models/PhotographerModel.js';
import GridSubject from '../observers/GridSubject.js';
import Dropdown from '../utils/Dropdown.js';
import GridBuilder from '../utils/GridBuilder.js';

async function getPhotographer() {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('photographer_id'), 10);
  const response = await fetch('./data/photographers.json');
  const jsonData = await response.json();
  return {
    photographer: {
      ...jsonData.photographers.filter(
        (photographer) => photographer.id === id
      ),
    },
    media: [...jsonData.media.filter((media) => media.photographerId === id)],
  };
}

function displayPhotographHeader(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  try {
    const photographerResume = new PhotographerFactory(
      new PhotographerModel(photographer),
      'header'
    ).template;
    photographerHeader.prepend(photographerResume.renderArticle());
    photographerHeader.appendChild(photographerResume.renderFigure());
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  const main = document.getElementById('main');
  const { photographer, media } = await getPhotographer();
  const gridSubject = new GridSubject();
  const portfolio = new GridBuilder(media, gridSubject);
  const dropdown = new Dropdown(portfolio);
  const counterTab = new PhotographerFactory(
    photographer[0],
    'counter',
    gridSubject
  ).template;
  displayPhotographHeader(photographer[0]);
  counterTab.buildTab();
  main.appendChild(counterTab.render());
  dropdown.setFilters();
  portfolio.init();
}

init();
