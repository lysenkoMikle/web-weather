import "./forecast.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

import { ReactComponent as Humidity } from "../../img/Glyph.svg";
import { ReactComponent as Sunset } from "../../img/sunset.svg";
import { ReactComponent as Sunrise } from "../../img/sunrise.svg";
import { FaTemperatureHigh } from "react-icons/fa";
import { SiWindicss, SiBetfair } from "react-icons/si";

import {
	formatToLocalTime,
	iconUrlFromCode,
} from "../../services/weatherServices";

const Forecast = ({ weather, unit }) => {
	const {
		feels_like,
		speed,
		humidity,
		sunrise,
		sunset,
		pressure,
		hourly,
		nextDay,
	} = weather;

	const elementNextDays = [];
	const formateNextDays = (arr) => {
		let i = 2;
		while (i < arr.length) {
			elementNextDays.push(arr[i]);
			i += 2;
		}
	};
	formateNextDays(nextDay);
	return (
		<section>
			<div className="forecast__wrapper">
				<div className="this__day">
					<div className="this__day-info-item">
						<FaTemperatureHigh />
						<p>
							Real fill
							<span>{feels_like.toFixed()}°</span>
						</p>
					</div>
					<div className="this__day-info-item">
						<SiWindicss />
						<p>
							Wind
							<span>
								{speed.toFixed(1)} {unit}
							</span>
						</p>
					</div>
					<div className="this__day-info-item">
						<Humidity />
						<p>
							Humidity
							<span>{humidity} %</span>
						</p>
					</div>
					<div className="this__day-info-item">
						<SiBetfair />
						<p>
							Pressure
							<span>{pressure} mm</span>
						</p>
					</div>
					<div className="this__day-info-item">
						<Sunrise />
						<p>
							Sunrise
							<span>{formatToLocalTime(sunrise)}</span>
						</p>
					</div>
					<div className="this__day-info-item">
						<Sunset />
						<p>
							Sunset
							<span>{formatToLocalTime(sunset)}</span>
						</p>
					</div>
				</div>
				<div className="forecast">
					<div className="hourly">
						<h4>Hourly:</h4>
						<Swiper
							className="forecast-items"
							slidesPerView={3}
							modules={[Scrollbar]}
							scrollbar={{ draggable: true }}>
							{hourly.map((item) => {
								return (
									<SwiperSlide className="card" key={item.dt}>
										<span>{item.date.slice(5, 16)}</span>
										<img src={iconUrlFromCode(item.icon)} alt="" />
										<p>{item.temp.toFixed()}°</p>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
				<div className="forecast">
					<div className="daily">
						<h4>Next days:</h4>
						<Swiper
							className="forecast-items"
							slidesPerView={3}
							modules={[Scrollbar]}
							scrollbar={{ draggable: true }}>
							{elementNextDays.map((item) => {
								return (
									<SwiperSlide className="card" key={item.dt}>
										<span>{item.date.slice(5, 16)}</span>
										<img src={iconUrlFromCode(item.icon)} alt="" />
										<p>{item.temp.toFixed()}°</p>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Forecast;
