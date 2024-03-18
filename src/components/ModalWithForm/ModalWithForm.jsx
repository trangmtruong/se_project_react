import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  onClose,
  isOpen,
  name,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className={`modal__content modal__content_type_${name}`}>
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={onClose}
          className="modal__close modal__close_type_grey"
          type="button"
        />
        <form className="modal__form">{children}</form>
      </div>
    </div>
  );
}
export default ModalWithForm;
