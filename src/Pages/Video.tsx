import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Video() {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate()
    const handleFormSubmit = (e:any) => {
        e.preventDefault();
        navigate(`/room/${roomCode}`)
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-8">Join Video Chat</h1>
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <label htmlFor="roomCode" className="mb-2 text-lg font-semibold">Enter Room Code:</label>
        <input
          id="roomCode"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          type="text"
          required
          placeholder="Enter the room code"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
      >
        Join Room
      </button>
    </form>
  </div>
  )
}

export default Video
