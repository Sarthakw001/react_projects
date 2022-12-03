import "./form.css";

const Form = ({ handleChange, getWeather }) => {
  return (
    <div className="form">
      <form>
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={handleChange}
          required
        ></input>
        <button className="getweather" onClick={getWeather}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
