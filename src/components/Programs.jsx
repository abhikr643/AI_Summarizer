import linkicon from "./assets/link.svg"
import loader from "./assets/loader.svg"
import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from "../services/article";


function Programs(){

    const [article, setArticle] = useState({
        url: "",
        summary: "",
      });
      const [allArticles, setAllArticles] = useState([]);
    //   const [copied, setCopied] = useState("");
    
      // RTK lazy query
      const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    
      // Load data from localStorage on mount
      useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
          localStorage.getItem("articles")
        );
    
        if (articlesFromLocalStorage) {
          setAllArticles(articlesFromLocalStorage);
        }
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const existingArticle = allArticles.find(
          (item) => item.url === article.url
        );
    
        if (existingArticle) return setArticle(existingArticle);
    
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
          const newArticle = { ...article, summary: data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];
    
          // update state and local storage
          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
      };
        
      const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          handleSubmit(e);
        }
      };

    return(
        <div>
            <section>
            <form className="form" onSubmit={handleSubmit}>
            <img className="icons" src={linkicon} alt="link-icon"/>

            <input 
            type="url" 
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            name="enteredtext"
            required
            className="enter-url"
            >
            </input>

            <button  className="submit-button"  type="submit" onclick = "return doSomething()" >↵</button>

            </form>
            </section>


            <div className="summary">
            <div className='loader'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='error-text'>
            Well, that wasn't supposed to happen😔...
            <br />
            <span className='error-data'>
              {error?.data?.error}
            </span><br></br>

            <button type="submit" className="git-button" onClick={()=>window.location.reload()}>⟳ Reload</button>


          </p>
        ) : (
          article.summary && (
            <div className='article-summary'>
              <h2 className='article-head'>
                Article <span className='sum'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='para-summary'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
            </div>
        </div>
    )
}

export default Programs;