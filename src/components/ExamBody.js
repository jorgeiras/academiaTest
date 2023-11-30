import axios from "axios"
import React from "react"
import './ExamBody.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from "js-cookie";
import { useEffect } from 'react';


const  url = "https://jorgeiras.pythonanywhere.com/generate_test"

function useWarnBeforeLeaving(message, shouldWarn) {
    useEffect(() => {
      const handleBeforeUnload = (e) => {
        if (shouldWarn) {
          e.preventDefault();
          e.returnValue = message;
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [shouldWarn, message]);
  }
  

function ExamBody() {

    const [getExam, setGetExam] = React.useState([]);
    const [endExam, setEndExam] = React.useState(false);
    const [userAnswers, setUserAnswers] = React.useState({});
    const [result, setResult] = React.useState(0);
    const answerKey = { 'A': 0, 'B': 1, 'C': 2 };

    React.useEffect(() =>{
        //const token = localStorage.getItem('authToken');
        const token = Cookies.get('token');
        if(!token){
            console.error('token no encontrado')
            return
        }
        
        axios.get(url, {
            headers:{
                'Authorization': `Token ${token}`
            }
        }).then((response)=>{
            setGetExam(response.data.questions);
            console.log(response)
        }).catch((error) => {
            console.log(error);
          });
    },[]);
   
    const calculateResult = () =>{
        let score = 0;
        
        getExam.forEach((question, index)  =>{
            const correctAnswerIndex = answerKey[question.solution];
            if(correctAnswerIndex == userAnswers[index]){
                score = score + 0.5;
            }
        })
        setResult(score);
    }

    const handleConfirmButton = () =>{
        calculateResult()
        setEndExam(true);
    }

    const handleOptionChange = (questionIndex, answerIndex) =>{
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answerIndex
        }));
    };

    
    useWarnBeforeLeaving("Are you sure you want to leave? All progress will be lost.", !endExam);


    if(endExam){
        return(
            <Container>
                <div>Tu puntuación es de: {result}</div>
                <div>{getExam.map((item, index) =>(
                    <div key={index} className="questiondiv">
                        <p className="questiontext">{index + 1}.- {item.question}</p>
                        {item.answers.map((answer, answerIndex) =>{
                            const isCorrect = answerIndex === answerKey[item.solution];
                            const isUserAnswer = userAnswers[index] === answerIndex;
                            let answerClass = '';
                            if(isUserAnswer){
                                answerClass = isCorrect ? 'correct-answer correct-answer-text' : 'incorrect-answer';
                            }
                            else{
                                answerClass = isCorrect ? 'correct-answer-text' : ''
                            }
                            

                            return (
                                <div key={answerIndex} className={`form-check ${answerClass}`}>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`radioQuestion${index}`}
                                    id={`flexRadioDefault${index}-${answerIndex}`}
                                    checked={isUserAnswer}
                                    readOnly
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexRadioDefault${index}-${answerIndex}`}
                                  >
                                    {answer}
                                  </label>
                                </div>
                              );
                        })}
                        
                    </div>
                    
                ) )}</div>
            </Container>
        );
    }

    return(
        <Container>
        <div>{getExam.map((item, index) =>(
            <div key={index} className="questiondiv">
                <p className="questiontext">{index + 1}.- {item.question}</p>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name={`radioQuestion${index}`} id="flexRadioDefault1" onChange={() => handleOptionChange(index, 0)}/>
                    <label class="form-check-label" for={`radioAnswer${index}`}>
                        {item.answers[0]}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name={`radioQuestion${index}`} id="flexRadioDefault2" onChange={() => handleOptionChange(index, 1)}/>
                    <label class="form-check-label" for={`radioAnswer${index}`}>
                        {item.answers[1]}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name={`radioQuestion${index}`} id="flexRadioDefault3" onChange={() => handleOptionChange(index, 2)}/>
                    <label class="form-check-label" for={`radioAnswer${index}`}>
                        {item.answers[2]}
                    </label>
                </div>
            </div>
            
        ) )}</div>
        <Button style={{margin:"100px"}} onClick={handleConfirmButton}>Confirmar respuestas</Button>
        </Container>
    );
}

export default ExamBody;