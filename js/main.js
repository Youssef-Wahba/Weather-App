let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function setLocation(loc) {
	let cityC = document.querySelector(".day1-body .d-flex .city");
	cityC.textContent = loc.name;
	let counrtyC = document.querySelector(".day1-body .d-flex .country");
	counrtyC.textContent = loc.country;
}

function setDate(date) {
	let d = new Date(date);
	let day1 = document.querySelector(".day1-header .day");
	let day2 = document.querySelector(".day2-header .day");
	let day3 = document.querySelector(".day3-header .day");
	let hDate = document.querySelector(".day1-header .date");
	day1.textContent = days[d.getDay()];
	day2.textContent = days[d.getDay() + 1];
	day3.textContent = days[d.getDay() + 2];
	hDate.textContent = `${d.getDate()}${months[d.getMonth()]}`;
}

function setIcons(forecast) {
	let day1Icon = document.querySelector(".day1-body .weather-icon img");
	let day2Icon = document.querySelector(".day2-body .weather-icon img");
	let day3Icon = document.querySelector(".day3-body .weather-icon img");
	day1Icon.setAttribute("src", forecast.forecastday[0].day.condition.icon);
	day2Icon.setAttribute("src", forecast.forecastday[1].day.condition.icon);
	day3Icon.setAttribute("src", forecast.forecastday[2].day.condition.icon);
}

function setCondition(forecast) {
	let day1Condition = document.querySelector(".day1-body .current-condition");
	let day2Condition = document.querySelector(".day2-body .current-condition");
	let day3Condition = document.querySelector(".day3-body .current-condition");
	day1Condition.textContent = forecast.forecastday[0].day.condition.text;
	day2Condition.textContent = forecast.forecastday[1].day.condition.text;
	day3Condition.textContent = forecast.forecastday[2].day.condition.text;
}

function setMaxTempC(data) {
	let day1MaxTemp = document.querySelector(".day1-body .max-degree");
	let day2MaxTemp = document.querySelector(".day2-body .max-degree");
	let day3MaxTemp = document.querySelector(".day3-body .max-degree");
	day1MaxTemp.textContent = `${data.current.temp_c}°C`;
	day2MaxTemp.textContent = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
	day3MaxTemp.textContent = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
}

function setMinTempC(forecast) {
	let day2MinTemp = document.querySelector(".day2-body .min-degree");
	let day3MinTemp = document.querySelector(".day3-body .min-degree");
	day2MinTemp.textContent = `${forecast.forecastday[1].day.mintemp_c}°C`;
	day3MinTemp.textContent = `${forecast.forecastday[2].day.mintemp_c}°C`;
}

function setdata(data) {
	setLocation(data.location);
	setDate(data.location.localtime);
	setIcons(data.forecast);
	setCondition(data.forecast);
	setMaxTempC(data);
	setMinTempC(data.forecast);
}

(async function(){
	let apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=e46ca565861a4f12acf122858221606&q=cairo&days=3`;
	let response = await fetch(apiUrl);
	let data = await response.json();
	setdata(data);
})()

let cityInput = document.querySelector(".container .find");
cityInput.addEventListener("input", async function (city) {
	let cityName = city.target.value;
	let apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=e46ca565861a4f12acf122858221606&q=${cityName}&days=3`;
	let response = await fetch(apiUrl);
	let data = await response.json();
	setdata(data);
});
