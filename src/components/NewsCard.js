/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/style-prop-object */
import React from 'react'

function NewsCard({data}) {

    const {publisher, title, url, urlToImage, publishedAt} = data
    return (
        <div className="col">
            <div class="card" style={{ width: "9rem;"}}>
                <img class="card-img-top" src={urlToImage} alt="cap"/>
                <div class="card-body">
                    <p class="card-text text-center">{publisher}</p>
                    <h5 className="card-title text-center">{title}</h5>
                    <p class="card-text text-center">{publishedAt}</p>
                    <div class="d-flex justify-content-center">
                        <a href={url} class="btn btn-outline-dark">Read More</a>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default NewsCard
