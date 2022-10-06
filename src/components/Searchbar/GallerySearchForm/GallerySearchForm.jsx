import { nanoid } from "nanoid";
import { useState } from "react";
import propTypes from "prop-types";
import Searchbar from "../Searchbar";
import styles from "./GallerySearchForm.module.css";

const GallerySearchForm = ({ onSubmit }) =>  {
    const [search, setSearch] = useState("");
    
    const searchId = nanoid();
    const searchInput = {
        type: "text",
        name: "search",
        autoComplete: "off",
        autoFocus: true,
        placeholder: "Search images and photos", 
        required: true,
    }
    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSubmit({ search });
        reset();
    }
    const reset = () => {
        setSearch("");
    }
    return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={handleSubmitForm}>
                    <button type="submit" className={styles.searchFormButton} onClick={ handleSubmitForm}>
                        <span className={styles.buttonLabel}>Search</span>
                    </button>

                    <Searchbar
                        value={search} 
                        id={searchId}
                        handleChange={handleChange}
                        {...searchInput}
                    />
                </form>
            </header>
                
        )
}
GallerySearchForm.propTypes = {
    onSubmit: propTypes.func
}
export default GallerySearchForm;