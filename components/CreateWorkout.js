import { useEffect, useState } from "react";

const CreateWorkout = () => {
  const [startTime, setStartTime] = useState(0);
  const [intervals, setIntervals] = useState([]);
  const [startBound, setStartBound] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);

  const onStartButton = () => {
    setClockRunning(true);
    const now = new Date();

    setStartTime(now.getTime());
    setStartBound(now.getTime());
  };

  const onIntervalButton = () => {
    const now = new Date();
    const interval = {
      startTime: startBound,
      endTime: now.getTime(),
      duration: now - startBound,
    };

    setStartBound(now.getTime());
    let oldIntervals = intervals;
    oldIntervals.push(interval);
    setIntervals(oldIntervals);
    console.log(intervals);
  };

  const onStopButton = () => {
    const now = new Date();
    setClockRunning(false);

    const interval = {
      startTime: startBound,
      endTime: now.getTime(),
      duration: now - startBound,
    };

    let oldIntervals = intervals;
    oldIntervals.push(interval);
    setIntervals(oldIntervals);
  };

  useEffect(() => {
    if (clockRunning) {
      const interval = setInterval(() => {
        const now = new Date();
        setDuration(now - startBound);
      }, 1);
    }

    //Clear interval when component unmounts
    return () => clearInterval(interval);
  });

  return (
    <div>
      Create Workout
      {!clockRunning ? (
        <button onClick={onStartButton}>Start</button>
      ) : (
        <>
          <button onClick={onIntervalButton}>Interval</button>
          <button onClick={onStopButton}>Stop</button>
        </>
      )}
      <div id="time">{duration}</div>
      <div>Start Bound: {startBound}</div>
      {intervals &&
        intervals.map((interval) => {
          return <div>{JSON.stringify(interval)} </div>;
        })}
      {intervals.length > 0 && <div>Intervals</div>}
    </div>
  );
};

export default CreateWorkout;
