import React from "react";
import { MdClear } from "react-icons/md";

const Answer = ({ onChange, onDelete, id, value }) => {
  const handleAnswerChange = (e) => {
    onChange(id, e.target.value);
  };

  const handleAnswerRemove = (e) => {
    onDelete(id);
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <label className="font-medium text-md">{id + 1}. odgovor</label>
        <input
          className="border border-black outline-none focus:border-blue-400 px-2 py-1 rounded-md"
          type="text"
          value={value}
          onChange={handleAnswerChange}
        />
      </div>
      <button
        className="mt-6 ml-1 text-red-500 hover:text-black transition-colors text-xl"
        onClick={handleAnswerRemove}
      >
        <MdClear />
      </button>
    </div>
  );
};

export default Answer;
