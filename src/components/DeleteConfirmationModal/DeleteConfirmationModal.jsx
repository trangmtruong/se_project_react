const DeleteConfirmationModal = ({
  activeModal,
  closeActiveModal,
  onDeleteItem,
  card,
}) => {
  const modalDeleteButtonClassName = "modal__delete-button";

  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={closeActiveModal}
          className="modal__close modal__close_type_grey"
          type="button"
        ></button>

        <button
          className={modalDeleteButtonClassName}
          onClick={() => onDeleteItem?.(card?._id)}
          type="button"
        >
          Yes, delete item
        </button>
        <button className="modal__cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
