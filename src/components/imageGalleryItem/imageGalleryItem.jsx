import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { useStyles } from './imageGalleryItemStyles';

const ImageItem = ({ image }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <li className={classes.imageListItem}>
        <img
          className={classes.image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggleModal}
        />
        {showModal && ( 
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </li>
    </>
  );
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;