import React, { useState } from "react";
import { getToday, useForceUpdate } from "../helper-functions";
import Question from "./Question";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

const Upitnik = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = getToday();
  const [date, setDate] = useState(today);

  const reRender = useForceUpdate();

  const handleResetAll = (e) => {
    setTitle("");
    setQuestions([]);
    setDate(today);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddQuestion = () => {
    const localQuestions = questions;
    const id =
      localQuestions.length === 0
        ? 0
        : localQuestions[localQuestions.length - 1].id + 1;
    const title = "";
    const answers = [];
    localQuestions.push({ id, title, answers });
    setQuestions(localQuestions);
    reRender();
  };

  // const copyQuestion = (question) => {
  //   const { id, title } = question;
  //   const answers = [...question.answers];
  //   setQuestions([...questions, { id: id + 1, title, answers }]); // Add + 1 to id, so the keys dont mix up when mapping through questions
  // };

  // question form control
  const handleQuestionTitleChange = (id, value) => {
    const localQuestions = questions;
    const index = localQuestions.findIndex((question) => question.id === id);
    localQuestions[index].title = value;
    setQuestions(localQuestions);
    reRender();
  };

  const handleRemoveQuestion = (id) => {
    const newQuestions = questions.filter((question) => question.id !== id);
    setQuestions([...newQuestions]);
    reRender();
  };

  const handleQuestionAddAnswer = (q_id) => {
    const localQuestions = questions;
    const index = localQuestions.findIndex((question) => question.id === q_id);
    const question = { ...localQuestions[index] };
    const { answers } = question;
    if (answers.length === 5) {
      return;
    } else {
      const ans_id =
        answers.length === 0 ? 0 : answers[answers.length - 1].id + 1;
      const answer = { id: ans_id, value: "" };
      answers.push(answer);
      question.answers = [...answers];
      localQuestions[index] = { ...question };
      setQuestions(localQuestions);
      reRender();
    }
  };

  const handleAnswerChange = (q_id, ans_id, value) => {
    const localQuestions = questions;
    const index = localQuestions.findIndex((question) => question.id === q_id);
    const question = { ...localQuestions[index] };
    const { answers } = question;
    const answer_index = answers.findIndex((answer) => answer.id === ans_id);
    answers[answer_index].value = value;
    question.answers = [...answers];
    localQuestions[index] = { ...question };
    setQuestions(localQuestions);
    reRender();
  };

  const handleRemoveAnswer = (q_id, ans_id) => {
    const localQuestions = questions;
    const index = localQuestions.findIndex((question) => question.id === q_id);
    const question = { ...localQuestions[index] };
    const { answers } = question;
    const newAnswers = [];
    let counter = 0;
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (answer.id === ans_id) continue;
      answer.id = counter++;
      newAnswers.push(answer);
    }
    question.answers = [...newAnswers];
    localQuestions[index] = { ...question };
    setQuestions(localQuestions);
    reRender();
  };

  const handleSubmitQuiz = () => {
    if (title !== "" && date !== "") {
      if (
        questions.length !== 0 &&
        questions.every((question) => question.title !== "")
      ) {
        if (
          questions.every((question) =>
            question.answers.every((answer) => answer.value !== "")
          ) === true &&
          questions.every((question) => question.answers.length > 0) === true
        ) {
          fetch("http://projectest.xyz/api/surveys", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, deadline: date, questions }),
          }).then((response) => {
            if (response.ok === true) {
              setOpenSuccess(true);
              handleResetAll();
            } else {
              setError("Greska tokom slanja upitnika na server!");
              setOpenError(true);
            }
          });
        } else {
          setError("Svako pitanje mora da ima bar jedan odgovor!");
          setOpenError(true);
        }
      } else {
        setError("Svako pitanje mora da ima tekst!");
        setOpenError(true);
      }
    } else {
      setError("Naziv i rok upitnika nisu dodati!");
      setOpenError(true);
    }
  };

  return (
    <>
      <SuccessModal openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} />
      <ErrorModal
        error={error}
        setOpenError={setOpenError}
        openError={openError}
      />
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col bg-gray-100 shadow-md px-16 py-12">
          <h2 className="text-left text-blue-500 font-bold text-2xl pb-10">
            Kreiraj Upitnik
          </h2>
          <input
            className="border border-black outline-none focus:border-blue-400 px-4 py-2 rounded-md"
            placeholder="Naziv upitnika"
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
          <div className="my-2 flex flex-col">
            <label>Rok upitnika</label>
            <input
              type="date"
              className="
              border border-black
              rounded-md
              outline-none
              focus:border-blue-400
              px-4 py-2
            "
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Rok upitnika"
            />
          </div>
          <div className="mt-5">
            {questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                onTitleChange={handleQuestionTitleChange}
                onRemove={handleRemoveQuestion}
                onAddAnswer={handleQuestionAddAnswer}
                onAnswerChange={handleAnswerChange}
                onAnswerRemove={handleRemoveAnswer}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-4 pt-4">
            <button
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors px-4 py-2 rounded-sm"
              onClick={() => handleAddQuestion()}
            >
              Dodaj Pitanje
            </button>
            <button
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors px-4 py-2 rounded-sm"
              onClick={(e) => handleResetAll(e)}
            >
              Resetuj Upitnik
            </button>
            <button
              className="border border-blue-500 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 transition-colors px-4 py-2 rounded-sm"
              onClick={(e) => handleSubmitQuiz(e)}
            >
              Zavrsi Upitnik
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upitnik;
