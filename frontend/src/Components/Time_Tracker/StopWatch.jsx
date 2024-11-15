import React, { useState } from 'react';
import ControlButton from './ControlButton';
import Timer from './Timer';
import './Timer.css';
import { useMutation, useQuery } from '@apollo/client';
import { createTask, getAllTasks } from '../../graphqlQuesries/TaskQueries';
function StopWatch({ name }) {
  // console.log("name:",name)
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [name1, setName1] = useState('');

  const [startAtHour, setstartAtHour] = useState('');
  const [startAt, setstartAt] = useState('');
  const [endAtHour, setendAtHour] = useState('');
  const [endat, setendAt] = useState('');
  const [totalTime, settotalTime] = useState('');

  const [createTasks, { data, loading, error }] = useMutation(createTask);



  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleAdd =  () => {


    console.log(endAtHour)
    console.log(endat)

    // return

    const payload = {
      name: 'Navbar',
      startAt: `${startAtHour}:${startAt}`,
      endAt: `${endAtHour}:${endat}`,
      totalTime: String(time / 1000),
    };
    createTasks({
      variables: { 
        name: payload.name,
        startAt: payload.startAt,
        endAt: payload.endAt,
        totalTime: payload.totalTime,
      }
    })
    .then(response => {
      console.log("Task created:", response.data);
    })
    .catch(err => {
      console.error("Error creating task:", err.message);
    });
  
    setTimeout(() => {
      setstartAt('');
      setendAt('');
      settotalTime('');
    }, 1000);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    const d = new Date();
    let minutes = d.getMinutes();
    let hour = d.getHours();
    setstartAtHour(hour);
    setstartAt(minutes);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = async () => {
    setIsActive(false);
    settotalTime(time / 1000);
    const d = new Date();
    let minute = d.getMinutes();
    let hour = d.getHours();
    setendAtHour(hour);
    setendAt(minute);
     handleAdd();
    window.location.reload();
    setTime(0);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <ControlButton
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

export default StopWatch;
