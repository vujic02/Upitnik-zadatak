import React from "react";
import Answer from "./Answer";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

const Question = ({
  onTitleChange,
  onAnswerChange,
  onAnswerRemove,
  onRemove,
  onAddAnswer,
  question,
}) => {
  const handleTitleChange = (e) => {
    onTitleChange(question.id, e.target.value);
  };

  const handleAnswerChange = (ans_id, value) => {
    onAnswerChange(question.id, ans_id, value);
  };

  const handleAnswerRemove = (ans_id) => {
    onAnswerRemove(question.id, ans_id);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          className="border border-black outline-none focus:border-blue-400 px-3 py-1 rounded-md w-full"
          placeholder="Pitanje"
          value={question?.title}
          onChange={(e) => handleTitleChange(e)}
        />
        <div className="w-full flex mt-1 ml-1">
          <button
            className="text-blue-500 hover:text-black transition-colors text-3xl"
            onClick={() => onAddAnswer(question.id)}
          >
            <AiOutlinePlus />
          </button>
          <button
            className="text-blue-500 hover:text-black transition-colors text-3xl"
            onClick={() => onRemove(question.id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="pt-3">
        {question.answers.map((answer, idx) => (
          <Answer
            key={answer.id}
            id={answer.id}
            value={answer.value}
            onChange={handleAnswerChange}
            onDelete={handleAnswerRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
