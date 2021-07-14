/*In this functional component a handleSearch prop is passed into this component
  from the Parent NavBar component and a search is made when the button is clicked
  and thus the form is submmitted.
*/
import React from 'react'

function SearchButton({handleSearch}) {

    return (
        <div className="col">
            <form onSubmit={handleSearch}>
                <button type="submit" className="btn btn-dark">Search</button>
            </form> 
        </div>
    )
}

export default SearchButton
