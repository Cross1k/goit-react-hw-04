import { useEffect, useState } from "react";

import { fetchPhotosTopic } from "../searchimage.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./App.module.css";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

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
        setPhotos([]);
        setError(true);
        setErrorMessage(error.message);
        setTotalPages(null);
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
    setCurrentPage(currentPage + 1);
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
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage msg={errorMessage} />}
      {photos != null && <ImageGallery item={photos} isOpen={fetchIsOpen} />}
      {loading && <Loader />}
      {isOpen && (
        <ImageModal
          modalData={photoData}
          isOpen={isOpen}
          isClosed={modalIsClosed}
        />
      )}
      {currentPage < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default App;
