import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

function ImageGallery({ item, isOpen }) {
  return (
    <ul className={css.list}>
      {item.map((photo) => (
        <li key={photo.id} className={css.item}>
          <ImageCard data={photo} onModal={isOpen} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
