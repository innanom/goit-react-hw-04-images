import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from '../Searchbar/Searchbar';
import { PixabayApi } from '../../servises/fetchApi';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal'


const pixabayApi = new PixabayApi();

export const App = () => {

  const [images, setImages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [allImages, setAllImages] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (images || page !== 1) {

      pixabayApi.q = images;
      pixabayApi.page = page;

      setIsLoading(true);
      pixabayApi.fetchFotos()
        .then(({ data: { hits, totalHits } }) => {
          const imagesArray = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags
          }))

          setGalleryImages(prevGalleryImages => [...prevGalleryImages, ...imagesArray]);
          setAllImages(totalHits);
          setTags(hits.tags);
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    }
  }, [images, page]);

  const handleLoadMore = () => {
    setPage(pixabayApi.page += 1);
  };

  const handleFormSubmit = searchImage => {
    setImages(searchImage);
    setPage(1);
    setGalleryImages([]);
  };

  const toggleModal = (largeImageURL) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(largeImageURL);
    
  };
 
  const totalPage = Math.ceil(allImages / pixabayApi.per_page);
  
    return (
      <div>
        {showModal && (<Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>)
        }
        <Searchbar onSubmit={handleFormSubmit} />
        {isLoading && <Loader/>}
        {galleryImages && <ImageGallery foundImages={galleryImages} openModal={toggleModal} />}
        {totalPage > page && <LoadMore onClick={handleLoadMore} />}
        <ToastContainer
          position="top-center"
          autoClose={3000} />
    </div>
  );
  }

