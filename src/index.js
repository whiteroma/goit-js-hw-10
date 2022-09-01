import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import markupInfo from './templates/markupInfo.hbs';
import markupList from './templates/markupList.hbs';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(e => {
  const countries = e.target.value.trim();

  if (!countries) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countries)
    .then(renderCountriesInfo)
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'),
    refs.countryList.innerHTML = '',
    refs.countryInfo.innerHTML = '',)
}, DEBOUNCE_DELAY));

function renderCountriesInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }

  if (countries.length > 1) {
    refs.countryInfo.innerHTML = '';
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
    .map(markupList)
    .join('');
    refs.countryList.innerHTML = markup;
  }

  if (countries.length === 1) {
    const markup = countries
    .map(markupInfo)
    .join('');
    refs.countryList.innerHTML = ''; 
    refs.countryInfo.innerHTML = markup;
  }
}