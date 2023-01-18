import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar'
import Loader from './ImageFinder/Loader'
import Button from './ImageFinder/Button'
import ImageGallery from './ImageFinder/ImageGallery'
import Modal from './ImageFinder/Modal'


class App extends Component {
  state = {
    searchName: '',
    arrayModal: [],
    status: 'idle',
    page: 1,
    arraySearch: [],
    openModal: false,
    openButtonLoadMore: false,
  }

  handlFormSubmit = (searchName) => {
    this.setState({searchName, page: 1, arraySearch: []})
  };

  choseItem = (id) => {
    this.setState(state => ({
      openModal: true,
      arrayModal: state.arraySearch.filter(search => search.id === id),
    }))
  }

  onClose = () => {
    this.setState({ openModal: false})
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      searchName: prevState.searchName
    }));
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { page, searchName } = this.state
    const prevSearchName = prevState.searchName
      
    if (prevSearchName !== searchName || prevState.page !== page) {
      this.setState({ status: 'pending'})
      fetch(`https://pixabay.com/api/?q=${searchName}&page=${page}&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(searchInfo => {
          if (searchInfo.hits.length !== 0) {
            if (searchInfo.totalHits - 12 * page > 0) {
              this.setState({ openButtonLoadMore: true})
            } else {
              this.setState({ openButtonLoadMore: false })
            }
            return  this.setState(prevState => ({ arraySearch: [...prevState.arraySearch, ...searchInfo.hits], status: 'resolved'}))
          }
          this.setState({ status: 'rejected' })
          return Promise.reject(
            new Error("Sory, no result!")
          )
        })
        .catch((error) => {
          this.setState({error, status: 'rejected' })
        })
    }
  }

  render() {
    const { arraySearch, status, error, openModal, arrayModal, openButtonLoadMore } = this.state

    if (status === 'idle') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <ToastContainer autoClose={3000} />
      </>
    }
    
    if (status === 'pending') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />
        <Loader />
      </>
    }

    if (status === 'resolved') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />
        {openButtonLoadMore && <Button loadMore={this.loadMore} />}
        {openModal && <Modal largeImageURL={arrayModal[0].largeImageURL} tags={arrayModal[0].tags} onClose={this.onClose} />}
        <ToastContainer autoClose={3000} />
      </>
    }

    if (status === 'rejected') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        {!arraySearch.length && <h1 className='Error'>{error.message}</h1>}
        {arraySearch.length && <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />}
        <ToastContainer autoClose={3000} />
      </>
    }
  }
}

export default App;
