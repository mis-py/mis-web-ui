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
    <div className="flex flex-auto">
        <button
            className={`${
            showSearch
                ? "rounded-l-lg text-primary"
                : "rounded-l-lg text-gray"
            } flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond`}
        >
            <FiSearch />
        </button>
        <div className="relative h-[32px] w-full duration-300">
            <input
                className={`${
                    showSearch ? "w-full px-3" : "w-0 px-0"
                } bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0`}
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
    );
};

export default Search;
