import React, { useState, useEffect } from "react";
import "./App.css";
import { getQuizDetail } from "./services/Quizz_service";
import { QuestionType } from "./Types/quiz_types";
import QuestionCard from "./components/QuestionCard";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [curentStep, setCurentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showresult, setshowResult] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetail(10, "easy");
      setQuiz(questions);
    }
    fetchData();
    AOS.init();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[curentStep];

    // console.log(
    //   "CorrectAns: " +
    //     currentQuestion.correct_answer +
    //     "   ..userSelection : " +
    //     userAns
    // );

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (curentStep !== quiz.length - 1) setCurentStep(++curentStep);
    else {
      setshowResult(true);
    }
  };

  if (!quiz.length) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (showresult) {
    return (
      <div data-aos="slide-down" className="result_container">
        <h3>Result</h3>
        <p>
          Your Final score is <b>{score}</b>
          {"  "} out of <b>{quiz.length}</b>
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 data-aos="slide-right" className="App_Heading">
        Quizz App
      </h1>
      <QuestionCard
        options={quiz[curentStep].option}
        question={quiz[curentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
