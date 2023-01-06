import React from 'react';
import {decode} from 'html-entities';

export default function Question(props) {
    let choices = props.data.multichoice;
  return (
    <section>
            <h2 className="quiz_question">{decode(props.data.question)}</h2>
            <ul className="quiz_options">
                {choices.map((item, index) => (
                    <li className="quiz_option" style={{
                        backgroundColor: choices[index].isChecked ? '#d6dbf5' : '#f5f7fb',
                        border: choices[index].isChecked ? 'none' : '0.794239px solid #4D5B9E'
                    }}
                     onClick={()=>props.handleClick(props.id, index)}
                    key={index}>{decode(item.string)}</li>
                ))}
            </ul>
            <hr />
    </section>
  )
}
