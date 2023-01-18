import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem'

const ImageGallery = ({ listSearch, choseItem }) => (
    <ul className='ImageGallery'>
        {listSearch.map(list =>
            <li key={list.id} onClick={() => choseItem(list.id)}  className='ImageGalleryItem'>
                <ImageGalleryItem webformatURL={list.webformatURL}
                    tags={ list.tags } />
            </li>)}
    </ul>
)

ImageGallery.propTypes = {
    listSearch: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                webformatURL: PropTypes.string.isRequired,
                tags: PropTypes.string.isRequired,
            })),
    choseItem: PropTypes.func.isRequired,
}


export default ImageGallery