import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function Quiz() {
    const [apiData, setApiData] = React.useState([])
    // to know whether it's a handleSubmit function to call or tryAgain function
    const [buttonState, setButtonState] = React.useState(false)
    // state for the questions --- options

    // state that only changes if tryAgain function is triggered
    // usEffect relies on the state
    const [tryAgainState, setTryAgainState] = React.useState(false)
    

    React.useEffect(()=> {
      let isActive = true;
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        if(isActive == true){
          setApiData(() => {
            let apiData = [];
            let quiz = data.results;
            apiData = quiz.map((item) => {
              let incorrectAnswers = item.incorrect_answers.map((item)=> {
                return {
                  string: item,
                  isChecked: false,
                  isCorrect: false
                }
            })
              // takes a random number of options from the array of incorrect answers as its own array
              let randomOptions = incorrectAnswers.slice(Math.floor(Math.random() * 4));
              // add the correct answer to that array
              randomOptions.push({
                string: item.correct_answer,
                isChecked: false,
                isCorrect: true
              });
              // find the options from the array of incorrect answers which was not picked earlier
              let remainingOptions= incorrectAnswers.filter((item) => randomOptions.includes(item) === false);
              // add both the random options array with the array of the remaining options
              let options = randomOptions.concat(remainingOptions);
              return {
              id: nanoid(),
              question: item.question,
              answer: item.correct_answer,
              misses: item.incorrect_answers,
              multichoice: options
            }} 
            )
            console.log(apiData);
            return apiData;
          })
        }
      }
      )
      .catch((error) => console.log(error.message)); 
      
      return () => {
        isActive = false;
      }
      }, [tryAgainState])
      
      function handleClick(questionId, optionId){
        setApiData((prev) => {
          let newApiData = [];
          prev.map((item)=> {
            if(item.id === questionId){
              newApiData.push({
                ...item,
                multichoice: item.multichoice.map((piece, index) => {
                  if(index === optionId){
                    return {
                      ...piece,
                      isChecked: !item.multichoice[optionId].isChecked
                    }
                  }
                  else {
                    if(piece.isChecked === true){
                      return {
                        ...piece,
                        isChecked: !item.multichoice[index].isChecked
                      }
                    }
                    else {
                      return piece;
                    }
                    
                  }
                }
              )})
                }
              else{
                newApiData.push(item);
              }
            })
            return newApiData;
            }
            )
    }

    // state for questions correct
    let totalCorrectAnswers;
    const [correctQuestions, setCorrectQuestions] = React.useState(0);

    // state for submission of questions
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    
    function handleSubmit(){
        setIsSubmitted(true);
        let arrayOfAnswers = [];
        apiData.map((item) => {
          item.multichoice.map((unit) => {
            if(unit.isChecked == true && unit.isCorrect == true){
              arrayOfAnswers.push(1);
                  }
            else if(unit.isChecked === true && unit.isCorrect === false){
              arrayOfAnswers.push(0);
            }
                })
          })
        let initialValue = 0;
        totalCorrectAnswers = arrayOfAnswers.reduce((acc, current) => acc + current, initialValue);
        console.log(totalCorrectAnswers);
        setCorrectQuestions(totalCorrectAnswers);
        setButtonState(true);
    }
          
    function tryAgain(){
      console.log("Yo! This function was called")
      setIsSubmitted(false);
      setTryAgainState(prev => !prev);
      setButtonState(false);
    }
    
    const quizArray = apiData.map((item) =>
      <Question key={item.id} handleClick={handleClick} isSubmitted={isSubmitted} id={item.id} data={item}/> 
    )

  return (
    <div className="quiz">
      {quizArray}
      <div className="button_section">
        {isSubmitted && <p>You scored {correctQuestions}/5</p>}
        {apiData.length != 0 && <button className="submit" onClick={buttonState ? tryAgain : handleSubmit}>{isSubmitted ? 'Try Again' : 'Check Answers'}</button>}
      </div>
    </div>
  )
}
