import React, { useState } from "react";
import { questionPropsType } from "../Types/quiz_types";

const QuestionCard: React.FC<questionPropsType> = ({
  question,
  options,
  callback,
}) => {
  let [selectedAns, setSelectedAns] = useState("");

  const handleSelection = (ev: any) => {
    setSelectedAns(ev.target.value);
  };

  return (
    <div data-aos="slide-up" className="question_Container">
      <div className="question">
        <span className="ques">Qusetion :</span> {question}
      </div>

      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
        className="ques_Form"
      >
        {options.map((opt: string, ind: number) => {
          return (
            <label className="radiobtn" key={ind}>
              <br />
              <input
                type="radio"
                name="opt"
                value={opt}
                required
                checked={selectedAns === opt}
                onChange={handleSelection}
              />

              {opt}
            </label>
          );
        })}
        <div>
          <input className="submit_btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default QuestionCard;
