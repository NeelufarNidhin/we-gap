import React, { useState } from 'react'
import { useForgotpasswordMutation } from '../API/auth';

function ForgotPassword() {
    const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, isSuccess, isError }] = useForgotpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({email});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {isSuccess && <p className="mt-4 text-green-600">Check your email for the reset link.</p>}
      {isError && <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>}
    </div>
  </div>
  );
};

export default ForgotPassword
