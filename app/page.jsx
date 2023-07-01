import Image from "next/image";
import styles from "./page.module.css";

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








export default function Home() {
  return (
    <div className="principalContainer">
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
          <img id="shower" src="/Shower.png" alt="shower" />
        </div>
        <div className="boxshowerText">
          <div className="centigradsText">
            <p>15°C</p>
          </div>
          <div className="showerText">
            <p>Shower</p>
          </div>
          <div className="footerToday">
            <p>Today .</p>
            <p>Fri,5 Jun</p>
          </div>
          <div className="footerIconText">
            <IconLocation />
            <p>Helsinki</p>
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
          <div className="day2"></div>
          <div className="day3"></div>
          <div className="day4"></div>
          <div className="day5"></div>
        </div>
        <div className="hightlightsText">
          <h2>Today’s Hightlights</h2>
        </div>
        <div className="boxTempt">
          <div className="temp1">
            <p>Wind status</p>
            <h2>7 mph</h2>
            <IconWsw/>
          </div>
          <div className="temp2"></div>
          <div className="temp3"></div>
          <div className="temp4"></div>
        </div>
      </div>
    </div>
  );
}
