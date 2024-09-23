import "./ItemCard.css";
import likeButton from "../../assets/likebtn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike(item);
  };
  //checks if item was liked by current user
  //likes array should be an array of ids
  // const isLiked = item.likes.some((id) => id === currentUser._id);
  // const [isLiked, setIsLiked] = useState(false);

  //useEffect
  //set isLiked to be true or false
  // useEffect(() => {});

  //if ia auhorized user, show like button,
  //if not authorized, hide like button
  // const itemLikeButtonClassName = `item__like-button ${
  //   isLiked ? "item__like-button_visible" : "item__like-button_hidden"
  // }`;
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__like-btn"
        type="button"
        onClick={handleLike}
        src={likeButton}
        alt="Like button"
      />
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
