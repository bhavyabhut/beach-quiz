import React, { useState } from "react";
import Question from "./Components/Questions";
import Loading from "./Components/Loading";
import { Difficulty, fetchQuestion, QuestionState } from "./api";
import { GlobalStyle, Wrapper } from "./App.style";
import Form from "./Components/Form";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const App = () => {
  const TOTAL = 5;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const start = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestion(TOTAL, Difficulty.HARD);
    setQuestion(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL) setGameOver(true);
    else setNumber(nextQuestion);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {!gameOver ? (
          <p className="score">
            Score:<span style={{ color: "#56ffa4" }}>{score}</span>
          </p>
        ) : null}
        {gameOver || userAnswer.length === TOTAL ? (
          <>
            <Form />
            <button onClick={start} className="start">
              Start
            </button>
          </>
        ) : null}
        {loading && <Loading />}
        {!loading && !gameOver && number !== TOTAL ? (
          <Question
            questionNum={number + 1}
            totalQuestions={TOTAL}
            question={questions[number].question}
            answer={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
