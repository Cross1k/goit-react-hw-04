import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === "") {
      return alert("Please enter search term!");
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        name="topic"
        placeholder="Search photos..."
        className={css.inputSearch}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
