import css from "./LoadMore.module.css";

function LoadMore({ onClick }) {
  const fetchMore = (evt) => {
    // evt.preventDefault();
    onClick(evt);
  };
  return (
    <button type="button" onClick={fetchMore} className={css.btn}>
      Load More
    </button>
  );
}

export default LoadMore;
