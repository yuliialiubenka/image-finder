import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStyles } from './modalStyles';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags, onClose }) => {
  const classes = useStyles();

  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={classes.overlay} onClick={onBackdropClick}>
      <div className={classes.modal}>
        <img className={classes.modalImage} src={largeImageURL} alt={tags}/>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;