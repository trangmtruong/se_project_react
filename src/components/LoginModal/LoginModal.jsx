import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ activeModal, onLogIn, closeActiveModal }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogIn({ email, password });
  };

  return (
    <ModalWithForm
      titleText="Log in"
      buttonText="Log in"
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={activeModal === "login"}
      name={"login"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__input_type_email">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__input_type_password">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit" className="modal__signup">
        or Sign Up
      </button>
    </ModalWithForm>
  );
};
export default LoginModal;
