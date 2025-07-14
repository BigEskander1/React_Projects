import React, { useRef } from 'react'
import './Quiz.css'
import { useState } from 'react'
import { questions } from '../../assets/questions'

const Quiz = () => {
    let [index , setIndex] = useState(0);
    let [question , setQuestion] = useState(questions[index]);
    let [score , setScore] = useState(0);
    let [lock , setLock] = useState(false);
    let [result , setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optionArray = [option1 , option2 , option3 , option4];
    const handleNext = () => {
        if(lock){
            if(index === questions.length-1){
                setResult(true);
                return 0 ; // to stop here
            }
            setIndex(++index)
            setQuestion(questions[index])
            setLock(false);
            optionArray.map((option) => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null ;
        })}
        
    } 

  
    const checkAnswer = (e ,ans) => {
        if(!lock){
            if(question.ans === ans){
                e.target.classList.add("correct") // e.target is the element which is clicked
                setLock(true);
                
                setScore(score+1);
            }else{
                e.target.classList.add("wrong")
                setLock(true);    
                setTimeout(() => {
                optionArray[question.ans-1].current.classList.add("correct");
                } , 60);
            }
        }
    }

    const handleReset = () =>{
        setIndex(0);
        setQuestion(questions[index]);
        setLock(false);
        setScore(0);
        setResult(false);
    }
  return (
    <div className='container'>
        <h1>{result ? "Result : " : "Quiz App"}</h1>
        <hr />

    {
        result ? (
            <>
                <h2> You scored {score} out of {questions.length}</h2>
        
                <button onClick={handleReset}>Play Again</button>
             </>

        ) : (
                <>
                    <h2>{index+1}: {question.question}</h2>
                        <ul>
                            <li ref={option1} onClick={(e)=>checkAnswer(e,1)}>{question.option1}</li>
                            <li ref={option2} onClick={(e)=>checkAnswer(e,2)}>{question.option2}</li>
                            <li ref={option3} onClick={(e)=>checkAnswer(e,3)}>{question.option3}</li>
                            <li ref={option4} onClick={(e)=>checkAnswer(e,4)}>{question.option4}</li>
                        </ul>
                     <button onClick={handleNext}>Next</button>
                     <div className="index"> {index+1} of {questions.length} questions </div>
                </>
        )
    }
        
       
    </div>
  )
}

export default Quiz