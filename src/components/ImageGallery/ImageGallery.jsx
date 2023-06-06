import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ foundImages, openModal }) => {
    
    return (
        <ul className={css.imageGallery}>
            {foundImages.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    openModal={openModal}
                    
                />
            ))}
        
        </ul>);
};

ImageGallery.propTypes = {
    openModal: PropTypes.func.isRequired,
    foundImages: PropTypes.arrayOf(
        PropTypes.exact({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        })
    )
   

}