import css from "./ImageCard.module.css";

function ImageCard({
  data: {
    alt_description,
    urls: { regular, small },
    description,
  },
  onModal,
}) {
  const dataModal = () => {
    onModal({ alt_description, regular, description });
  };
  return (
    <img
      onClick={dataModal}
      src={small}
      alt={alt_description}
      className={css.img}
    />
  );
}

export default ImageCard;
