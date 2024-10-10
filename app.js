const apiKey = '9979fa52de8c4c53916f10b87b0490ea'; 


// Fetching  weather data for a city
function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayCityWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// now display the city weather in a  card
function displayCityWeather(data) {
    const weatherCards = document.getElementById('cityWeatherCards');
    const weatherId = data.weather[0].id;
    const iconClass = getWeatherIcon(weatherId);

    const weatherCardHTML = `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="weather-card">
                <h3>${data.name}, ${data.sys.country}</h3>
                <i class="fas ${iconClass} weather-icon"></i>
                <p id="temperature">${data.main.temp}°C</p>
                <p id="description">${data.weather[0].description}</p>
            </div>
        </div>`;

    weatherCards.innerHTML += weatherCardHTML;
}

// selection of  appropriate weather icon based on the weather condition
function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'fa-bolt';  // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 600) {
        return 'fa-cloud-rain';  // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'fa-snowflake';  // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'fa-smog';  // (fog, dust, etc.)
    } else if (weatherId === 800) {
        return 'fa-sun';  // sunny
    } else if (weatherId > 800) {
        return 'fa-cloud';  // Cloudy
    }
}
