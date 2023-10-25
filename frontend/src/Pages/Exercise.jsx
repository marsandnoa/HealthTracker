import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { userData, setUserData  } = useContext(UserContext);
  const [calendar, setCalendar] = useState([]);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [selectedCalendarEntry, setSelectedCalendarEntry] = useState(null);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [isModifyEntry, setIsModifyEntry] = useState(false);
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');
  const [name, setName] = useState('');
  const [nonInteger, setNonInteger] = useState(false);
  const handleNewEntry = () => {
    setEntry("");
    setName("");
    setDate("");
    setIsNewEntry(true);
  };

  const handleModifyEntry = () => {
    if(selectedCalendarEntry === null) return;
    setEntry(selectedCalendarEntry.entry);
    setName(selectedCalendarEntry.name);
    setDate(selectedCalendarEntry.date);
    setIsModifyEntry(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/calendarentry/delete/"+selectedCalendarEntry.id+"/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
  
      if (response.ok)  {
        setCalendarEntries(prevcalendarEntries => prevcalendarEntries.filter(entry => entry.id !== selectedCalendarEntry.id));
      }else {
        console.error("delete failed");
      }
    } catch (error) {
      console.error("There was a problem with the delete request", error);
    }
  };

  const handleNewModifyEntrySubmit = async () => {
    let attemptData;
    if(nonInteger) return;
    if (isModifyEntry) {
      
      attemptData = {
        id: selectedCalendarEntry.id,
        date: date,
        entry: entry,
        name: name,
        calendar: calendar.id,
      };
    } else {
      attemptData = {
        entry: entry,
        date: date,
        name: name,
      };
    }
  
    try {
      let response;
  
      if (isNewEntry) {
        response = await fetch("http://127.0.0.1:8000/calendarentry/create/"+calendar.id+"/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attemptData),
        });
      } else {
        response = await fetch("http://127.0.0.1:8000/calendarentry/update/" + selectedCalendarEntry.id+"/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attemptData),
        });
      }
  
      if (response.ok && isNewEntry) {
        console.log("CalendarEntry created successfully.");
        const createdCalendarEntry = await response.json();
        setCalendarEntries((prevcalendarEntries) => [...prevcalendarEntries, createdCalendarEntry]);
      } else if (isModifyEntry) {
        console.log("CalendarEntry updated successfully.");
        const updatedCalendarEntry = await response.json();
        setCalendarEntries((prevcalendarEntries) =>
          prevcalendarEntries.map((entry) => (entry.id === updatedCalendarEntry.id ? updatedCalendarEntry : entry))
        );
      } else {
        console.error("CalendarEntry creation/update failed");
      }
    } catch (error) {
      console.error("There was a problem with the request", error);
    }

    setIsNewEntry(false);
    setIsModifyEntry(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handledate = (event) => {
    setDate(event.target.value);
  };

  const handleentryChange = (event) => {
    const value = event.target.value;
    const isInteger = /^\d+$/.test(value); 
  
    setEntry(value); 
    if (!isInteger) {
      setNonInteger(true);
    } else {
      setNonInteger(false);
    }
  };


  const handleCalendarEntryClick = (entry) => {
    setSelectedCalendarEntry(prevSelected => prevSelected === entry ? null : entry);
  };

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
          setCalendar(firstData);

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
              setCalendarEntries(secondData);
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
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedCalendarEntry(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {calendar ? (
        <div>
          <h1 className="text-3xl font-bold text-blue-500 py-4 border-b-2 border-blue-500">
            Exercise for {userData.fullname}
          </h1>
        </div>
      ) : (
        <p>Loading budget...</p>
      )}

      <div className="flex flex-row justify-between mb-2 p-2 font-bold">
      <div className="flex-1 border p-2">
        <p className="text-center">Exercise</p>
      </div>
      <div className="flex-1 border p-2">
        <p className="text-center">Date</p>
      </div>
      <div className="flex-1 border p-2">
        <p className="text-center">Calories</p>
      </div>
    </div>

      <div ref={ref} className="flex-1 bg-gradient-to-br from-white border-blue-200 p-6 rounded-lg shadow-2xl transform transition-transform duration-300">
        {calendarEntries.map(entry => (
          <div
            key={entry.id}
            className={`flex flex-row justify-between mb-2 p-2 cursor-pointer ${selectedCalendarEntry === entry ? 'bg-blue-100' : 'bg-white'} hover:bg-blue-100`}
            onClick={() => handleCalendarEntryClick(entry)}
          >
            <div className="flex-1 border p-2">
              <p className="text-center">{entry.name}</p>
            </div>
            <div className="flex-1 border p-2">
              <p className="text-center">{entry.date}</p>
            </div>
            <div className="flex-1 border p-2">
              <p className="text-center">{entry.entry}</p>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gradient-to-br from-white to-blue-100 border border-blue-200 p-6 rounded-lg shadow-2xl transform transition-transform duration-300">
        {isNewEntry || isModifyEntry ?(
          <div className='border border-black p-6'>
            <h2 className="text-xl font-semibold mb-4">
              {isNewEntry ? 'New Entry' : (isModifyEntry ? 'Modify Entry' : '')}
            </h2>
            <input type="text" placeholder="Exercise" className="mb-2 w-full p-2 rounded" value={name} onChange={handleNameChange} />
            <input type="text" placeholder="yyyy-mm-dd" className="mb-2 w-full p-2 rounded" value={date} onChange={handledate} />
            <input type="text" placeholder="Reps" className="mb-2 w-full p-2 rounded" value={entry} onChange={handleentryChange} />
            {nonInteger ? (
              <p className="text-red-500 text-xs italic">
                Please enter a valid integer
              </p>
            ) : null}
            <button className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 w-24 h-10" onClick={handleNewModifyEntrySubmit}>Submit</button>
          </div>
        ) : null}


        <div className='border border-black p-6'>
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <button className="bg-blue-500 text-white p-2 rounded mr-2 hover-bg-blue-600 w-24 h-10" onClick={handleNewEntry}>New</button>
          <button className="bg-yellow-500 text-white p-2 rounded mr-2 hover-bg-yellow-600 w-24 h-10" onClick={handleModifyEntry}>Edit</button>
          <button className="bg-red-500 text-white p-2 rounded mr-2 hover-bg-red-600 w-24 h-10" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default App;