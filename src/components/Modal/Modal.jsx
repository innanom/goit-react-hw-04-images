import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown = e => {
             if (e.code === 'Escape') {
                 this.props.onClose();
        }
    }
    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div  className={css.overlay} onClick={this.handleBackdropClick}>
                <div class={css.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        );
    }
        
    
}

Modal.propTypes = {
    largeImageURL: PropTypes.string,
    onClose: PropTypes.func,
    tags: PropTypes.string
}