import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  handleAddClick,
  onCardClick,
  clothingItems,
  selectedCard,
  handleEditProfileModal,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileModal={handleEditProfileModal} />
      </section>
      <section className="profile__clothing-its">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
        />
      </section>
    </div>
  );
};

export default Profile;
