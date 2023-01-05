import React from 'react'

export default function Home(props) {
  return (
    <div className="home">
      <h2 id="home_title">Quizzical</h2>
      <p id="home_paragraph">Play the quiz and see how well you perform!</p>
      <button id="home_button" onClick={() => props.handleClick()}>Start quiz</button>
    </div>
  )
}
