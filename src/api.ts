import axios from "axios";
import { shuffle } from "./utils";

export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = QuestionType & { answers: string[] };
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  ANY = "any",
}
type Res = {
  data: any;
};
export const fetchQuestion = async (
  amount: number,
  diff: Difficulty,
  category: number | string
) => {
  let endpoint;
  if (typeof isNaN(+category) && diff === Difficulty.ANY)
    endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  else if (isNaN(+category))
    endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diff}&type=multiple`;
  else if (diff === Difficulty.ANY)
    endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
  else
    endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${diff}&type=multiple`;
  const response: Res = await axios.get(endpoint);
  return response.data.results.map((question: QuestionType) => ({
    ...question,
    answers: shuffle([...question.incorrect_answers, question.correct_answer]),
  }));
};
