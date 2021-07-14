import React, { useEffect, useState } from 'react'

function Publishers() {
    

    const [publishers, setPublishers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    /**
     *  The Effect Hook lets you perform side effects in function components:
     *  https://reactjs.org/docs/hooks-effect.html
     * 
     * 
     *  On initial load, this hook retrieves the top publishers of the top headlines
     *  from the News API.
     * 
     *  The sortBy queryString paramter is set to popularity which ranks the publishers
     *  from the ones with the most articles to the publishers with the least articles
     * 
     *  The API key is used as a header to improve security, if the API key was rather used 
     *  in the apiKey querystring paramter, it could be visible in logs or found via request sniffing.
     *  i.e https://newsapi.org/docs/authentication
     * 
     *  The response is then converted to JSON.
     * 
     *  This JSON is then set to the articles array in the Parent Component and this is why setArticles is passed as a prop
     * 
     *  Any errors will be logged to the console
     *  https://newsapi.org/docs/errors
     * 
     **/

    useEffect(() => {

        return () => {
          fetch("https://newsapi.org/v2/top-headlines/sources?sortBy=popularity", {
            "method": "GET",
                "headers": {
                "X-Api-Key": "YOURAPIKEYHERE"
            }
          })
          .then(response => response.json())
          .then(response => {
              setIsLoaded(true);
              setPublishers(response.sources)
          })
          .catch(err => { 
            setIsLoaded(true);
            console.log(err); 
          });
        }

        
    }, [publishers])
    
    
    return (
      <div className="col-sm-4">
        <h5 className="card-title text-center">Publishers</h5>
          {isLoaded ? (
            <>
              {
                <div className="card" style={{ width: "9rem;"}}>
                    <h5 className="card-title text-center">Publishers</h5>
                      {/*This filters the publishers data and grabs the first 10 of them to display*/}
                      {publishers.filter((item, i) => i < 10).map((data) => (
                        // The filtered data is displayed as links that can be used to access publishers homepage
                        <a key={data.id} href={data.url} className="card-title">{data.name}</a>
                      ))}
                </div>
              }
            </>
            ) : (
              <h1>No publishers to show you</h1>
          )}
      </div>
    )
}

export default Publishers
