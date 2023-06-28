import React, { useState } from 'react';

import FormContainer from './components/FormContainer';
import { FormData } from './types/types';
import { firstLetterCapitalize } from './helpers/string';

function App() {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const [submitData, setSubmitData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setOpenCreateTeamModal(false);
    setSubmitData(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {submitData ? (
        <div className="w-full flex flex-col items-center space-y-4 sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px]">
          <div className="text-2xl font-bold">{`The ${firstLetterCapitalize(
            submitData.name
          )} ${firstLetterCapitalize(submitData.surname)} team`}</div>
          <div className="flex space-x-2">
            {submitData.pokemon.map(el => (
              <div key={el.name} className="flex flex-col items-center">
                <img
                  src={el.value.url}
                  alt={`${firstLetterCapitalize(el.name)} Sprite`}
                  className="w-16 h-16 rounded-md"
                />
                <div className="text-sm">{firstLetterCapitalize(el.name)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : openCreateTeamModal ? (
        <div className="w-full ">
          <FormContainer
            handleSubmit={handleSubmit}
            closeModal={() => setOpenCreateTeamModal(false)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4 sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px]">
          <div className="text-2xl font-bold mb-4">Create your team</div>
          <button
            onClick={() => setOpenCreateTeamModal(true)}
            className="bg-blue-500 text-white py-2 px-4 mx-auto mt-3 rounded hover:bg-blue-600 transition-colors duration-300 w-16 flex items-center justify-center md:w-32 md:text-lg focus:outline-blue-700"
          >
            Create!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
