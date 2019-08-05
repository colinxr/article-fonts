import React, { useState, useEffect } from 'react'
import Form from './Form'
import './App.scss';

function App() {
  const extensions = [
    {"name": 'ttf', "checked": true},
    {"name": 'otf', "checked": false},
    {"name": 'woff', "checked": false},
    {"name": 'woff2', "checked": false},
    {"name": 'eot', "checked": false},
  ]
  
  const [searchVal, setSearchVal] = useState('')
  const [exts, setExts] = useState(extensions)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Font! Fonts! Fonts!</h1>
        <Form 
          searchVal={searchVal}
          exts={exts}
          setSearchVal={setSearchVal} 
          setExts={setExts}
          setIsLoading={setIsLoading}
        />
      </header>
    </div>
  );
}


export default App;
