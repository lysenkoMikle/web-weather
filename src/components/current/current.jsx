import "./current.scss";

import boxDark from "../../img/newDarkBg.webp";
import boxLight from "../../img/newLightBg.webp";

import {
	formatToLocalDay,
	formatToLocalTime,
	iconUrlFromCode,
} from "../../services/weatherServices";

const CurrentWeather = ({ ChangeUnits, weather, theme }) => {
	let { dt, name, country } = weather;
	let { details, icon, temp, temp_min, temp_max } = weather;

	let boxBg;
	if (theme === "light") {
		boxBg = boxLight;
	} else {
		boxBg = boxDark;
	}

	return (
		<section>
			<div
				className="current__wrapper"
				style={{ backgroundImage: `url(${boxBg}) ` }}>
				<div className="current__box">
					<div className="nav__items metric">
						<button
							onClick={ChangeUnits}
							name="metric"
							className="btn_metric active">
							°C
						</button>
						<button
							onClick={ChangeUnits}
							name="imperial"
							className="btn_metric">
							°F
						</button>
					</div>
					<div className="current__descr">
						<div className="current__info">
							<h3>{`${name}, ${country}`}</h3>
							<div className="current__info-temp">
								<p>Min: {temp_min.toFixed()}°</p>
								<p>Max: {temp_max.toFixed()}°</p>
							</div>
						</div>
						<div className="current__temp">
							<div className="current__temp-deg">
								<img src={iconUrlFromCode(icon)} alt="weather icon" />
								<p>{temp.toFixed()}°</p>
							</div>
							<span>{details}</span>
						</div>
						<div className="current__local">
							<p>Last update {formatToLocalTime(dt)}</p>
							<h4>{formatToLocalDay(dt, "cccc, dd LLL")}</h4>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CurrentWeather;
