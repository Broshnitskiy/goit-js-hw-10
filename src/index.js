import './css/styles.css';
import { fetchCountries } from "./services/backend";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector("#search-box");
const countryListRef = document.querySelector(".country-list");
const countryInfoRef = document.querySelector(".country-info");


inputRef.addEventListener("input", debounce(onInputText, DEBOUNCE_DELAY))

function onInputText() {
    countryListRef.innerHTML = "";
        fetchCountries(inputRef.value.trim())
            .then(countriesData => {
                if (countriesData.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                } else if (countriesData.length >= 2 && countriesData.length <= 10) { 
                    countriesData.map(country => {
                        countryListRef.insertAdjacentHTML("beforeend", `<li><img src="${country.flags.svg}" alt="country flag" width="50">${country.name.official}</li>`)
                    })
                    
                } else {
                    console.log(countriesData[0].languages)
                    // countryInfoRef.innerHTML = `<img src="${country.flags.svg}" alt="country flag">
                    // <h1>${countriesData.name.official}</h1>
                    // <p>${countriesData.capital}</p>
                    // <p>${countriesData.population}</p>
                    // <p>${Object.values(countriesData[0].languages).join(" ")}</p>`
                    
            }
                
        })
            .catch(error => {
                Notify.failure("Oops, there is no country with that name");
        });
    
    
}

