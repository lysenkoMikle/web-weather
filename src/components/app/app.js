import { useEffect, useState } from "react";
import getFormatedWeatherData from "../../services/weatherServices";
import CurrentWeather from "../current/current";
import Forecast from "../forecast/forecast";
import AppHeader from "../header/header";

import "./app.scss";

const App = (props) => {
	const topCity = ["kyiv", "warsaw", "london", "paris", "berlin"];
	const [theme, setTheme] = useState("light");
	const [currentUnit, setCurrentUnit] = useState("km/h");
	const [query, setQuery] = useState({ q: "kyiv" });
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState();
	const [errClass, setErrClass] = useState("ok");

	const ChangeTheme = (e) => {
		let data = e.currentTarget.dataset.theme;
		let btns = document.querySelectorAll(".btn");
		localStorage.setItem("theme", data);
		setTheme(data);
		btns.forEach((btn) => btn.classList.remove("active"));
		e.currentTarget.classList.add("active");
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(data);
	};

	const ChangeUnits = (e) => {
		let btns = document.querySelectorAll(".btn_metric");
		btns.forEach((btn) => btn.classList.remove("active"));
		e.currentTarget.classList.add("active");
		const selectedUnit = e.currentTarget.name;
		if (units !== selectedUnit) setUnits(selectedUnit);
		selectedUnit === "metric" ? setCurrentUnit("km/h") : setCurrentUnit("m/h");
	};

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormatedWeatherData({ ...query, units })
				.then((data) => {
					setWeather(data);
					setErrClass("ok");
				})
				.catch((error) => {
					console.log(error);
					setErrClass("error");
				});
		};

		fetchWeather();

		const getSavedTheme = () => {
			let savedTheme = localStorage.getItem("theme");
			setTheme(savedTheme);
		};
		getSavedTheme();
	}, [query, units]);

	return (
		<div className="app container">
			<AppHeader
				errorClass={errClass}
				ChangeTheme={ChangeTheme}
				topCity={topCity}
				setQuery={setQuery}
			/>

			{weather && (
				<div className="main-info">
					<CurrentWeather
						theme={theme}
						ChangeUnits={ChangeUnits}
						weather={weather}
					/>
					<Forecast weather={weather} unit={currentUnit} />
				</div>
			)}
		</div>
	);
};

export default App;
