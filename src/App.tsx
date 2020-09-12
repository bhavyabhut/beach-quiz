import React, { ChangeEvent, useState } from "react";
import Question from "./Components/Questions";
import Loading from "./Components/Loading";
import { Difficulty, fetchQuestion, QuestionState } from "./api";
import { GlobalStyle, Wrapper } from "./App.style";
import Form from "./Components/Form";
import Timer from "./Components/Timer";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState<string | number>("any");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.HARD);
  const [reset, setReset] = useState(false);
  const start = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestion(limit, difficulty, category);
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
    setLoading(true);
    setReset(true);
    setTimeout(() => {
      const nextQuestion = number + 1;
      if (nextQuestion === limit) setGameOver(true);
      else setNumber(nextQuestion);
      setReset(false);
      setLoading(false);
    }, 300);
  };

  const changeLimit = (value: ChangeEvent<HTMLInputElement>) => {
    setLimit(+value.target.value);
  };

  const changeCategory = (value: ChangeEvent<HTMLSelectElement>) => {
    setCategory(+value.target.value);
  };

  const changeDifficulty = (value: ChangeEvent<HTMLSelectElement>) => {
    if (
      Difficulty.HARD === value.target.value ||
      Difficulty.EASY === value.target.value ||
      Difficulty.MEDIUM === value.target.value
    )
      setDifficulty(value.target.value);
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
        {gameOver || userAnswer.length === limit ? (
          <>
            <Form
              limitChange={changeLimit}
              categoryChange={changeCategory}
              difficultlyChange={changeDifficulty}
              category={category}
              limit={limit}
              difficulty={difficulty}
            />
            <button onClick={start} className="start">
              Start
            </button>
          </>
        ) : null}
        {loading && <Loading />}
        {!loading && !gameOver && number !== limit ? (
          <>
            <Question
              questionNum={number + 1}
              totalQuestions={limit}
              question={questions[number].question}
              answer={questions[number].answers}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              callback={checkAnswer}
            />
             {number !== limit - 1 ? (
              <Timer nextQuestion={nextQuestion} reset={reset} />
            ) : null}
          </>
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== limit - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
