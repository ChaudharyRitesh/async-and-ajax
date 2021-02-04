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
        countriesContainer.style.opacity = 1;
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

/*
// with arrow functions
const request = fetch('https://restcountries.eu/rest/v2/name/india');

const getCountryData = (country) => {
    // country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(response => {
          console.log(response);

          // creating a manual error for UI.
          if (!response.ok) {
            throw new Error(`Country not found ${response.status}`);
          }
          return response.json();
        })
      .then(data => {
        renderCountry(data[1]);
        const neighbour = data[1].borders[1];

        if (!neighbour) return;

        // country 2
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Country not found ${response.status}`);
        }
        return response.json();
        })
      .then(data => renderCountry(data, "neighbour"))
      .catch(err => {
        console.error(`${err} internet connection disrupted the fetch 😃`);
        renderError(`something went wrong 🎇🎇🎇🎇 ${err.message}. try again`)
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      })
};
*/
/*
const getCountryData = country => {
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
*/

// coding challenge
/*
const whereAmI = (lat, lng) => {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(res => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log(`you are in ${data.city}, ${data.country}`);
        return fetch(
          `https://restcountries.eu/rest/v2/name/${data.country}`
        ).then(res => {
          if (!res.ok) {
            throw new Error(`Country not found ${res.status}`);
          }
          return res.json();
        });
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`${err.message} **`));
}

// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)
*/

// What the heck is this EVENT LOPP

// console.log("first")
// setTimeout(() => {console.log("second")},5000);
// Promise.resolve('resolved promise 1').then( res => console.log(res));
// console.log("third");

// PROMISES IN JAVASCRIPT

// const newPromise = new Promise(function(resolve, reject) {
//   console.log('lottery draw is happening');
//   setTimeout(() => {
//     if(Math.random() >= 0.5){
//       resolve('You win 🏆')
//     } else {
//       reject(new Error('You lost the money'))
//     }
  
//   }, 1000);
// });

// newPromise.then(res => console.log(res)).catch(err => console.error(err))


// promisifying setTimeout
// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout((resolve, seconds * 1000));
//   });
// };

// wait(2)
//   .then(() => {
//     console.log("waited for 2 seconds");
//     return wait(1);
//   })
//   .then(() => console.log("waited for 1 seconds"));

/*

// promisifying our geolocation api
const getPosition = function(){
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


const whereAmI = () => {
  getPosition().then(pos => {
    const {latitude:lat, longitude:lng} = (pos.coords);

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city}, ${data.country}`);
      return fetch(
        `https://restcountries.eu/rest/v2/name/${data.country}`
      ).then(res => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      });
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} **`));
};

btn.addEventListener('click', whereAmI);
*/



/*
// coding challange
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function(imgPath){
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function(){
      imgContainer.append(img);
      resolve(img)
    });

    img.addEventListener('error', function() {
      reject(new Error('Image not found'));
    });
  });
};

let currentimg;
createImage("img/img-1.jpg")
  .then(img => {
    currentimg = img
    console.log("Image 1 loaded");
    return wait(2)
  })
  .then(() => {
    currentimg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentimg = img
    console.log("Image 2 loaded");
    return wait(2)
  })
  .then(() => {
    currentimg.style.display = 'none';
  })
  .catch(err => console.error(err));
  */


// async await and error handling with it

const getPosition = function(){
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = (async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error("Problem getting location");
    const getData = await resGeo.json();
    console.log(getData);

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${getData.country}`
    );

    if (!resGeo.ok) throw new Error("Problem getting country");

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `You are in ${getData.city}, ${getData.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    throw err;
  }
})(
  // whereAmI()
  //   .then(city => console.log(`${city}`))
  //   .catch(err => console.error(`${err.message}`))
  //   .finally(() => console.log("done"));

  // handle data with async
async function () {
    try {
      const city = await whereAmI();
      console.log(`2: ${city}`);
    } catch (err) {
      console.error(`${err.message}`);
    }
    console.log("done");
})();