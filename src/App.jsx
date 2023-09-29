import React from "react";
import Programs from "./components/Programs";


function App(){
    return(
    <div>
       <header className="header">
        <nav className="navbar">
            <img className="logo" src={require ("./components/logo3.png")} />
            <button type="button" className="git-button" onClick={()=>window.open("https://github.com/abhikr643")}>GitHub</button>
        </nav>
        </header>

        <main className="main">
        <div className="data">
        <h1 className="heading">
            Summarize Articles With <br></br><span className="colorAI">OpenAI</span>
        </h1>
        <h2 className="description">Simplify your reading with <em>SummarAIze</em>, an open-source article summarizer that transform lengthy articles into clear and concise summaries.</h2>
        <p className="url-para">Enter URl of any website to summarize it:</p>

        <Programs/>

        </div>
        </main>
        
       
       
    </div>
    )
    
}

export default App;