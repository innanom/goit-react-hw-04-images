import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) =>  {

  const [searchImage, setSearchImage] = useState('');
  
  const handlenameChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();

      if (searchImage.trim() === '') {
        toast.error("Enter data to search")
          return
      }

    onSubmit(searchImage);
    setSearchImage('');
  }
    return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
            <button type="submit" className={css.searchForm_button}>
            <ImSearch size={20}/>
            </button>
            <input
              className={css.searchForm__input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search image and photos"
              value={searchImage}
              onChange={handlenameChange}
            />
              
        </form>
      </header>
    )
    
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func,
       
}
