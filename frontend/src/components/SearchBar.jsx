import { useState } from "react";

//  receives the current search value and an onChange handler from its container
const SearchBar = ({ value, onchange, onSearch}) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by hotel name or location..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown} 
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;