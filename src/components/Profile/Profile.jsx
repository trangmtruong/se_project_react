import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import Avatar from "../Avatar/Avatar";

const Profile = ({
  handleAddClick,
  onCardClick,
  clothingItems,
  selectedCard,
  handleEditProfileModal,
  onCardLike = { onCardLike },
  handleLogOutClick,
  isLoggedIn,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileModal={handleEditProfileModal}
          handleLogOutClick={handleLogOutClick}
        />
      </section>
      <section className="profile__clothing-its">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
};

export default Profile;
