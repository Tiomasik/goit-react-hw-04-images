import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar'
import Loader from './ImageFinder/Loader'
import Button from './ImageFinder/Button'
import ImageGallery from './ImageFinder/ImageGallery'
import Modal from './ImageFinder/Modal'
import getAxios from './ImageFinder/getAxios'

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
  }

  const onClose = () => {
    setOpenModal(false)
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    async function getImage() {
      try {
        const searchInfo = await getAxios(searchName, page)
          if (searchInfo.data.hits.length !== 0) {
            if (searchInfo.data.totalHits - 12 * page > 0) {
              setOpenButtonLoadMore(true)
            } else {
              setOpenButtonLoadMore(false)
            }
          setArraySearch(prev => [...prev, ...searchInfo.data.hits])
          setStatus('resolved')
          return 
          }
        setStatus('rejected')
        throw new Error("Sory, no result!");
      } catch (error) {
        setError(error)
        setStatus('rejected')
      }
    }

    if (searchName==='') {
      return
    }

    setStatus('pending')
    getImage()
  }, [searchName, page])

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

export default App;
