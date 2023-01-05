import React from 'react';
import {decode} from 'html-entities';

export default function Question(props) {
    let choices = props.data.multichoice;
  return (
    <section>
            <h2 className="quiz_question">{decode(props.data.question)}</h2>
            <ul className="quiz_options">
                {choices.map((item, index) => (
                    <li key={index}>{decode(item)}</li>
                ))}
            </ul>
            
    </section>
  )
}
