import React from 'react';
import {decode} from 'html-entities';

export default function Question(props) {
    let choices = props.data.multichoice;
    console.log(choices);
  return (
    <section>
            <h2 className="quiz_question">{decode(props.data.question)}</h2>
            <ul className="quiz_options">
                {choices.map((item, index) => (
                    <li className="quiz_option"
                     onClick={()=>props.handleClick(props.id, index)}
                    key={index}>{decode(item.string)}</li>
                ))}
            </ul>
            <hr />
    </section>
  )
}
