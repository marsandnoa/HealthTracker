import { UserContext } from '../UserContext';
import React, { useContext, useState, useEffect } from 'react';

const Main = () => {
  const { userData } = useContext(UserContext);

  const [ExerciseCalendar, setExerciseCalendar] = useState([]);
  const [ExerciseCalendarEntries, setExerciseCalendarEntries] = useState([]);
  const [CaloriesCalendar, setCaloriesCalendar] = useState([]);
  const [CaloriesCalendarEntries, setCaloriesCalendarEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstResponse = await fetch(`http://127.0.0.1:8000/calendar/findbyuserexercise/${userData.id}/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('authToken')}`
          }
        });

        if (firstResponse.ok) {
          const firstData = await firstResponse.json();
          setExerciseCalendar(firstData);

          try {
            const secondResponse = await fetch(`http://127.0.0.1:8000/calendarentry/findbycalendar/${firstData.id}/`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
              }
            });

            if (secondResponse.ok) {
              const secondData = await secondResponse.json();
              setExerciseCalendarEntries(secondData);
              console.log(secondData);
            } else {
              console.error('Failed to fetch budget entries');
            }
          } catch (error) {
            console.error('Error fetching budget entries:', error);
          }
        } else {
          console.error('Failed to fetch calendar');
        }
      } catch (error) {
        console.error('Error fetching calendar:', error);
      }
    };
    fetchData();
  }, [userData.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstResponse = await fetch(`http://127.0.0.1:8000/calendar/findbyusercalories/${userData.id}/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('authToken')}`
          }
        });

        if (firstResponse.ok) {
          const firstData = await firstResponse.json();
          setCaloriesCalendar(firstData);

          try {
            const secondResponse = await fetch(`http://127.0.0.1:8000/calendarentry/findbycalendar/${firstData.id}/`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
              }
            });

            if (secondResponse.ok) {
              const secondData = await secondResponse.json();
              setCaloriesCalendarEntries(secondData);
              console.log(secondData);
            } else {
              console.error('Failed to fetch budget entries');
            }
          } catch (error) {
            console.error('Error fetching budget entries:', error);
          }
        } else {
          console.error('Failed to fetch calendar');
        }
      } catch (error) {
        console.error('Error fetching calendar:', error);
      }
    };
    fetchData();
  }, [userData.id]);

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
