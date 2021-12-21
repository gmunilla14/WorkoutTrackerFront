import { useEffect, useState } from "react";

const CreateWorkout = ({ plans }) => {
  const [startTime, setStartTime] = useState(0);
  const [intervals, setIntervals] = useState([]);
  const [startBound, setStartBound] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [workout, setWorkout] = useState({});
  const [chosenPlan, setChosenPlan] = useState("");
  const [planObj, setPlanObj] = useState({
    name: "",
    creatorID: "",
    sets: [],
  });

  const onStartButton = () => {
    setClockRunning(true);
    const now = new Date();

    setStartTime(now.getTime());
    setStartBound(now.getTime());
    console.log(workout);
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

  const onPlanChange = (e) => {
    setChosenPlan(e.target.value);
  };

  useEffect(() => {
    if (!(chosenPlan === "")) {
      const newPlanObj = plans.filter((plan) => {
        return plan._id === chosenPlan;
      })[0];

      setPlanObj(newPlanObj);
    }
  }, [chosenPlan]);

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
      <div>
        <form>
          <fieldset onChange={onPlanChange}>
            {plans &&
              plans.map((plan) => {
                return (
                  <>
                    <input
                      type="radio"
                      name="planChoice"
                      value={plan._id}
                      id={plan._id}
                    ></input>
                    <label for={plan._id}>{plan.name}</label>
                  </>
                );
              })}
          </fieldset>
        </form>
      </div>
      <>{!(chosenPlan === "") && planObj.sets.map((set) => {
          return <div>{set.type}</div>
      })}</>
    </div>
  );
};

export default CreateWorkout;
