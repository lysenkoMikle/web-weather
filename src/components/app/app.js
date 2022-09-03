import { useEffect, useState } from "react";
import getFormatedWeatherData from "../../services/weatherServices";
import CurrentWeather from "../current/current";
import Forecast from "../forecast/forecast";
import AppHeader from "../header/header";
import { useTheme } from "../../services/hookChangeTheme";
import "./app.scss";

const App = (props) => {
	const topCity = ["kyiv", "warsaw", "london", "paris", "berlin"];
	const [currentUnit, setCurrentUnit] = useState("km/h");
	const [query, setQuery] = useState({ q: "kyiv" });
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState();
	const [errClass, setErrClass] = useState("ok");

	const { theme, setTheme } = useTheme();
	const handleLightTheme = (e) => {
		document
			.querySelectorAll(".btn")
			.forEach((btn) => btn.classList.remove("active"));
		e.currentTarget.classList.add("active");
		setTheme("light");
	};
	const handleDarkTheme = (e) => {
		document
			.querySelectorAll(".btn")
			.forEach((btn) => btn.classList.remove("active"));
		e.currentTarget.classList.add("active");
		setTheme("dark");
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
	}, [query, units]);

	return (
		<div className="app container">
			<AppHeader
				errorClass={errClass}
				lightTheme={handleLightTheme}
				darkTheme={handleDarkTheme}
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
