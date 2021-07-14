/*
    This is my attempt at pagination of the data from the API, incomplete as I ran out of time
*/

import React, { useState } from 'react'
import Publishers from './Publishers';


/**
 * 
 * The 5 props that this component recives and its uses:
 * 
 *  1. data: An array of data that should be shown in the paginated form
 *  2. RenderComponent: A component that should be used to show the paginated data. Would have used the NewsCard Component
    3. title: This is the title that should describe what the article is about
    4. dataLimit: The number of posts to be shown on each page. In our case,
    5. pageLimit: The number of pages to be shown in the pagination.
 */
function Pagination({data, RenderComponent, pageLimit, dataLimit}) {
    
    //The amount of pages to be shown in the pagination component
    const [pages] = useState(Math.round(data.length / dataLimit))
    
    //This is the current page that the user is currently visiting. The initial value will be 1
    const [currentPage, setCurrentPage] = useState(1);
    

    // nextPage will increment the current page by calling setCurrentPage.
    function nextPage() {
        setCurrentPage(page => page + 1);
    }

    // nextPage will decrement the current page by calling setCurrentPage.
    function prevPage() {
        setCurrentPage(page => page - 1);
    }

    // The changePage function will be called when the user clicks on any page number and it will change the current page to the page number that was clicked by the user.
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    // Retrieve the amount of articles equal to the data limit which is then displayed to a user
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    }

    return (
        <div>
            <div className="row">
                <div className="col-8">

                <div className="row">
                    {getPaginatedData().map((data, index)=>(
                        <RenderComponent key={index} data={data}/>
                    ))}
                </div>

                </div>

                <div className="col-4">
                    <Publishers/>
                </div>
                
            </div>

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button class="page-link" onClick={prevPage}>
                            <i class="fa fa-angles-left"/>
                        </button>
                    </li>

                    {getPaginationGroup().map((item, index) =>(
                        <li key={index} class="page-item"><button class="page-link" onClick={changePage}><span>{item}</span></button></li>
                    ))}

                    <li class="page-item">
                        <button class="page-link" onClick={nextPage}>
                            <i class="fa fa-angles-right"/>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
