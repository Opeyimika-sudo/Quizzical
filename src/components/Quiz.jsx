import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function Quiz() {
    const [apiData, setApiData] = React.useState([])
    // state for the questions --- options
    const [,] = React.useState({
      first: {
        
      },
      second: "",
      third: "",
      fourth: "",
      fifth: ""
    })

    React.useEffect(()=> {
      let isActive = true;
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        if(isActive == true){
          setApiData(() => {
            let apiData = [];
            let quiz = data.results;
            console.log(quiz);
            apiData = quiz.map((item) => {
              let incorrectAnswers = item.incorrect_answers.map((item)=> {
                return {
                  string: item,
                  isChecked: false
                }
            })
              // takes a random number of options from the array of incorrect answers as its own array
              // let randomOptions = item.incorrect_answers.slice(Math.floor(Math.random() * 4));
              let randomOptions = incorrectAnswers.slice(Math.floor(Math.random() * 4));
              // add the correct answer to that array
              randomOptions.push({
                string: item.correct_answer,
                isChecked: false
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
      }, [])
      // save correct answers
      // const [quizAnswers, setQuizAnswers] = React.useState([]);
      // console.log(quizAnswers);
      // select an option, store that option for as many times that it may change, let the option that is selected 
      // on clicking an option, send its id back and set it to true
      // i'm thinking to use an object to store the answers for each of the 5 questions and then store the answers for each of the 5 questions and then compare the answers upon clicking "check answers"
      function handleClick(questionId, optionId){
        console.log(questionId);
        console.log(optionId);
      }

      const quizArray = apiData.map((item) =>
        <Question key={item.id} handleClick={handleClick} id={item.id} data={item}/> 
      )
  return (
    <div className="quiz">
      {quizArray}
      <button className="submit">Check Answers</button>
    </div>
  )
}
