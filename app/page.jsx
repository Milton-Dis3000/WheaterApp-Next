"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";

function IconLocation() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-geo-alt-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

function IconWsw() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-cursor-fill"
      viewBox="0 0 16 16"
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}

// Función para obtener el día de la semana abreviado
function getDayOfWeek(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

// Constante para imagen de proyección de clima
const weatherImages = {
  Clouds: "/HeavyCloud.png",
  Clear: "/Clear.png",
  Rain: "/Sleet.png",
  Drizzle: "/HeavyRain.png",
  Mist: "/LightCloud.png",
  Shower: "/Shower.png",
};

// Función para filtrar los datos de la proyección del clima
function filterData(data) {
  const arrFiltered = [];

  data.forEach((forecast) => {
    const txt = forecast.dt_txt;
    const dayForecast = parseInt(txt.substring(8, 10));
    const hourForecast = parseInt(txt.substring(11, 13));

    const today = new Date().getDate();

    if (dayForecast !== today && hourForecast === 12) {
      arrFiltered.push(forecast);
    }
  });

  return arrFiltered;
}

function Home() {
  // Función para obtener la fecha en el formato deseado (Sat, 8 Jul)
  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = getDayOfWeek(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-us", { month: "short" });
    return `${dayOfWeek}, ${day} ${month}`;
  }

  const [sideBar, setSideBar] = useState(false);
  function handleSideBar() {
    setSideBar(!sideBar);
  }

  const [data, setData] = useState({
    celcius: 10,
    name: "Helsinki",
    humidity: 84,
    speed: 7,
    visibility: 6.4,
    pressure: 998,
    image: "Shower.png",
    weatherText: "Shower",
  });

  

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);



  // Función para obtener la proyección del clima
  const getForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cc594a74503770cb5ddca26ecd57daa7&units=metric`
      );

      if (res.ok) {
        const data = await res.json();
        const dataFiltered = filterData(data.list);
        setForecast(dataFiltered);
      } else {
        setError("Error fetching forecast");
      }
    } catch (error) {
      setError("Error fetching forecast");
    }
  };


  // Obtener la proyección del clima inicial al cargar la página
  useEffect(() => {
    getForecast(data.name);
  }, []);

  // Función para buscar el clima de una ciudad
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cc594a74503770cb5ddca26ecd57daa7&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          let weatherText = "";

          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/HeavyCloud.png";
            weatherText = "Clouds";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/Clear.png";
            weatherText = "Clear";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/Sleet.png";
            weatherText = "Rain";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/HeavyRain.png";
            weatherText = "Drizzle";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/LightCloud.png";
            weatherText = "Mist";
          } else {
            imagePath = "/Shower.png";
            weatherText = "Shower";
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            visibility: res.data.visibility,
            pressure: res.data.main.pressure,
            image: imagePath,
            weatherText: weatherText,
          });
          setError("");
          getForecast(res.data.name);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }

          console.log(err);
        });
    }
  };



  // Función para obtener los datos del clima basados en las coordenadas geográficas
const getWeatherByCoordinates = (latitude, longitude) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cc594a74503770cb5ddca26ecd57daa7&units=metric`;

  axios
    .get(apiUrl)
    .then((res) => {
      const weatherData = res.data;
      const imagePath = weatherImages[weatherData.weather[0].main] || "/Shower.png";
      const weatherText = weatherData.weather[0].main || "Shower";

      setData({
        ...data,
        celcius: weatherData.main.temp,
        name: weatherData.name,
        humidity: weatherData.main.humidity,
        speed: weatherData.wind.speed,
        visibility: weatherData.visibility,
        pressure: weatherData.main.pressure,
        image: imagePath,
        weatherText: weatherText,
      });
      setError("");
      getForecast(weatherData.name);
    })
    .catch((err) => {
      setError("Error fetching weather data");
      console.log(err);
    });
};

// Función para manejar el clic en el botón de ubicación actual
const handleGetCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.log("Error getting current location", error);
      }
    );
  } else {
    console.log("Geolocation is not supported");
  }
};

  return (
    <main id="principalContainer">
      <section className="firstContainer">
        <div className="searchContainer">
          <div className="searchGroup">
            <button className="buttonSearch" onClick={handleSideBar}>
              Search for places
            </button>
            <div id="containerLocation" onClick={handleGetCurrentLocation}>
            <img id="mylocation" src="/mylocation.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="climeImage">
          <img
            id="cloudBackground"
            src="/Cloud-background.png"
            alt="cloudBackground"
          />
          <img id="shower" src={data.image} alt="shower" />
        </div>
        <div className="boxshowerText">
          <div className="centigradsText">
            <p>{data.celcius.toFixed(0)}°C</p>
          </div>
          <div className="showerText">
            <p>{data.weatherText}</p>
          </div>
          <div className="footerToday">
            <p>Today .</p>
            <p>
              {getDayOfWeek(new Date())}, {new Date().getDate()}{" "}
              {new Date().toLocaleString("en-us", { month: "long" })}
            </p>
          </div>
          <div className="footerIconText">
            <IconLocation />
            <p>{data.name}</p>
          </div>
        </div>
        {sideBar === true ? (
          <nav id="navBar">
            <button id="btnClose" onClick={handleSideBar}>
              X
            </button>
            <div className="search">
              <input
                id="searchStyle"
                type="text"
                placeholder="search location"
                onChange={(e) => setName(e.target.value)}
              />
              <button id="buttonSearch" onClick={handleClick}>
                <h4>Search</h4>
              </button>
            </div>
            <p>{error}</p>
            <div className="error"></div>
          </nav>
        ) : (
          ""
        )}
      </section>

      <section className="secondContainer">
        <div className="days">
          {forecast.map((day, index) => (
            <div key={index} className={`day${index + 1}`}>
              <p>{getFormattedDate(day.dt_txt)}</p>
              <div className="container-Cloud">
                <img
                  id="cloud-img"
                  src={weatherImages[day.weather[0].main]}
                  alt=""
                />
              </div>
              <div className="max-min-grad-text">
                <p>{day.main.temp_max.toFixed(0)}°C</p>
                <p>{day.main.temp_min.toFixed(0)}°C</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hightlightsText">
          <h2>Today’s Highlights</h2>
        </div>
        <div className="boxTempt">
          <div className="temp1">
            <p>Wind status</p>
            <div className="windText-Central">
              <h2>{data.speed}</h2>
              <h4>mph</h4>
            </div>
            <div className="flechaGroup">
              <div id="iconFlecha">
                <IconWsw />
                <h5>wsw</h5>
              </div>
            </div>
          </div>

          <div className="temp2">
            <p>Humidity</p>
            <div className="windText-Central">
              <h2>{data.humidity}</h2>
              <h4>%</h4>
            </div>
          </div>

          <div className="temp3">
            <p>Visibility</p>
            <div className="windText-Central">
              <h2>{data.visibility}</h2>
              <h4>miles</h4>
            </div>
          </div>

          <div className="temp4">
            <p>Air Pressure</p>
            <div className="windText-Central">
              <h2>{data.pressure}</h2>
              <h4>mb</h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
