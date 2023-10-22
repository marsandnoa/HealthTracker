import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const Main = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='text-4xl font-bold text-blue-900 mb-4'>
        Welcome, {userData.fullname}!
      </div>
      <div className='max-w-md text-center'>
        <p className="text-xl">
        This application is to help track exercise, calories, and health issues.
        Visit the exercise tab to log reps and exercise type, visit the calory page to log calories, and visit the notes page to log health notes.
        </p>
      </div>
    </div>
  );
};

export default Main;
