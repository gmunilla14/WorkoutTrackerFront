import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListPlans = ({ plans, setPlans, currentPlan, setCurrentPlan }) => {
  const [set, setSet] = useState({});
  const handleGetPlans = () => {
    axios
      .get(`${url}/plans`)
      .then((data) => {
        setPlans(data.data);
        console.log(plans);
        console.log(plans[0].sets.length);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onNameChange = (e) => {
    setCurrentPlan({ ...currentPlan, name: e.target.value });
    console.log(currentPlan);
  };

  const onCreatorChange = (e) => {
    setCurrentPlan({ ...currentPlan, creatorID: e.target.value });
  };

  const onTypeChange = (e) => {
    setSet({ type: e.target.value });

    document.getElementById("setForm").reset();

    console.log(set);
  };

  const onWeightChange = (e) => {
    setSet({ ...set, plannedWeight: e.target.value });
    console.log(set);
  };

  const onRepChange = (e) => {
    setSet({ ...set, plannedReps: e.target.value });
    console.log(set);
  };

  const onExerciseChange = (e) => {
    setSet({ ...set, exerciseID: e.target.value });
  };

  const onDurationChange = (e) => {
    setSet({ ...set, plannedDuration: e.target.value });
    console.log(set);
  };

  const onSetAdd = () => {
    let number = currentPlan.sets.length + 1;

    setSet({ ...set, number: number });
    let newSets = currentPlan.sets;
    console.log("newSets");
    console.log(newSets);
    newSets.push(set);
    setCurrentPlan({ ...currentPlan, sets: newSets });
    console.log("Set");
  };

  const onCreatePlan = () => {
    axios
      .post(`${url}/plans`, currentPlan)
      .then(() => {
        handleGetPlans();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <button onClick={handleGetPlans}>Get Plans</button>
      {plans &&
        plans.map((plan) => {
          return <div>{JSON.stringify(plan)}</div>;
        })}
      <div>
        <form>
          <input placeholder="Set Plan Name" onChange={onNameChange}></input>
          <input
            placeholder="Set Plan Creator ID"
            onChange={onCreatorChange}
          ></input>
        </form>
      </div>
      <div>
        ---------------------------------------------------
        <div>
          <form id="typeForm">
            <fieldset onChange={onTypeChange}>
              <legend>What type of set is this?</legend>
              <input
                id="exercise"
                type="radio"
                name="setType"
                value="exercise"
              />
              <label for="exercise">Exercise</label>
              <br />
              <input id="rest" type="radio" name="setType" value="rest" />
              <label for="exercise">Rest</label>
            </fieldset>
          </form>

          <form id="setForm">
            {set.type === "exercise" ? (
              <>
                <input
                  id="plannedWeight"
                  onChange={onWeightChange}
                  placeholder="Set Planned Weight (lb)"
                ></input>
                <input
                  id="plannedReps"
                  onChange={onRepChange}
                  placeholder="Set Planned Reps"
                ></input>
                <input
                  id="plannedExercise"
                  onChange={onExerciseChange}
                  placeholder="Set Exercise"
                ></input>
              </>
            ) : (
              <>
                <input
                  id="plannedDuration"
                  onChange={onDurationChange}
                  placeholder="Set planned duration (sec)"
                ></input>
              </>
            )}
          </form>
          <button onClick={onSetAdd}>Add Set</button>
          <button onClick={onCreatePlan}>Create Plan</button>
        </div>
      </div>
    </div>
  );
};

export default ListPlans;
