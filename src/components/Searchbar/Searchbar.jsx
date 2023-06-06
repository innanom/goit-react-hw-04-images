import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class  Searchbar extends Component {
    state = {
        searchImage: '',
    }

    
  handlenameChange = event => {
    this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
  }

  handleSubmit = event => {
    event.preventDefault();

      if (this.state.searchImage.trim() === '') {
        toast.error("Enter data to search")
          return
      }

    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  }

    render() {
        return (
            <header className={css.searchbar}>
            <form onSubmit={this.handleSubmit} className={css.searchForm}>
                <button type="submit" className={css.searchForm_button}>
                <ImSearch size={20}/>
                </button>
                <input
                  className={css.searchForm__input}
                  type="text"
                  autocomplete="off"
                  autofocus
                  placeholder="Search image and photos"
                  value={this.state.searchImage}
                  onChange={this.handlenameChange}
                  />
              
            </form>
</header>
        )
    }
}
