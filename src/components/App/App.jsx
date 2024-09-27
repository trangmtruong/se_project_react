import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from "../../utils/api";
import { signUp, signIn, getCurrentUser, editProfile } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Avatar from "../Avatar/Avatar";

function App() {
  //useState hooks
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: "",
    _id: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  //functions

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
  };

  //declare handleAddClick function and call setActiveModal inside the function
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const handleEditProfileModal = () => {
    setActiveModal("editprofile");
  };
  // handleDeleteConfirmationModal = () => {
  //   setActiveModal("delete-confirmation");
  // };

  const onAddItem = (values) => {
    // grab token from localstorage and pass to createCard

    createCard({ ...values, token: localStorage.getItem("jwt") })
      .then(({ data }) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = (cardId) => {
    const token = localStorage.getItem("jwt");

    deleteCard(cardId, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter((item) => {
          return item._id !== cardId;
        });
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onSignUp = (data) => {
    signUp(data)
      .then((res) => {
        onLogIn(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onLogIn = (data) => {
    signIn(data)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        //log user in
        //adds token
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfile = (data) => {
    const token = localStorage.getItem("jwt");
    editProfile(data, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (data, isLiked) => {
    const token = localStorage.getItem("jwt");

    // Check if this card is not currently liked
    //IF NOT LIKED
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        //LIKE THE CARD

        likeCard(data._id, token)
          // the first argument is the card's id

          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === data._id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        //IF IS LIKED,
        unlikeCard(data._id, token)
          // the first argument is the card's id
          //REMOVE LIKED

          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === data._id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  //useEffects

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  //checks token
  useEffect(() => {
    //gets token from local storage
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }
    //checks token
    getCurrentUser(token)
      .then((user) => {
        //if tokemn is valid,
        //receieve the user data and set logged in to true

        setIsLoggedIn(true);
        // store the user info in a state variable
        setCurrentUser(user);
      })
      .catch(() => {
        console.error;
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleLoginModal={handleLoginModal}
              handleRegisterModal={handleRegisterModal}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  //pass clothingItems as prop
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      selectedCard={selectedCard}
                      handleEditProfileModal={handleEditProfileModal}
                      onCardLike={handleCardLike}
                      handleLogOutClick={handleLogOutClick}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={onDeleteItem}
            // handleDeleteConfirmationModal={handleDeleteConfirmationModal}
          />
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onSignUp={onSignUp}
            handleLoginModal={handleLoginModal}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onLogIn={onLogIn}
            handleRegisterModal={handleRegisterModal}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onEditProfile={onEditProfile}
          />
          {/* <DeleteConfirmationModal>
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onDeleteItem={onDeleteItem}
            {/* handleDeleteConfirmationModal={handleDeleteConfirmationModal} */}
          {/* </DeleteConfirmationModal> */}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
