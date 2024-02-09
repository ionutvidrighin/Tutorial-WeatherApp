const container = document.querySelector(".container");

const searchedCity = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const weatherDescription = document.querySelector(".weather-description");
const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");

const WEATHER_CONDITION = {
	clear: {
		description: "Clear",
		image: "url('./images/desk/clear-sky.jpg')",
	},
	clouds: {
		description: "Clouds",
		image: "url('./images/desk/cloudy.jpg')",
	},
	storm: {
		description: "Thunderstorm",
		image: "url('./images/desk/rainy.jpg')",
	},
	rain: {
		description: "Rain",
		image: "url('./images/desk/rainy.jpg')",
	},
	snow: {
		description: "Snow",
		image: "url('./images/desk/snowy.jpg')",
	},
	drizzle: {
		description: "Drizzle",
		image: "url('./images/desk/snowy.jpg')",
	},
	dust: {
		description: "Dust",
		image: "url('./images/desk/dust.jpg')",
	},
};

const updateBackground = (image) => { 
  container.style.backgroundImage = image
}

const updateText = (description, city, temp) => { 
  weatherDescription.textContent = description
  cityName.textContent = city
  temperature.textContent = `${temp}° Celsius`
}

const updateUI = (description, city, temp) => {
  updateText(description, city, temp)

  switch (description) {
		case WEATHER_CONDITION.clear.description:
			updateBackground(WEATHER_CONDITION.clear.image);
			break;
		case WEATHER_CONDITION.clouds.description:
			updateBackground(WEATHER_CONDITION.clouds.image);
			break;
		case WEATHER_CONDITION.storm.description:
			updateBackground(WEATHER_CONDITION.storm.image);
			break;
		case WEATHER_CONDITION.rain.description:
			updateBackground(WEATHER_CONDITION.rain.image);
			break;
		case WEATHER_CONDITION.snow.description:
			updateBackground(WEATHER_CONDITION.snow.image);
			break;
		case WEATHER_CONDITION.drizzle.description:
			updateBackground(WEATHER_CONDITION.drizzle.image);
			break;
		case WEATHER_CONDITION.dust.description:
			updateBackground(WEATHER_CONDITION.dust.image);
      break;
    default:
      updateBackground(WEATHER_CONDITION.clear.image);
	}
};

const fetchCityGeolocation = async () => {
  //console.log(searchedCity.value);
	try {
		const geoCall = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity.value}&limit=5&appid={api key}`
		);
    const geoResponse = await geoCall.json();
		const latitude = geoResponse[0].lat;
		const longitude = geoResponse[0].lon;

		try {
			const weatherCall = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid={api key}&units=metric`
			);
			const weatherResponse = await weatherCall.json();
			console.log(weatherResponse);

			const returnedCity = weatherResponse.name;
			const returnedTemp = Math.round(weatherResponse.main.temp);
			const returnedDescription = weatherResponse.weather[0].main;

			updateUI(returnedDescription, returnedCity, returnedTemp);
			searchedCity.value = "";
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
};

searchBtn.addEventListener("click", () => { 
  fetchCityGeolocation()
})



