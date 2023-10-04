import { useState } from 'react';
import { useStyles } from './searchbarStyles';
import PropTypes from 'prop-types';
import Image from '../../images/search.svg';

const Searchbar = ({ onSubmit }) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');

    const handleChange = event => setInputValue(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(inputValue.trim());
        setInputValue('');
    };

    return (
        <header className={classes.header}>
            <form className={classes.searchForm} onSubmit={handleSubmit}>
                <label className={classes.label} htmlFor="searchName">
                    <input
                        className={classes.searchInput}
                        name="searchName"
                        type="text"
                        id="search"
                        placeholder="Search photos"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <button className={classes.searchButton}>
                        <img src={Image} alt="Search" />
                    </button>
                </label>
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;