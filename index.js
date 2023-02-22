const container = document.querySelector('.container');
const form = document.querySelector('form');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const APIKEY = "0fa02aad20eec1e7fcdfb1ece22567d4";
    const city = document.querySelector('.search-box input').value;

    // translate the city name to english


    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`).then(response => response.json()).then(json => {


        error404.style.display = "none";
        error404.classList.remove("fadeIn")

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.temperature');
        const description = document.querySelector('.description');
        const humidity = document.querySelector('.humidity span');
        const wind = document.querySelector('.wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = "https://img.icons8.com/color/96/000000/sun--v1.png";
                break;
            case 'Clouds':
                image.src = "https://img.icons8.com/color/96/000000/cloud.png";
                break;
            case 'Rain':
                image.src = "https://img.icons8.com/color/96/000000/rain.png";
                break;
            case 'Snow':
                image.src = "https://img.icons8.com/color/96/000000/snow.png";
                break;
            case 'Haze':
                image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                break;

            default:
                image.src = "";
        }

        temperature.innerHTML = `${Math.round(json.main.temp - 273.15)}°C`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} Km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";

    }).catch(err => {
        error404.style.display = "";
        error404.classList.add("fadeIn");
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        container.style.height = "600px";
    });


});