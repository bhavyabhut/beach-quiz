import React from 'react';
import Question from "./Components/Questions";
const  App = () =>{
  const start = async ()=>{

  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{

  }

  const nextQuestion = ()=>{

  }
  return (
      <div className="App">
        <h1>REACT QUIZ</h1>
        <button onClick={start} className='start'>Start</button>
        <p className='score'>Score:</p>
          <p>Loading questions...</p>
          <Question/>
          <button className='next' onClick={nextQuestion}>Next Questiong</button>
      </div>
  );
}

export default App;
