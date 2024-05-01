import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { React, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
function Main({ weatherData, onCardClick, clothingItems }) {
  //adding context currentTemperatureUnit using useContext
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  //declares
  // const temp = weatherData?.temperature?.[currentTemperatureUnit] || 999;
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F} ° F`
            : `${weatherData.temp.C} ° C`}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
