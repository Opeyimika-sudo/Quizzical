import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function Quiz() {
    const [apiData, setApiData] = React.useState([])
    React.useEffect(()=> {
      let isActive = true;
      // fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        if(isActive == true){
          setApiData(() => {
            let apiData = [];
            let quiz = data.results;
            apiData = quiz.map((item) => {
              // takes a random number of options from the array of incorrect answers as its own array
              let randomOptions = item.incorrect_answers.slice(Math.floor(Math.random() * 4));
              // add the correct answer to that array
              randomOptions.push(item.correct_answer);
              // find the options from the array of incorrect answers which was not picked earlier
              let remainingOptions= item.incorrect_answers.filter((item) => randomOptions.includes(item) === false);
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
      

      const quizArray = apiData.map((item) =>
        <Question key={item.id} data={item}/> 
      )
  return (
    <div className="quiz">
      {quizArray}
    </div>
  )
}
