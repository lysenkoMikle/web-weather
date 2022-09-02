import { DateTime } from "luxon";

const API_KEY = "a35821356acae928b8cc79cf88e0c330";
const Base_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
	const url = new URL(Base_URL + "/" + infoType);
	url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

	return fetch(url).then((res) => res.json());
};
const formatData = (data) => {
	const {
		coord: { lat, lon },
		main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
		name,
		dt,
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed },
	} = data;

	const { main: details, icon } = weather[0];

	return {
		lat,
		lon,
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		pressure,
		name,
		dt,
		country,
		sunrise,
		sunset,
		details,
		icon,
		speed,
	};
};

const formatForecast = (data) => {
	let { list } = data;
	let { timezone } = data.city;
	let hourly = list.slice(0, 8).map((d) => {
		return {
			dt: d.dt,
			date: d.dt_txt,
			temp: d.main.temp,
			icon: d.weather[0].icon,
		};
	});
	let nextDay = list.slice(10).map((d) => {
		return {
			dt: d.dt,
			date: d.dt_txt,
			temp: d.main.temp,
			icon: d.weather[0].icon,
		};
	});

	return { timezone, hourly, nextDay };
};
const formatToLocalTime = (secs, zone, format = "hh:mm a") =>
	DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const formatToLocalDay = (secs, zone, format = "cccc, dd LLL yyyy") =>
	DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getFormatedWeatherData = async (searchParams) => {
	const formattedCurWeather = await getWeatherData(
		"weather",
		searchParams,
	).then(formatData);

	const { lat, lon } = formattedCurWeather;
	const formattedForecastWeather = await getWeatherData("forecast", {
		lat,
		lon,
		units: searchParams.units,
	}).then(formatForecast);

	return { ...formattedCurWeather, ...formattedForecastWeather };
};

const iconUrlFromCode = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormatedWeatherData;

export { iconUrlFromCode, formatToLocalTime, formatToLocalDay };
