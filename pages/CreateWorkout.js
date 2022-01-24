import axios from "axios";
import { useEffect, useState } from "react";
import ListWorkouts from "../components/ListWorkouts";
import Set from "../components/Set";
import { url } from "../api";
import WorkoutClock from "../components/WorkoutClock";

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
  const [workout, setWorkout] = useState({
    planID: "",
    startTime: "",
    sets: [],
  });
  const [chosenPlan, setChosenPlan] = useState("");
  const [planObj, setPlanObj] = useState({
    name: "",
    creatorID: "",
    sets: [
      {
        type: "",
      },
    ],
  });
  const [maxSections, setMaxSections] = useState(0);
  const [currentSection, setCurrentSection] = useState(-1);

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
            if (currentSection === -1) {
              return <Set set={set} exercises={exercises} selected={false} />;
            } else {
              if (planObj.sets[currentSection]._id === set._id) {
                return <Set set={set} exercises={exercises} selected={true} />;
              } else {
                return <Set set={set} exercises={exercises} selected={false} />;
              }
            }
          })}
        <div>{planObj.sets.length}</div>
      </>
      <WorkoutClock
        setWorkout={setWorkout}
        workout={workout}
        chosenPlan={chosenPlan}
        maxSections={maxSections}
        planObj={planObj}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        exercises={exercises}
      />
    </div>
  );
};

export default CreateWorkout;
