import React, { useState } from 'react'
import { useResetpasswordMutation } from '../API/auth';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [resetPassword, { isLoading, isSuccess, isError }] = useResetpasswordMutation();
  
    const userId = searchParams.get('userid');
    const code = searchParams.get('code');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await resetPassword({ userId, code, newPassword });
    };
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          {isSuccess && <p className="text-green-500 mt-4 text-center">Password has been reset successfully.</p>}
          {isError && <p className="text-red-500 mt-4 text-center">Something went wrong. Please try again.</p>}
        </div>
      </div>
    );
  };
  

export default ResetPassword
