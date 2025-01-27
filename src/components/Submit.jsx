import React from 'react';

function Submit() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Exam Successful!</h1>
        <p className="text-gray-700 text-lg">Thank you for your participation!</p>
      </div>
    </div>
  );
}

export default Submit;
