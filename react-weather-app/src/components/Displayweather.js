import React from "react";
import "./displayweather.css";

function Displayweather({ data }) {
  console.log(data);

  const iconurl = `http://openweathermap.org/img/wn/${data.cod !== '404' ? data.weather[0].icon : null}.png`;
  return data.cod !== '404' ? (
    <React.Fragment>
      <div className="displayweather">
        <div className="city-info">
          {data.name},{data.sys.country}
          <p className="date">as of {new Date().toDateString()}</p>
          {Math.floor(data.main.temp - 273.15)}
          <sup>o</sup> <span style={{ fontSize: "22px" }}>C</span>
          <img src={iconurl} alt="" />
          <span style={{ fontSize: "20px" }}>{data.weather[0].main}</span>
        </div>
        <div className="info">
          <div className="section">
            <table class="paleBlueRows">
              <tbody>
                <tr>
                  <td>Temp-min : </td>
                  <td>
                    {Math.floor(data.main.temp_min - 273.15)} <sup>o</sup>
                  </td>
                </tr>
                <tr>
                  <td>Temp-max : </td>
                  <td>
                    {Math.floor(data.main.temp_max - 273.15)} <sup>o</sup>
                  </td>
                </tr>
                <tr>
                  <td>Humidity : </td>
                  <td>{data.main.humidity} %</td>
                </tr>
                <tr>
                  <td>Pressure : </td>
                  <td>{(data.main.pressure * 0.0075).toFixed(2)} mm of Hg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="section">
            <table class="paleBlueRows">
              <tbody>
                <tr>
                  <td>Wind : </td>
                  <td>{Math.floor((data.wind.speed * 18) / 5)} km/hr</td>
                </tr>
                <tr>
                  <td>Wind-direction : </td>
                  <td>
                    {data.wind.deg} <sup>o</sup>
                  </td>
                </tr>
                <tr>
                  <td>Sunrise : </td>
                  <td>
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                  </td>
                </tr>
                <tr>
                  <td>Sunset : </td>
                  <td>
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h2 className="error">{data.message} !</h2>
      <br />
      <h1 className="error">Search Again</h1>
    </React.Fragment>
  );
}

export default Displayweather;
