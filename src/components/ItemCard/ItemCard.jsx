import "./ItemCard.css";
import likeButton from "../../assets/likebtn.svg";
function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike(item);
  };
  //checks if item was liked by current user
  //likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === CurrentUserContext._id);

  //create a variable which you then set in "className" for the like button
  // const itemLikeButtonClassName = ;
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
