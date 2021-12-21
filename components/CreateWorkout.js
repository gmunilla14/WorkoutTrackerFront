import axios from "axios";
import { useEffect, useState } from "react";
import ListWorkouts from "./ListWorkouts";
import PlanSet from "./PlanSet";
import { url } from "../api";

const CreateWorkout = ({ plans }) => {
  const [startTime, setStartTime] = useState(0);
  const [intervals, setIntervals] = useState([]);
  const [startBound, setStartBound] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [workout, setWorkout] = useState({
    planID: "",
    startTime: "",
    sets: [],
  });
  const [chosenPlan, setChosenPlan] = useState("");
  const [planObj, setPlanObj] = useState({
    name: "",
    creatorID: "",
    sets: [],
  });
  const [maxSections, setMaxSections] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const onStartButton = () => {
    setClockRunning(true);
  };

  useEffect(() => {
    if (clockRunning) {
      const now = new Date();

      setStartTime(now.getTime());
      setStartBound(now.getTime());
      setWorkout({ ...workout, planID: chosenPlan, startTime: now.getTime() });
      console.log("Workout");
      console.log(workout);
      console.log("Plan Obj");
      console.log(planObj);
    }
  }, [clockRunning]);

  const onIntervalButton = () => {
    const now = new Date();

    let currentSets = workout.sets;
    console.log("Current Sets");
    console.log(currentSets);
    if (planObj.sets[currentSection].type === "exercise") {
      currentSets[currentSection] = {
        type: planObj.sets[currentSection].type,
        startTime: startBound,
        endTime: now.getTime(),
        exerciseID: planObj.sets[currentSection].exerciseID,
        weight: planObj.sets[currentSection].plannedWeight,
        reps: planObj.sets[currentSection].plannedReps,
      };
    } else if (planObj.sets[currentSection].type === "rest") {
      currentSets[currentSection] = {
        type: planObj.sets[currentSection].type,
        startTime: startBound,
        endTime: now.getTime(),
      };
    } else {
      console.log(`At current section ${currentSection} there is a problem`);
    }

    setStartBound(now.getTime());

    setCurrentSection(currentSection + 1);
  };

  const onStopButton = () => {
    const now = new Date();
    setClockRunning(false);
    let currentSets = workout.sets;

    if (planObj.sets[currentSection].type === "exercise") {
      currentSets[currentSection] = {
        type: planObj.sets[currentSection].type,
        startTime: startBound,
        endTime: now.getTime(),
        exerciseID: planObj.sets[currentSection].exerciseID,
        weight: planObj.sets[currentSection].plannedWeight,
        reps: planObj.sets[currentSection].plannedReps,
      };
    } else if (planObj.sets[currentSection].type === "rest") {
      currentSets[currentSection] = {
        type: planObj.sets[currentSection].type,
        startTime: startBound,
        endTime: now.getTime(),
      };
    } else {
      console.log(`At current section ${currentSection} there is a problem`);
    }

    setWorkout({ ...workout, endTime: now.getTime() });


    axios.post(`${url}/workouts`, workout).then(() => {
        console.log('Success??')
    }).catch((error) => {
        console.log(error.response)
    })
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
      setMaxSections(newPlanObj.sets.length);
    }
  }, [chosenPlan]);

  return (
    <div>
      Create Workout \{" "}
      {!clockRunning ? (
        <button onClick={onStartButton}>Start</button>
      ) : (
        <>
          {currentSection < (maxSections - 1) ? (
            <button onClick={onIntervalButton}>Interval</button>
          ) : (
            <button onClick={onStopButton}>Stop</button>
          )}
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
      <>
        {!(chosenPlan === "") &&
          planObj.sets.map((set) => {
            return <PlanSet set={set} />;
          })}
        <div>{planObj.sets.length}</div>
      </>
    </div>
  );
};

export default CreateWorkout;
