import React from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSearchValue } from 'redux/slices/searchSlice'


/* Component uses react context so initialize it first in parent component to use with
Use next object as search params:
{
    key: "UserList",      // key from store to which save user search input
    value: searchValue,   // initial value of search filed
    placeholder: "Text",  // placeholder for search field
    showSearch: false     // idk what is this for
}
*/

const Search = ({searchParams = {}}) => {
    let { 
        key = "default", 
        value = "", 
        placeholder = "Type smth to search...", 
        showSearch = false
    } = searchParams;
    const dispatch = useDispatch();

    const onChange = (e) => {
        setSearchValue(e.target.value);
        dispatch(setSearchValue({key: key, value: e.target.value}));
    }

    return (
    <div className="join">
        <button className={"btn btn-square btn-outline btn-sm join-item z-10"}>
            <FiSearch />
        </button>
        <input
            className={"input input-bordered input-sm join-item w-full"}
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
    );
};

export default Search;
