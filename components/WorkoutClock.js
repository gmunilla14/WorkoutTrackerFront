import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../api";

const WorkoutClock = ({
  workout,
  setWorkout,
  chosenPlan,
  maxSections,
  planObj,
  currentSection,
  setCurrentSection,
  exercises,
}) => {
  const [startBound, setStartBound] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [milliseconds, setMilliseconds] = useState("000");
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [currentExercise, setCurrentExercise] = useState("");

  useEffect(() => {
    console.log('Current Section')
    console.log(currentSection)
    console.log('Max Section')
    console.log(maxSections)
    if ((planObj.sets.length > 1) & (currentSection + 1 < maxSections)) {
      if (planObj.sets[currentSection + 1].type === "exercise") {
        const exercise = exercises.filter((exercise) => {
          return exercise._id === planObj.sets[currentSection + 1].exerciseID;
        })[0];
        console.log("Exercise");
        console.log(exercise);
        setCurrentExercise(exercise.name);
      } else {
        const exercise = {};
      }
    }
  }, [currentSection, planObj]);

  const onStartButton = () => {
    setClockRunning(true);
  };

  useEffect(() => {
    if (clockRunning) {
      const now = new Date();
      setCurrentSection(0);

      setStartBound(now.getTime());
      setWorkout({ ...workout, planID: chosenPlan, startTime: now.getTime() });
    }
  }, [clockRunning]);

  const onIntervalButton = () => {
    const now = new Date();

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

  return (
    <div>
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
      {currentSection + 1 < maxSections && (
        <div>
          Up Next:{" "}
          {planObj.sets[currentSection + 1].type === "exercise"
            ? currentExercise
            : "Rest"}
        </div>
      )}
    </div>
  );
};

export default WorkoutClock;
