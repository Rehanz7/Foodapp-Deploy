import { useEffect, useState } from 'react';
import './styles.css'


const Search = (props) => {
    const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } = props;

    const [inputValue, setInputValue] = useState("")
    const handleInputvalue = (event) => {
        const { value } = event.target;
        setInputValue(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getDataFromSearchComponent(inputValue)
    }

useEffect(()=> {
    if (apiCalledSuccess) {
        setInputValue("")
        setApiCalledSuccess(false)
    }
}, [apiCalledSuccess ,setApiCalledSuccess])



    return <form onSubmit={handleSubmit} className="Search">
        <input name="search" value={inputValue} onChange={handleInputvalue} placeholder="Search recipes" id="search"></input>
        <button type="submit">Search</button>

    </form>
}
export default Search;