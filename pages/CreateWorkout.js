import axios from "axios";
import { useEffect, useState } from "react";
import ListWorkouts from "../components/ListWorkouts";
import Set from "../components/Set";
import { url } from "../api";

export const getServerSideProps = async (context) => {
  const planRes = await fetch(`${url}/plans`);
  const plans = await planRes.json();

  const exerciseRes = await fetch(`${url}/exercises`);
  const exercises = await exerciseRes.json();

  return {
    props: { plans, exercises },
  };
};

const CreateWorkout = ({ plans, exercises }) => {
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
  const [milliseconds, setMilliseconds] = useState("000");
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const onStartButton = () => {
    setClockRunning(true);
  };

  useEffect(() => {
    if (clockRunning) {
      const now = new Date();

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

    axios
      .post(`${url}/workouts`, workout)
      .then(() => {
        console.log("Success??");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (clockRunning) {
      const interval = setInterval(() => {
        const now = new Date();
        setDuration(now - startBound);
        const time = now - startBound;
        const mins = Math.floor(time / 60000)
          .toString()
          .padStart(2, "0");
        const secs = (Math.floor(time / 1000) % 60).toString().padStart(2, "0");
        const ms = (time % 1000).toString().padStart(3, "0");
        setMilliseconds(ms);
        setSeconds(secs);
        setMinutes(mins);
      }, 1);

      //Clear interval when component unmounts
      return () => clearInterval(interval);
    }
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
      Create Workout{" "}
      {!clockRunning ? (
        <button onClick={onStartButton}>Start</button>
      ) : (
        <>
          {currentSection < maxSections - 1 ? (
            <button onClick={onIntervalButton}>Interval</button>
          ) : (
            <button onClick={onStopButton}>Stop</button>
          )}
        </>
      )}
      <div id="time">{duration}</div>
      <div>
        {minutes}:{seconds}.{milliseconds}
      </div>
      <div>Start Bound: {startBound}</div>
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
            if (planObj.sets[currentSection]._id === set._id) {
              return <Set set={set} exercises={exercises} selected={true} />;
            } else {
              return <Set set={set} exercises={exercises} selected={false} />;
            }
          })}
        <div>{planObj.sets.length}</div>
      </>
    </div>
  );
};

export default CreateWorkout;
