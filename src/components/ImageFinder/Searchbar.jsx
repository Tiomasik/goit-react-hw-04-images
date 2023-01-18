import { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { HiOutlineSearch } from "react-icons/hi";

const Searchbar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const handlChange = (evt) => {
    const { value } = evt.currentTarget
    setSearchName(value.toLowerCase())
  }

  const handlSubmit = (evt) => {
    evt.preventDefault()

    if (searchName.trim() === '') {
      toast.warn("Please, input something!")
      return
    }

    onSubmit(searchName.trim())
    setSearchName('')
  }

  return (
    <header className='Searchbar'>
      <form className="SearchForm" onSubmit={handlSubmit}>
        <button type="submit" className="SearchForm-button">
          <HiOutlineSearch className='IconSearchButton'/>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={searchName}
          onChange={handlChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>   
  );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar;