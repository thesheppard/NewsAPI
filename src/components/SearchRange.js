import React from 'react'

function SearchRange({from, to, setFrom, setTo}) {
    return (
        <div className="col">
            <div className="input-group mb-3">
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control" placeholder="From" aria-label="From" aria-describedby="basic-addon1"/>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="form-control" placeholder="To" aria-label="To" aria-describedby="basic-addon1"/>
            </div>
        </div>
        
    )
}

export default SearchRange
