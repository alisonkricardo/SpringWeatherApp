const API_KEY = '3774becd45518e9983e4f3af152866b6';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const quoteElement = document.getElementById('quote');

// Spring quotes array
const springQuotes = [
    "Smell the flowers! 🌸",
    "Spring has sprung! 🌺",
    "Breathe in the fresh air! 🌱",
    "Nature's beauty blooms! 🌷",
    "Welcome spring! 🌼"
];

// Weather icon mapping
const weatherIcons = {
    'Clear': 'clear-day.svg',
    'Clouds': 'cloudy.svg',
    'Rain': 'rainy-1.svg',
    'Snow': 'snowy-1.svg',
    'Thunderstorm': 'thunderstorms.svg',
    'Drizzle': 'rainy-1.svg',
    'Mist': 'fog.svg',
    'Fog': 'fog.svg',
    'Haze': 'haze.svg',
    'Tornado': 'tornado.svg',
    'Wind': 'wind.svg',
    'Dust': 'dust.svg',
    'Hurricane': 'hurricane.svg',
    'Hail': 'hail.svg',
    'Frost': 'frost.svg',
    'Squall': 'wind.svg',
    'Sand': 'dust.svg',
    'Ash': 'dust.svg',
    'Smoke': 'haze.svg'
};

// Date and time display
const dateTimeElement = document.getElementById('date-time');

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString(undefined, options);
    const timeStr = now.toLocaleTimeString();
    dateTimeElement.textContent = `${dateStr}, ${timeStr}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Create falling cherry blossom petals
function createPetals() {
    const petalsContainer = document.querySelector('.petals');
    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 5 + 7) + 's';
        petal.style.animationDelay = (Math.random() * 8) + 's';
        // Randomize initial vertical position
        petal.style.top = Math.random() * 80 - 100 + 'px';
        // Add the cherry blossom image
        const img = document.createElement('img');
        img.src = 'icons/sakura petal.png';
        img.alt = 'Petal';
        petal.appendChild(img);
        petalsContainer.appendChild(petal);
    }
}

// Get random quote
function getRandomQuote() {
    return springQuotes[Math.floor(Math.random() * springQuotes.length)];
}

// Update quote periodically
setInterval(() => {
    quoteElement.textContent = getRandomQuote();
}, 5000);

// Fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        console.log('API Response:', data); // Debug log

        if (data.cod === '404') {
            throw new Error('City not found');
        }

        if (data.cod !== 200) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }

        const weather = data.weather[0].main;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        console.log('Weather:', weather); // Debug log
        console.log('Temperature:', temperature); // Debug log
        console.log('Description:', description); // Debug log

        // Update UI
        tempElement.textContent = temperature;
        descriptionElement.textContent = description;
        
        // Update weather icon
        const iconName = weatherIcons[weather] || 'default.png';
        weatherIcon.src = `icons/${iconName}`;
        
        // Update quote based on weather
        if (weather === 'Clear') {
            quoteElement.textContent = "Perfect day for a picnic! 🌞";
        } else if (weather === 'Rain') {
            quoteElement.textContent = "April showers bring May flowers! 🌧️";
        }

    } catch (error) {
        console.error('Error details:', error); // Debug log
        alert('Error: ' + error.message);
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// Initialize
createPetals(); 