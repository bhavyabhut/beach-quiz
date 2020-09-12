import React, { ChangeEvent } from "react";

type FormProps = {
  limitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  limit: number;
  categoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  category: string | number;
  difficultlyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  difficulty: string;
};
const Form: React.FC<FormProps> = ({
  limitChange,
  categoryChange,
  difficultlyChange,
  limit,
  category,
  difficulty,
}) => {
  return (
    <form>
      <label>Number of Questions:</label>
      <input
        type="number"
        name="trivia_amount"
        className="form-control"
        min="1"
        max="50"
        value={limit}
        onChange={limitChange}
      />
      <br />
      <label>Select Category: </label>
      <select
        name="trivia_category"
        className="form-control "
        onChange={categoryChange}
        value={category}
      >
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
      <br />
      <label>Select Difficulty: </label>
      <select
        name="trivia_difficulty"
        className="form-control"
        onChange={difficultlyChange}
        value={difficulty}
      >
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br />
    </form>
  );
};

export default Form;
