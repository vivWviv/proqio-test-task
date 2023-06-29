import React, { useState } from "react";

import { CreateTeamModal } from "./components/Modal";
import { firstLetterCapitalize } from "./helpers/string";

import { FormData } from "./types/types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitData, setSubmitData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setIsModalOpen(false);
    setSubmitData(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {submitData ? (
        <div className="w-full flex flex-col items-center space-y-4 sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px]">
          <div className="text-2xl font-bold">{`The ${firstLetterCapitalize(
            submitData.name
          )}'s team`}</div>
          <div className="flex space-x-2">
            {submitData.pokemon.map((el) => (
              <div key={el.label} className="flex flex-col items-center">
                <img
                  src={el.value}
                  alt={`${firstLetterCapitalize(el.label)} Sprite`}
                  className="w-16 h-16 rounded-md"
                />
                <div className="text-sm">{firstLetterCapitalize(el.label)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4 sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px]">
          <div className="text-2xl font-bold mb-4">Create your team</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 mx-auto mt-3 rounded hover:bg-blue-600 transition-colors duration-300 w-16 flex items-center justify-center md:w-32 md:text-lg focus:outline-blue-700"
          >
            Create!
          </button>
        </div>
      )}
      {isModalOpen && (
        <CreateTeamModal
          handleSubmit={handleSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
