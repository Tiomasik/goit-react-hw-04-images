import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags }) => (
    <img className="ImageGalleryItem-image" src={ webformatURL } alt={ tags }/>
)

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem