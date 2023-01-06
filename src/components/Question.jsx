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
                        backgroundColor: props.isSubmitted ? 
                            item.isCorrect
                            ? 
                            '#94d7a2' 
                            : 
                            item.isChecked ? '#F8BCBC' :'#f5f7fb' 
                         : item.isChecked ? '#d6dbf5' : '#f5f7fb',
                        border: props.isSubmitted ? 
                                item.isCorrect
                                ? 
                                'none'
                                : 
                                item.isChecked ? 'none' :'0.771045px solid #4D5B9E' 
                        : item.isChecked ? 'none' : '0.794239px solid #4D5B9E',
                        opacity: props.isSubmitted ?
                                item.isCorrect
                                ? 
                                '1'
                                : 
                                item.isChecked ? '1' :'0.5' 
                                : '1', 
                        
                    }}
                     onClick={()=>props.handleClick(props.id, index)}
                    key={index}>{decode(item.string)}</li>
                ))}
            </ul>
            <hr />
    </section>
  )
}
