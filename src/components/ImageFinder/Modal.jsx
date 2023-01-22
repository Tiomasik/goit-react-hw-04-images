import { useEffect } from "react";
import PropTypes from 'prop-types';

const Modal = ({onClose, largeImageURL, tags}) => {

    useEffect(() => {
        const handleKeyDown = evt => {
            console.log(evt.code)
        if (evt.code === 'Escape') {
            onClose()
        }
    }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handlOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose()
        }
    }

    return  <div className="Overlay" onClick={handlOverlayClick}>
        <div className="Modal">
            <img src={largeImageURL} alt={tags} />
        </div>
    </div>
    }

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default Modal;

