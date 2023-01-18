import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    static propTypes =
        {
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            onClose: PropTypes.func.isRequired,
        }

    componentDidMount() {
        window.addEventListener('keydown', this.handlKeyDown)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlKeyDown)
    }

    handlKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose()
        }
    }

    handlOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose()
        }
    }

    render() {
        return  <div className="Overlay" onClick={this.handlOverlayClick}>
            <div className="Modal">
                <img src={this.props.largeImageURL} alt={this.props.tags} />
            </div>
        </div>
    }
}

export default Modal;

