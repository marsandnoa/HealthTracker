import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { UserContext } from '../UserContext';
import "chart.js/auto";

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
              console.log(secondData[0].entry);
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

  ExerciseCalendarEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
  const exerciseEntryValues = ExerciseCalendarEntries.map((entry) => entry.entry);
  const exerciseEntryDates = ExerciseCalendarEntries.map((entry) => entry.date);

  const lineChartData1 = {
    labels: exerciseEntryDates,
    datasets: [
      {
        label: 'Exercise Data',
        data: exerciseEntryValues, // Replace with your actual data
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
      },
    ],
  };

  const options1 = {
    scales: {
      x: {
        type: 'category', 
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  CaloriesCalendarEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
  const calorieEntryValues = CaloriesCalendarEntries.map((entry) => entry.entry);
  const calorieEntryDates = CaloriesCalendarEntries.map((entry) => entry.date);

  const lineChartData2 = {
    labels: calorieEntryDates,
    datasets: [
      {
        label: 'Calory Data',
        data: calorieEntryValues, // Replace with your actual data
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
      },
    ],
  };

  const options2 = {
    scales: {
      x: {
        type: 'category', 
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='text-4xl font-bold text-blue-900 mb-4'>
        Exercise Plot
      </div>
      <Line data={lineChartData1} options={options1} />

      <div className='text-4xl font-bold text-blue-900 mb-4'>
        Calory Plot
      </div>
      <Line data={lineChartData2} options={options2} />

    </div>
  );
};

export default Main;
