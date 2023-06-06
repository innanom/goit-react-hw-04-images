import React from 'react';
import css from './Button.module.css'
import PropTypes from 'prop-types';

export const LoadMore = ({onClick}) => {
    return (
        <button className={css.button } type='button' onClick={onClick}>Load more</button>
    )
}

LoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
}