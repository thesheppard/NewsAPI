import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Publishers from './components/Publishers';
import {v4 as uuid} from 'uuid'

function App() {

  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  /**
     *  The Effect Hook lets you perform side effects in function components:
     *  https://reactjs.org/docs/hooks-effect.html
     * 
     *  On initial load, this hook retrieves the top headlines in South Africa
     *  from the News API.
     * 
     *  The API key is used as a header to improve security, if the API key was rather used 
     *  in the apiKey querystring paramter, it could be visible in logs or found via request sniffing.
     *  i.e https://newsapi.org/docs/authentication
     * 
     *  The response is then converted to JSON.
     * 
     *  This JSON is then set to the articles array and values are passed to the NewsCard.
     * 
     *  Any errors will be logged to the console
     *  https://newsapi.org/docs/errors
     * 
     **/
  
    useEffect(() => {

      return () => {
        fetch("https://newsapi.org/v2/top-headlines?country=za", {
          "method": "GET",
              "headers": {
              "X-Api-Key": "YOURAPIKEYHERE"
          }
        })
        .then(response => response.json())
        .then(response => {
            setIsLoaded(true);
            setArticles(response.articles);
        })
        .catch(err => { 
          setIsLoaded(true);
          console.log(err); 
        });
      }
       
    }, [articles])

  return (
    <div className="container">
      {isLoaded ? (
        <>
          <NavBar
            setArticles={setArticles}
          />

          <div className="row">
            <div className="col-sm-8">
              <div className="row">

                {/* THe filter function reads the 10 top Headlines and displays them
                It also serves as a crude form of rate limiting so that not too many requests are made to the API at the same time */}
                
                {articles.filter((item, i) => i < 10).map((data) => 
                  // uuid() is used to generate random keys
                  // https://en.wikipedia.org/wiki/Universally_unique_identifier
                  <div key={uuid()} className="card" style={{ width: "20rem", margin: "2rem" }}>
                    
                    <img className="card-img-top" style={{ height: "15rem", width: "20rem"}} src={data.urlToImage} alt="cap"/>
                    
                    <div className="card-body">
                        {/*The publishers name*/}
                        <p className="card-text text-center">{data.source.name}</p>
                        {/*The title of the article*/}
                        <h5 className="card-title text-center">{data.title}</h5>
                        {/*The date the article was published*/}
                        <p className="card-text text-center">{data.publishedAt}</p>
                        <div className="d-flex justify-content-center">
                            <a href={data.url} className="btn btn-outline-dark">Read More</a>
                        </div>
                    </div>
                  
                  </div>
                )}

                
            </div>
            {/*This component displays the filtered publishers and their articles*/}
            <Publishers/>
          </div>
      </div>    

        </>
      ) : (
        // This indicates that that the articles have not correctly loaded, check console for more info 
        <h1>No articles to show you</h1>
        
      )

      }
    </div>
  );
}

export default App;
