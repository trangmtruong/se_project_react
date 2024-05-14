import React from "react";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__labels">
        <p className="clothes-section__items">Your items</p>
        <button className="clothes-section__add">+ Add new</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
