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

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Helsinki",
    humidity: 84,
    speed: 7,
    visibility: 6.4, 
    pressure: 998,
    image: 'Shower.png',
    weatherText: 'Shower',

  });
 

const[name, setName] = useState('');
const [error, setError] = useState('');

// ..........CONSTANTE FORECAST...............................//
const [forecast, setForecast] = useState([]);




  // search condition
  const handleClick = () =>{
    if (name !== ""){
      const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cc594a74503770cb5ddca26ecd57daa7&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        let imagePath='';
        let weatherText = '';


        if (res.data.weather[0].main == "Clouds"){
          imagePath = "/HeavyCloud.png"
          weatherText = "Clouds"
        } else if (res.data.weather[0].main == "Clear"){
          imagePath = "/Clear.png"
          weatherText = "Clear"
        } else if (res.data.weather[0].main == "Rain"){
          imagePath = "/Sleet.png"
          weatherText = "Rain"
        
        } else if (res.data.weather[0].main == "Drizzle"){
          imagePath = "/HeavyRain.png"
          weatherText = "Drizzle"
        } else if (res.data.weather[0].main == "Mist"){
          imagePath = "/LightCloud.png"
          weatherText = "Mist"
        } else {
          imagePath = '/Shower.png'
          weatherText = "Shower"
          
        }
      
          
        console.log(res.data);
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
          
        })
        setError('');
      })
      .catch(err => {
        if (err.response.status == 404){
          setError("Invalid City Name")
        } else {
          setError('');
        }

          console.log(err)
        });
    }
  }



  return (
    <div className="principalContainer">
      <div className="searchFond">
        <div className="search">
          <input type="text" placeholder="search location" onChange={e => setName(e.target.value)} />
          <button id="buttonSearch" onClick={handleClick}>
            <h4>Search</h4>
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>

      </div>

      <div className="firstContainer">
        <div className="searchContainer">
          <div className="searchGroup">
            <button className="buttonSearch">Seach for places</button>
            <div id="containerLocation">
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
          <img id="shower" src= {data.image} alt="shower" />
        </div>
        <div className="boxshowerText">
          <div className="centigradsText">
            <p>{data.celcius}°C</p>
          </div>
          <div className="showerText">
            <p>{data.weatherText}</p>
          </div>
          <div className="footerToday">
            <p>Today .</p>
            <p>Fri,5 Jun</p>
          </div>
          <div className="footerIconText">
            <IconLocation />
            <p>{data.name}</p>
          </div>
        </div>
      </div>

      <div className="secondContainer">
        <div className="days">

          <div className="day1">
            <p>Tomorrow</p>
            <div className="container-Cloud">
              <img id="cloud-img" src="/Sleet.png" alt="" />
            </div>

            <div className="max-min-grad-text">
              <p>16°C</p>
              <p>11°C</p>
            </div>
          </div>

          <div className="day2">
            <p>Wednesday</p>
            <div className="container-Cloud">
              <img id="cloud-img" src="/Sleet.png" alt="" />
            </div>

            <div className="max-min-grad-text">
              <p>16°C</p>
              <p>11°C</p>
            </div>
          </div>

          <div className="day3">
            <p>Thursday</p>
            <div className="container-Cloud">
              <img id="cloud-img" src="/Sleet.png" alt="" />
            </div>

            <div className="max-min-grad-text">
              <p>16°C</p>
              <p>11°C</p>
            </div>
          </div>


          <div className="day4">
            <p>Friday</p>
            <div className="container-Cloud">
              <img id="cloud-img" src="/Sleet.png" alt="" />
            </div>

            <div className="max-min-grad-text">
              <p>16°C</p>
              <p>11°C</p>
            </div>
          </div>


          <div className="day5">
            <p>Saturday</p>
            <div className="container-Cloud">
              <img id="cloud-img" src="/Sleet.png" alt="" />
            </div>

            <div className="max-min-grad-text">
              <p>16°C</p>
              <p>11°C</p>
            </div>
          </div>
         
        </div>

        <div className="hightlightsText">
          <h2>Today’s Hightlights</h2>
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
      </div>
    </div>
  );
}
export default Home