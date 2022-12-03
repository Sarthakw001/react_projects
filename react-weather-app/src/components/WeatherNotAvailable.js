import "./instruction.css";

const WeatherNotAvailable = () => {
  return (
    <div className="instruction">
        <h2 className="h">Instruction</h2>
        <br/>
        <br/>
      <div className="list">
        <ul>
          <li>Enter the city name and country name.</li>
          <br/>
          <li>
            Just click on Submit button to check the weather of your Favourite city.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherNotAvailable;
