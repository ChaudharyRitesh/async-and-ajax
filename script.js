'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


// AJAX CALLBACK

const renderCountry = function(data, className = '') {
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
        </article>
        `;
    
        countriesContainer.insertAdjacentHTML('beforeend', html);
        // countriesContainer.style.opacity = 1;
}

// handling an error and rejection in promises
const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

/*
// XMLHttpRequest
const getCountryData = function(country) {

const request = new XMLHttpRequest();

request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send();

request.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
});
}
getCountryData('india')
*/

/*
const getCountryAndNeighbour = function(country) {

    const request = new XMLHttpRequest();
    
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

    request.send();
    
    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);

        // render country
        renderCountry(data);
    
        // render neighbour
        const [neighbour] = data.border;

        if(!neighbour) return;

        // AJAX CALL 2
        const request2 = new XMLHttpRequest();

        request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);

        request2.send();

        request2.addEventListener('load', function() {
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, 'neighbour');
        });
    });
}
getCountryAndNeighbour('portugal');

*/

/*
setTimeout(() => {
    console.log("1 second passed");
    setTimeout(() => {
        console.log("2 seconds passed");
        setTimeout(() => {
            console.log("3 seconds passed");
            setTimeout(() => {
                console.log("4 seconds passed");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

*/


//////////////////////////////////////////////////
/////// PROMISES AND FETCH API //////////////////


// Promise ==> an object that is used as a placeholder for the future result of an aysnchronous operation
// OR a container for a future value.

// ex: buying a lottery ticket
// adv: no loger rely on events and callback functions


// const request = fetch('https://restcountries.eu/rest/v2/name/india');

// const getCountryData = function(country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//       .then(function (response) {
//         console.log(response);
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         renderCountry(data[1])
//       });
// };

// get json

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
};

// with arrow functions
// const request = fetch('https://restcountries.eu/rest/v2/name/india');

// const getCountryData = (country) => {
//     // country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//       .then(response => {
//           console.log(response);

//           // creating a manual error for UI.
//           if (!response.ok) {
//             throw new Error(`Country not found ${response.status}`);
//           }
//           return response.json();
//         })
//       .then(data => {
//         renderCountry(data[1]);
//         const neighbour = data[1].borders[1];

//         if (!neighbour) return;

//         // country 2
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Country not found ${response.status}`);
//         }
//         return response.json();
//         })
//       .then(data => renderCountry(data, "neighbour"))
//       .catch(err => {
//         console.error(`${err} internet connection disrupted the fetch 😃`);
//         renderError(`something went wrong 🎇🎇🎇🎇 ${err.message}. try again`)
//       })
//       .finally(() => {
//         countriesContainer.style.opacity = 1;
//       })
// };


const getCountryData = function (country) {
    // Country 1
    getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'Country not found'
    )
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
  
        if (!neighbour) throw new Error('No neighbour found!');
  
        // Country 2
        return getJSON(
          `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
          'Country not found'
        );
      })
  
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };
btn.addEventListener('click', function() {
    getCountryData('usa');
});

// getCountryData('fiji');