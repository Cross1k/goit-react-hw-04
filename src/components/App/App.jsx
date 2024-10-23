import { useEffect, useState } from "react";

import { fetchPhotosTopic } from "../searchimage.js";
import SearchForm from "../SearchForm/SearchForm.jsx";
import ImageGalary from "../ImageGalary/ImageGalary.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import LoadMore from "../LoadMore/LoadMore.jsx";

import css from "./App.module.css";
import Loader from "../Loader/Loader.jsx";

const App = () => {
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchPhotosTopic(query, currentPage);
        setTotalPages(data.total_pages);
        setPhotos((prevImages) => [...prevImages, ...data.results]);
        setTimeout(() => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }, 200);
      } catch (error) {
        setError(true);
        console.log(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [query, currentPage]);

  const handleSearch = (query) => {
    setPhotos([]);
    setCurrentPage(1);
    setQuery(query);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  const fetchIsOpen = (data) => {
    setIsOpen(true);
    setPhotoData(data);
    document.body.style.overflow = "hidden";
  };

  const modalIsClosed = () => {
    setIsOpen(false);
    setPhotoData([]);
    document.body.style.overflow = "";
  };

  return (
    <div className={css.appDiv}>
      <SearchForm onSearch={handleSearch} />
      {error && alert(errorMessage)}
      {photos != null && <ImageGalary item={photos} isOpen={fetchIsOpen} />}
      {loading && <Loader />}
      {isOpen && (
        <ImageModal
          modalData={photoData}
          isOpen={isOpen}
          isClosed={modalIsClosed}
        />
      )}
      {currentPage < totalPages && <LoadMore onClick={handleLoadMore} />}
    </div>
  );
};

export default App;
