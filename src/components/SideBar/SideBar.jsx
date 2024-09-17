import React from "react";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const SideBar = () => {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt={name} />
      <p className="sidebar__username">{name}</p>
    </div>
  );
};

export default SideBar;
