import React from 'react'

function SearchInput({query, setQuery}) {
    return (
        <div className="col">
            <div className="input-group mb-3">
                
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-search"/>
                    </span>
                </div>

                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1"/>
            
            </div>
        </div>
    )
}

export default SearchInput
