import { useState, useEffect } from 'react';
import * as API from '../pixabayApi/pixabayApi';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Loader from './loader/loader';
import Button from './button/button';
import EmptyGallery from './emptyGallery/emptyGallery'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const paramsForNotify = {
  position: 'right-bottom',
  distance: '16px',
  timeout: 3000,
  width: '300px',
  fontSize: '16px',
  borderRadius: '10px',
  showOnlyTheLastOne: true,
  fontFamily: 'Montserrat',
  cssAnimationStyle: 'from-right',
  fontAwesomeIconSize: '20px'
};

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);

        const data = await API.getImages(searchName, currentPage);
        const normalizedImages = API.normalizedImages(data.hits);
  
        if (data.hits.length === 0) {
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
        }
  
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
  
      } catch (error) {
        return Notify.failure('Something went wrong! Please try again.', paramsForNotify);
      } finally {
        setIsLoading(false);
      }
    };
    
    addImages();
  }, [searchName, currentPage]);


  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    if(query === searchName && searchName !== "") {
      return Notify.info('Enter new request, pleace.', paramsForNotify);
    } else if (query === "") {
      return Notify.info('Enter your request, pleace.', paramsForNotify);
    } else {
      setSearchName(query);
      setImages([]);
      setCurrentPage(1);
    }
  };

  let content;

  if (images.length > 0) {
    content = <ImageGallery images={images} />
  } else if(!isLoading && images.length === 0) {
    content = <EmptyGallery />
  }
    
  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
        {content}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={loadMore} />
        )}
    </div>
  );
};

export default App;
