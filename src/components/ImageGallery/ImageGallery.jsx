import { useState, useEffect } from "react";
import { searchImages } from "./GetImages/GetImages";
import GallerySearchForm from "components/Searchbar/GallerySearchForm/GallerySearchForm";
import Loader from "components/Loader/Loader";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ButtonLoadMore } from "components/Button/Button";
import Modal from "components/Modal/Modal";


const ImageGallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState("");

    useEffect(() => {
    const fetchImages = async() => {

    try {
        const data = await searchImages(search, page);
        if (data.totalHits === 0) {
            return alert('Sorry, there are no images matching your search query. Please try again.');
        }
        setItems((prevItems) => {
            return [...prevItems, ...data.hits]
        })
    } catch (error) {
        setError(error)
    }
    finally {
        setLoading(false);
    }
        }
        if (search) {
            fetchImages();
            setLoading(true);
        }
        
    }, [search, page])
    
    const onSearch = ({search} ) => {
        if (search === "") {
            return alert("Please enter text and try again.");
        }
        setSearch(search);
        setItems([]);
        setPage(1);
    }
    
    const loadMore = () => {
        setPage((prevPage) => {
         return prevPage + 1;
        }) 
    }
    const openModal = (largeImageURL) => {
        setModalOpen(true);
        setLargeImageURL(largeImageURL);
    }
    const closeModal = () => {
        setModalOpen(false);
        setLargeImageURL("");
    }    

    const isImages = Boolean(items.length);
        
    
    return (
        <>
            {modalOpen && <Modal onClose={closeModal}>
                <img src={largeImageURL} alt="foto" />
            </Modal>}
            <GallerySearchForm onSubmit={onSearch} />
            {loading && <Loader />}
            {error && <p>Будь ласка спробуйте пізніше...</p>}
            {isImages && <ImageGalleryItem items={items} onClick={openModal} />} 
            {isImages && <ButtonLoadMore text="Load more" onClick={loadMore}/>}
        </>
    )
         
    

}

export default ImageGallery;