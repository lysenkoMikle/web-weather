import "./header.scss";
import Logo from "../../img/logo.webp";
import { FaMoon } from "react-icons/fa";
import { BsSearch, BsSunFill } from "react-icons/bs";
import { useState } from "react";

const Header = ({ lightTheme, darkTheme, topCity, setQuery, errorClass }) => {
	const [city, setCity] = useState("");

	const searchClick = (e) => {
		e.preventDefault();
		const form = document.querySelector(".form");
		if (city) setQuery({ q: city });
		form.reset();
	};

	let inpClass = "search__input";
	const ifError = (error) => {
		if (error === "error") {
			inpClass += " error";
		}
		if (error === "ok") {
			inpClass = "search__input";
		}
	};
	ifError(errorClass);
	return (
		<header>
			<div className="nav__wrapper">
				<nav className="nav">
					<div className="logo">
						<a href="/">
							<img src={Logo} alt="weather" />
						</a>
					</div>
					<div className="city">
						{topCity.map((city) => {
							return (
								<button
									className="city__item"
									key={city}
									onClick={() => {
										setQuery({ q: city });
									}}>
									{city.toUpperCase()}
								</button>
							);
						})}
					</div>
					<div className="actions">
						<div className="search">
							<form className="form">
								<label htmlFor="">
									<input
										className={inpClass}
										type="text"
										placeholder="City..."
										value={city}
										onChange={(e) => setCity(e.currentTarget.value)}
									/>
									<span>Wrong name</span>
								</label>
								<button type="submit" className="btn" onClick={searchClick}>
									<BsSearch />
								</button>
							</form>
						</div>
						<div className="nav__items">
							<button className="btn" data-theme="dark" onClick={darkTheme}>
								<FaMoon />
							</button>
							<button className="btn" data-theme="light" onClick={lightTheme}>
								<BsSunFill />
							</button>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
