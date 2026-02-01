const state = {
  country: null,
  city: null,
  year: new Date().getFullYear()
};


const BASE = "https://restcountries.com/v3.1";
 class CountriesService {
  static async getAll() {
    const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    const data = await res.json();
    return data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  static async getByCode(code) {
    const res = await fetch(`${BASE}/alpha/${code}`);
    const data = await res.json();
    return data[0];
  }
}

function getFlag(code, size = 80) {
  return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`;
}

function formatNumber(num) {
  return num?.toLocaleString() || "—";
}

const countrySelect = document.getElementById("global-country");
const citySelect = document.getElementById("global-city");
const yearSelect = document.getElementById("global-year");

async function loadCountries() {
  const countries = await CountriesService.getAll(); 
  
  countrySelect.innerHTML = `<option value="">Select Country</option>`;
  
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.countryCode;
    opt.textContent = c.name;
    countrySelect.appendChild(opt);
  });

  document.getElementById("stat-countries").textContent = countries.length + "+";
}

countrySelect.addEventListener("change", async e => {
  if (!e.target.value) return;

  const country = await CountriesService.getByCode(e.target.value);
  state.country = country;

  citySelect.innerHTML = "";
  const capital = country.capital?.[0] || "—";
  citySelect.innerHTML = `<option selected>${capital}</option>`;
  state.city = { name: capital, lat: country.latlng?.[0], lng: country.latlng?.[1] };

  renderSelectedDestination({ cca2: e.target.value, name: country.name.common || country.name }, capital);
  renderCountryInfo(country);
});

loadCountries();

function renderSelectedDestination(country, city) {
  document.getElementById("selected-country-flag").src = getFlag(country.cca2, 80);
  document.getElementById("selected-country-flag").alt = country.name.common;
  document.getElementById("selected-country-name").textContent = country.name.common;
  document.getElementById("selected-city-name").textContent = `• ${city}`;
}

function renderCountryInfo(country) {
  document.querySelector(".dashboard-country-flag").src = getFlag(country.cca2, 160);
  document.querySelector(".dashboard-country-flag").alt = country.name.common;
  document.querySelector(".dashboard-country-title h3").textContent = country.name.common;
  document.querySelector(".official-name").textContent = country.name.official;
  document.querySelector(".region").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${country.region} • ${country.subregion || ""}`;

  const grid = document.querySelectorAll(".dashboard-country-detail .value");
  grid[0].textContent = country.capital?.[0] || "—";
  grid[1].textContent = formatNumber(country.population);
  grid[2].textContent = formatNumber(country.area) + " km²";
  grid[3].textContent = country.region;
  grid[4].textContent = country.idd?.root ? country.idd.root + (country.idd.suffixes?.[0] || "") : "—";
  grid[5].textContent = "Right"; 
  grid[6].textContent = "Saturday"; 

  document.querySelector(".dashboard-country-extra:nth-child(1) .extra-tags").innerHTML =
    Object.values(country.currencies || {}).map(c => `<span class="extra-tag">${c.name} (${c.symbol})</span>`).join("");

  document.querySelector(".dashboard-country-extra:nth-child(2) .extra-tags").innerHTML =
    Object.values(country.languages || {}).map(l => `<span class="extra-tag">${l}</span>`).join("");

  document.querySelector(".dashboard-country-extra:nth-child(3) .extra-tags").innerHTML =
    (country.borders || []).map(b => `<span class="extra-tag border-tag">${b}</span>`).join("") || "<span class='extra-tag'>None</span>";

  document.querySelector(".btn-map-link").href = `https://www.google.com/maps/place/${country.name.common}`;
}

setInterval(() => {
  if (!state.country) return;
  const offset = state.country.timezones?.[0] || "UTC";
  const time = new Date().toLocaleTimeString("en-US", { timeZone: offset });
  document.getElementById("country-local-time").textContent = time;
}, 1000);

const holidaysContent = document.getElementById("holidays-content");
const holidaysSelection = document.getElementById("holidays-selection");

async function loadHolidays(countryCode = "EG", year = 2026) {
  const flagImg = holidaysSelection.querySelector(".selection-flag");
  const countryNameSpan = holidaysSelection.querySelector("span");
  const yearSpan = holidaysSelection.querySelector(".selection-year");

  flagImg.src = getFlag(countryCode, 40);
  countryNameSpan.textContent = state.country?.name?.common || countryNameSpan.textContent;
  yearSpan.textContent = year;

  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays = await res.json();

    holidaysContent.innerHTML = ""; 

    holidays.forEach(h => {
      const date = new Date(h.date);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const weekday = date.toLocaleString('default', { weekday: 'long' });

      const card = document.createElement("div");
      card.className = "holiday-card";
      card.innerHTML = `
        <div class="holiday-card-header">
          <div class="holiday-date-box"><span class="day">${day}</span><span class="month">${month}</span></div>
          <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
        </div>
        <h3>${h.localName}</h3>
        <p class="holiday-name">${h.name}</p>
        <div class="holiday-card-footer">
          <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${weekday}</span>
          <span class="holiday-type-badge">${h.types?.[0] || "Public"}</span>
        </div>
      `;
      holidaysContent.appendChild(card);
    });

  } catch (err) {
    holidaysContent.innerHTML = `<p class="error-msg">Failed to load holidays.</p>`;
    console.error(err);
  }
}

countrySelect.addEventListener("change", () => {
  if (state.country?.cca2) loadHolidays(state.country.cca2, state.year);
});

document.getElementById("global-year").addEventListener("change", e => {
  state.year = +e.target.value;
  if (state.country?.cca2) loadHolidays(state.country.cca2, state.year);
});

loadHolidays();

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");

function showView(viewId, title, subtitle) {
  views.forEach(v => v.classList.remove("active"));
  const view = document.getElementById(viewId);
  if (view) view.classList.add("active");

  navItems.forEach(item => item.classList.remove("active"));
  const activeNav = document.querySelector(`.nav-item[data-view="${viewId.replace("-view","")}"]`);
  if (activeNav) activeNav.classList.add("active");

  if (pageTitle) pageTitle.textContent = title;
  if (pageSubtitle) pageSubtitle.textContent = subtitle;

  if (view) view.scrollIntoView({ behavior: "smooth", block: "start" });
}

navItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const view = item.getAttribute("data-view");
    switch(view) {
      case "dashboard":
        showView("dashboard-view", "Dashboard", "Welcome back! Ready to plan your next adventure?");
        break;
      case "holidays":
        showView("holidays-view", "Holidays", "Browse public holidays for Egypt and plan your trips around them");
        break;
      case "events":
        showView("events-view", "Events", "Discover concerts, sports, theatre and more in Cairo");
        break;
      case "weather":
        showView("weather-view", "Weather", "Check 7-day weather forecasts for Cairo");
        break;
      case "long-weekends":
        showView("long-weekends-view", "Long Weekends", "Find holidays near weekends - perfect for planning mini-trips!");
        break;
      case "currency":
        showView("currency-view", "Currency Converter", "Convert between currencies with live exchange rates");
        break;
      case "sun-times":
        showView("sun-times-view", "Sun Times", "View sunrise and sunset times for any city");
        break;
      case "my-plans":
        showView("my-plans-view", "My Plans", "Review your saved trips and itineraries");
        break;
    }
  });
});

yearSelect.addEventListener("change", () => {
  state.year = +yearSelect.value;
  updateHolidays();
});

const TM_API_KEY = "VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y";
const TM_BASE_URL = "https://app.ticketmaster.com/discovery/v2";

const exploreBtn = document.getElementById("explore-btn"); 

async function loadHolidays(countryCode, year) {
  if (!countryCode) return;

  const flagImg = holidaysSelection.querySelector(".selection-flag");
  const countryNameSpan = holidaysSelection.querySelector("span");
  const yearSpan = holidaysSelection.querySelector(".selection-year");

  if (flagImg) flagImg.src = getFlag(countryCode, 40);
  if (countryNameSpan) countryNameSpan.textContent = state.country?.name?.common || countryNameSpan.textContent;
  if (yearSpan) yearSpan.textContent = year;

  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays = await res.json();

    holidaysContent.innerHTML = ""; 

    holidays.forEach(h => {
      const date = new Date(h.date);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const weekday = date.toLocaleString('default', { weekday: 'long' });

      const card = document.createElement("div");
      card.className = "holiday-card";
      card.innerHTML = `
        <div class="holiday-card-header">
          <div class="holiday-date-box"><span class="day">${day}</span><span class="month">${month}</span></div>
          <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
        </div>
        <h3>${h.localName}</h3>
        <p class="holiday-name">${h.name}</p>
        <div class="holiday-card-footer">
          <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${weekday}</span>
          <span class="holiday-type-badge">${h.types?.[0] || "Public"}</span>
        </div>
      `;
      holidaysContent.appendChild(card);
    });

  } catch (err) {
    holidaysContent.innerHTML = `<p class="error-msg">Failed to load holidays.</p>`;
    console.error(err);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const eventsGrid = document.getElementById("events-content");

  const TM_API_KEY = "VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y";
  const city = "Cairo";
  const countryCode = "EG";
  const selectedCity = state.city?.name;

  async function loadEvents() {
    if (!eventsGrid) return;

    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TM_API_KEY}&city=${encodeURIComponent(city)}&countryCode=${countryCode}&size=10`
      );
      const data = await res.json();
      const events = data._embedded?.events || [];

      eventsGrid.innerHTML = "";

      events.forEach(event => {
        const imageObj = event.images?.find(img => img.ratio === "16_9") || event.images?.[0];
        const imageUrl = imageObj?.url || "https://via.placeholder.com/400x200?text=No+Image";
        const category = event.classifications?.[0]?.segment?.name || "Event";
        const name = event.name;
        const venue = event._embedded?.venues?.[0]?.name || "Unknown Venue";
        const eventCity = event._embedded?.venues?.[0]?.city?.name || city;
        const date = event.dates?.start?.localDate || "";
        const time = event.dates?.start?.localTime || "";
        const ticketUrl = event.url || "#";

        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
          <div class="event-card-image">
            <img src="${imageUrl}" alt="${name}">
            <span class="event-card-category">${category}</span>
            <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
          </div>
          <div class="event-card-body">
            <h3>${name}</h3>
            <div class="event-card-info">
              <div><i class="fa-regular fa-calendar"></i>${date}${time ? " at " + time : ""}</div>
              <div><i class="fa-solid fa-location-dot"></i>${venue}, ${eventCity}</div>
            </div>
            <div class="event-card-footer">
              <button class="btn-event"><i class="fa-regular fa-heart"></i> Save</button>
              <a href="${ticketUrl}" class="btn-buy-ticket" target="_blank"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
            </div>
          </div>
        `;
        eventsGrid.appendChild(card);
      });

      if (events.length === 0) {
        eventsGrid.innerHTML = `<p style="text-align:center; padding:20px;">No events found.<p>`;
      }
    } catch (err) {
      console.error(err);
      eventsGrid.innerHTML = `<p style="text-align:center; padding:20px;">Failed to load events. Try again later.</p>`;
    }
  }

  loadEvents();
});

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto';


const weatherLocation = document.querySelector('.weather-location span');
const weatherTime = document.querySelector('.weather-time');
const weatherTemp = document.querySelector('.weather-hero-temp .temp-value');
const weatherCondition = document.querySelector('.weather-condition');
const weatherFeels = document.querySelector('.weather-feels');
const weatherHighLow = document.querySelector('.weather-high-low');
const weatherDetailsGrid = document.querySelector('.weather-details-grid');
const hourlyForecast = document.querySelector('.hourly-scroll');
const forecastList = document.querySelector('.forecast-list');

async function fetchWeatherData() {
  try {
    const res = await fetch(WEATHER_URL);
    const data = await res.json();

    const current = data.current_weather;
    weatherLocation.textContent = 'Cairo';
    const date = new Date();
    weatherTime.textContent = date.toLocaleString('default', { weekday: 'long', day: 'numeric', month: 'short' });
    weatherTemp.textContent = current.temperature;
    weatherCondition.textContent = mapWeatherCode(current.weathercode);
    weatherFeels.textContent = `Feels like ${current.temperature}°C`; 
    weatherHighLow.innerHTML = `<span class="high"><i class="fa-solid fa-arrow-up"></i> ${data.daily.temperature_2m_max[0]}°</span><span class="low"><i class="fa-solid fa-arrow-down"></i> ${data.daily.temperature_2m_min[0]}°</span>`;


    weatherDetailsGrid.innerHTML = `
      <div class="weather-detail-card">
        <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
        <div class="detail-info">
          <span class="detail-label">Humidity</span>
          <span class="detail-value">N/A</span>
        </div>
      </div>
      <div class="weather-detail-card">
        <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
        <div class="detail-info">
          <span class="detail-label">Wind</span>
          <span class="detail-value">${current.windspeed} km/h</span>
        </div>
      </div>
      <div class="weather-detail-card">
        <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
        <div class="detail-info">
          <span class="detail-label">UV Index</span>
          <span class="detail-value">${data.daily.uv_index_max[0]}</span>
        </div>
      </div>
      <div class="weather-detail-card">
        <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
        <div class="detail-info">
          <span class="detail-label">Precipitation</span>
          <span class="detail-value">${data.daily.precipitation_sum[0]} mm</span>
        </div>
      </div>
    `;


    hourlyForecast.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const time = data.hourly.time[i];
      const temp = data.hourly.temperature_2m[i];
      const code = data.hourly.weathercode[i];
      const hourItem = document.createElement('div');
      hourItem.className = 'hourly-item';
      hourItem.innerHTML = `
        <span class="hourly-time">${new Date(time).getHours()}:00</span>
        <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
        <span class="hourly-temp">${temp}°</span>
      `;
      hourlyForecast.appendChild(hourItem);
    }

    forecastList.innerHTML = '';
    for (let i = 0; i < data.daily.time.length; i++) {
      const dayDate = new Date(data.daily.time[i]);
      const dayTempMax = data.daily.temperature_2m_max[i];
      const dayTempMin = data.daily.temperature_2m_min[i];
      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-day';
      forecastItem.innerHTML = `
        <div class="forecast-day-name"><span class="day-label">${dayDate.toLocaleString('default', { weekday: 'short' })}</span><span class="day-date">${dayDate.getDate()} ${dayDate.toLocaleString('default', { month: 'short' })}</span></div>
        <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
        <div class="forecast-temps"><span class="temp-max">${dayTempMax}°</span><span class="temp-min">${dayTempMin}°</span></div>
      `;
      forecastList.appendChild(forecastItem);
    }

  } catch (err) {
    console.error(err);
  }
}


function mapWeatherCode(code) {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return codes[code] || 'Unknown';
}

fetchWeatherData();


const exploreButton = document.querySelector('#global-search-btn'); 


exploreButton.addEventListener('click', function() {

  fetchLongWeekendData();
});


async function fetchLongWeekendData() {
  const selectedCountryCode = 'EG'; 
  const year = 2026; 

  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${selectedCountryCode}`);
    const holidays = await response.json();

    const longWeekends = findLongWeekends(holidays);


    updateLongWeekendUI(longWeekends);
  } catch (error) {
    console.error('Error fetching long weekends:', error);
  }
}


function findLongWeekends(holidays) {
  const longWeekends = [];

  holidays.forEach(holiday => {
    const holidayDate = new Date(holiday.date);
    if (isWeekend(holidayDate)) {
      longWeekends.push({
        name: holiday.name,
        date: holiday.date,
      });
    }
  });
  return longWeekends;
}


function isWeekend(date) {
  const day = date.getDay();
  return day === 6 || day === 0; 
}


function updateLongWeekendUI(longWeekends) {
  const longWeekendContainer = document.querySelector('#lw-content'); 
  longWeekendContainer.innerHTML = ''; 

  longWeekends.forEach(weekend => {
    const lwCard = document.createElement('div');
    lwCard.className = 'lw-card';
    lwCard.innerHTML = `
      <div class="lw-card-header">
        <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> 4 Days</span>
        <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
      </div>
      <h3>${weekend.name}</h3>
      <div class="lw-dates"><i class="fa-regular fa-calendar"></i> ${weekend.date}</div>
      <div class="lw-info-box success"><i class="fa-solid fa-check-circle"></i> No extra days off needed!</div>
      <div class="lw-days-visual">
        <div class="lw-day weekend"><span class="name">Sat</span><span class="num">1</span></div>
        <div class="lw-day weekend"><span class="name">Sun</span><span class="num">2</span></div>
      </div>
    `;
    longWeekendContainer.appendChild(lwCard);
  });
}



const currencyAmount = document.getElementById('currency-amount');
const currencyFrom = document.getElementById('currency-from');
const currencyTo = document.getElementById('currency-to');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-currencies-btn');
const currencyResult = document.getElementById('currency-result');


const EXCHANGE_API_KEY = '805842951e5953ad31497176';
const EXCHANGE_BASE_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}`;


async function convertCurrency() {
  const amount = parseFloat(currencyAmount.value);
  const from = currencyFrom.value;
  const to = currencyTo.value;

  if (!amount || amount <= 0) return;

  try {
    const res = await fetch(`${EXCHANGE_BASE_URL}/pair/${from}/${to}/${amount}`);
    const data = await res.json();

    if (data.result === 'success') {
      const rate = data.conversion_rate;
      const convertedAmount = data.conversion_result;

      currencyResult.querySelector('.conversion-from .amount').textContent = amount.toFixed(2);
      currencyResult.querySelector('.conversion-from .currency-code').textContent = from;
      currencyResult.querySelector('.conversion-to .amount').textContent = convertedAmount.toFixed(2);
      currencyResult.querySelector('.conversion-to .currency-code').textContent = to;
      currencyResult.querySelector('.exchange-rate-info p').textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
      currencyResult.querySelector('.exchange-rate-info small').textContent = `Last updated: ${data.time_last_update_utc}`;
    }
  } catch (err) {
    console.error('Currency conversion error:', err);
  }
}


swapBtn.addEventListener('click', () => {
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  convertCurrency();
});


convertBtn.addEventListener('click', convertCurrency);


convertCurrency();




