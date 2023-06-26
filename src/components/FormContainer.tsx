import React from 'react';

import Form from "./Form";

const FormContainer = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg bg-blue-100">
                <Form/>
            </div>
        </div>
    );
};

export default FormContainer;
