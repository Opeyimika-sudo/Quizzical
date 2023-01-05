import React from 'react';
import './App.css'

import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'

function App() {
  const [pageDisplay, setPageDisplay] = React.useState(false)

  function handleClick(){
    setPageDisplay(true);
  }

  return (
      <div className="App">
        {
        pageDisplay 
        ?
        <Quiz/>
        :
        <Home handleClick={handleClick}/>
        }
      </div>
  )
}

export default App
