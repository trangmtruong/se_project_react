import React from "react";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const SideBar = ({ handleEditProfileModal }) => {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt={name} />
      <p className="sidebar__username">{name}</p>
      <button
        onClick={handleEditProfileModal}
        type="button"
        className="sidebar__change-profile"
      >
        Change profile data
      </button>
      <button className="sidebar__logout">Log out</button>
    </div>
  );
};

export default SideBar;
