import React from "react";
import { AnswerObject } from "../../App";
import { Wrapper, ButtonWrapper } from "./question.style";

type Props = {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};
const Question: React.FC<Props> = ({
  question,
  answer,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Questions: {questionNum}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answer.map((ans) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === ans}
            userClicked={userAnswer?.answer === ans}
            key={ans}
          >
            <button
              className="button"
              disabled={!!userAnswer}
              value={ans}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default Question;
