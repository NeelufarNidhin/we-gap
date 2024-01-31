import React, { useState } from 'react'
import axios from 'axios';

const UserBlock = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleBlockToggle = async () => {
      setIsLoading(true);
      try {
       // await axios.post(`block/${userId}`);
        // Refresh user data after successful block/unblock
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <button onClick={handleBlockToggle} disabled={isLoading}>
        {/* {isLoading ? 'Loading...' : (user.isBlocked ? 'Unblock' : 'Block')} */}
      </button>
    );
}

export default UserBlock
