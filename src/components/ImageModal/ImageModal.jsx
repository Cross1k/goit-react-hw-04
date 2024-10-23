import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    backgroundColor: "transparent",
    border: "0",
  },
  overlay: {
    backgroundColor: "rgba(35, 98, 63, 0.7)",
    zIndex: "999",
    backdropFilter: "blur(1.5rem)",
  },
};

function ImageModal({
  modalData: { regular, alt_description },
  isOpen,
  isClosed,
}) {
  const closeModal = () => {
    isClosed();
  };
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
      <img src={regular} alt={alt_description} className={css.img} />
    </Modal>
  );
}

export default ImageModal;
