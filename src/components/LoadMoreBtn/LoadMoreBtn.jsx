import css from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  const fetchMore = (evt) => {
    onClick(evt);
  };
  return (
    <button type="button" onClick={fetchMore} className={css.btn}>
      Load More
    </button>
  );
}

export default LoadMoreBtn;
