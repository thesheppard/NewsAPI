import React, { useState } from 'react'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import SearchRange from './SearchRange'

function NavBar({setArticles}) {

    const [query, setQuery] = useState("");
    
    // This converts the below from and to Date variables to the required format YYYY-MM-DD through string manipulation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    const [from, setFrom] = useState(new Date().toISOString().slice(0, 10));
    const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
    
    /**
     *  This below function handles the search, it takes 3 variables when fetching
     *  from the News Api:
     * 
     *      1. The queried keyword
     *      2. The From Date in the format, YYYY-MM-DD
     *      3. The To Date in the format, YYYY-MM-DD
     * 
     *  The preventDefault() method cancels the event if it is cancelable, 
     *  meaning that the default action that belongs to the event will not occur.
     *  https://www.w3schools.com/jsref/event_preventdefault.asp
     * 
     *  The API key is used as a header to improve security, if the API key was rather used 
     *  in the apiKey querystring paramter, it could be visible in log or found via request sniffing.
     *  i.e https://newsapi.org/docs/authentication
     * 
     *  The response is then converted to JSON.
     * 
     *  This JSON is then set to the articles array in the Parent Component and this is why setArticles is passed as a prop
     * 
     *  Any errors will be logged to the console
     *  https://newsapi.org/docs/errors
     * 
     * */
    function handleSearch(e) {
        e.preventDefault()   
        
        fetch(`https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}`, {
            "method": "GET",
                "headers": {
                "X-Api-Key": "YOURAPIKEYHERE"
            }
        })
        .then(response => response.json())
        .then(response => {
            setArticles(response.articles);
        })
        .catch(err => { 
          console.log(err); 
        });
    }


    return (  
        <div className="row">
            <SearchInput 
                query={query}
                setQuery={setQuery}
            />
             
            <SearchRange 
               from={from} 
               to={to}
               setFrom={setFrom}
               setTo={setTo}
            />
            
            <SearchButton 
                handleSearch={handleSearch}
            />
        </div>
    )
}

export default NavBar

