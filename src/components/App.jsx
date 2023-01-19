// import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar'
import Loader from './ImageFinder/Loader'
import Button from './ImageFinder/Button'
import ImageGallery from './ImageFinder/ImageGallery'
import Modal from './ImageFinder/Modal'


// class App extends Component {
//   state = {
//     searchName: '',
//     arrayModal: [],
//     status: 'idle',
//     page: 1,
//     arraySearch: [],
//     openModal: false,
//     openButtonLoadMore: false,
//   }
const App = () => {
  const [searchName, setSearchName] = useState('');
  const [arrayModal, setArrayModal] = useState([]);
  const [status, setStatus] = useState('idle');
  const [arraySearch, setArraySearch] = useState([]);
  const [page, setPage] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [openButtonLoadMore, setOpenButtonLoadMore] = useState('');
  const [error, setError] = useState('');

  const handlFormSubmit = (propsSearchName) => {
    setSearchName(propsSearchName)
    setPage(1)
    setArraySearch([])
  };

  const choseItem = (id) => {
    setOpenModal(true)
    setArrayModal(arraySearch.filter(search => search.id === id))
    // this.setState(state => ({
    //   openModal: true,
    //   arrayModal: state.arraySearch.filter(search => search.id === id),
    // }))
  }

  const onClose = () => {
    setOpenModal(false)
    // this.setState({ openModal: false})
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
    setSearchName(prev => prev)

    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    //   searchName: prevState.searchName
    // }));
  }

  useEffect(() => {
    if (searchName==='') {
      return
    }
    setStatus('pending')
    fetch(`https://pixabay.com/api/?q=${searchName}&page=${page}&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(searchInfo => {
          if (searchInfo.hits.length !== 0) {
            if (searchInfo.totalHits - 12 * page > 0) {
              setOpenButtonLoadMore(true)
            } else {
              setOpenButtonLoadMore(false)
            }
            setArraySearch([...arraySearch, ...searchInfo.hits])
            setStatus('resolved')
            return
          }
          setStatus('rejected')
          return Promise.reject(
            new Error("Sory, no result!")
          )
        })
      .catch((error) => {
        setError(error)
        setStatus('rejected')
        })
  }, [searchName, page])


  // componentDidUpdate(prevProps, prevState) {
  //   const { page, searchName } = this.state
  //   const prevSearchName = prevState.searchName
      
  //   if (prevSearchName !== searchName || prevState.page !== page) {
  //     this.setState({ status: 'pending'})
  //     fetch(`https://pixabay.com/api/?q=${searchName}&page=${page}&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
  //       .then(response => response.json())
  //       .then(searchInfo => {
  //         if (searchInfo.hits.length !== 0) {
  //           if (searchInfo.totalHits - 12 * page > 0) {
  //             this.setState({ openButtonLoadMore: true})
  //           } else {
  //             this.setState({ openButtonLoadMore: false })
  //           }
  //           return  this.setState(prevState => ({ arraySearch: [...prevState.arraySearch, ...searchInfo.hits], status: 'resolved'}))
  //         }
  //         this.setState({ status: 'rejected' })
  //         return Promise.reject(
  //           new Error("Sory, no result!")
  //         )
  //       })
  //       .catch((error) => {
  //         this.setState({error, status: 'rejected' })
  //       })
  //   }
  // }

  // render() {
  //   const { arraySearch, status, error, openModal, arrayModal, openButtonLoadMore } = this.state

    if (status === 'idle') {
      return <>
        <Searchbar onSubmit={handlFormSubmit} />
        <ToastContainer autoClose={3000} />
      </>
    }
    
    if (status === 'pending') {
      return <>
        <Searchbar onSubmit={handlFormSubmit} />
        <ImageGallery choseItem={choseItem} listSearch={arraySearch} />
        <Loader />
      </>
    }

    if (status === 'resolved') {
      return <>
        <Searchbar onSubmit={handlFormSubmit} />
        <ImageGallery choseItem={choseItem} listSearch={arraySearch} />
        {openButtonLoadMore && <Button loadMore={loadMore} />}
        {openModal && <Modal largeImageURL={arrayModal[0].largeImageURL} tags={arrayModal[0].tags} onClose={onClose} />}
        <ToastContainer autoClose={3000} />
      </>
    }

    if (status === 'rejected') {
      return <>
        <Searchbar onSubmit={handlFormSubmit} />
        {!arraySearch.length && <h1 className='Error'>{error.message}</h1>}
        {arraySearch.length && <ImageGallery choseItem={choseItem} listSearch={arraySearch} />}
        <ToastContainer autoClose={3000} />
      </>
    }
  }
// }

export default App;
