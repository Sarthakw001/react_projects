import { useState } from "react";
import Displayweather from "./components/Displayweather";
import Form from "./components/Form";
import Heading from "./components/Heading";
import WeatherNotAvailable from "./components/WeatherNotAvailable";
import Wrapper from "./components/Wrapper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const APIkey = "e025a280ba280939430c89aca5123d17";

  const [form, setForm] = useState({
    city: "",
  });

  const [weather, setWeather] = useState({});

  const [visible, setVisible] = useState(true);

  const visibleInstruction = () => {
    setVisible(false);
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };

  const getWeatherfromForm = async (e) => {
    e.preventDefault();
    if (form.city === "") {
      toast("Please Enter the City Name");
    } else {
      visibleInstruction();
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIkey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => data);

      setWeather({
        data: data,
      });
    }
  };

  // console.log(weather.data);

  return (
    <Wrapper>
      <ToastContainer />
      <Heading />
      <Form handleChange={handleFormChange} getWeather={getWeatherfromForm} />

      {visible && <WeatherNotAvailable />}

      {weather.data !== undefined ? (
        <Displayweather data={weather.data} />
      ) : null}
    </Wrapper>
  );
}

export default App;
