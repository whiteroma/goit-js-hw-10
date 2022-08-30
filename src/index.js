import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import renderMarkUp from './templates/template.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));

function onInputField(e) {
  const countries = e.target.value.trim();

  if (!countries) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countries)
    .then(renderCountriesInfo)
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function renderCountriesInfo(countries) {

  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="official-name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Languages:</b> ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markup;

  if (countries.length > 1) {
    refs.countryInfo.innerHTML = '';
  }

  renderMarkUp(countries);
}


